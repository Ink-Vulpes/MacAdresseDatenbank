import { writeFile, cp } from "fs/promises";
import ini from "ini";
import mysql from "mysql2/promise";
import chokidar from "chokidar";

export const DEFAULT_CONFIG = await Bun.file(
	"./scripts/default_app_conf.conf"
).text();

console.log("Read Config file...");
const config_raw = Bun.file("app_conf.conf");
if (!(await config_raw.exists())) {
	console.error(
		"app_conf.conf is missing! Creating a template, please fill in the required values."
	);
	await writeFile("./app_conf.conf", DEFAULT_CONFIG.trimStart(), "utf-8");
	process.exit(1);
}

const config = ini.parse(await config_raw.text());

console.log("Checking if Docker is available...");
if (
	(await Bun.spawn({
		cmd: ["docker", "--version"],
	}).exited) !== 0
) {
	console.log("Docker is not available or an error occurred");
	process.exit(1);
}

console.log("Starting Docker container...");
if (
	(await Bun.spawn({
		cmd: ["docker", "compose", "up", "-d", "--build"],
		stdout: "inherit",
		stderr: "inherit",
	}).exited) !== 0
) {
	console.log("Failed to start Docker container");
	process.exit(1);
}

console.log("Waiting for MySQL to be ready...");
let retries = 30;
const db = await mysql.createConnection({
	host: "localhost",
	user: config.DB_USER,
	password: config.DB_PASSWORD,
	port: config.DB_PORT,
});

while (retries > 0) {
	try {
		await db.query("SELECT 1");

		console.log("MySQL is ready!");
		break;
	} catch (error) {
		retries--;
		console.log(
			`MySQL is not ready yet. Retrying in 2 seconds... (${retries} retries left)`
		);
		await new Promise((resolve) => setTimeout(resolve, 2000));
	}
}

console.log("Create Database ...");
const create_script = await Bun.file("./SQL/create.sql").text();
const test_data_script = await Bun.file("./SQL/test_data.sql").text();

try {
	const statements = create_script
		.split(/;\s*$/m)
		.filter((stmt) => stmt.trim());
	for (const stmt of statements) await db.query(stmt);
	console.log("Database created successfully.");
} catch (error) {
	console.log("something went wrong creating the database:", error);
}

try {
	const statements = test_data_script
		.split(/;\s*$/m)
		.filter((stmt) => stmt.trim());
	for (const stmt of statements) await db.query(stmt);
	console.log("Test data inserted successfully.");
} catch (error) {
	console.log("something went wrong inserting the test data:", error);
}

await db.end();

console.log("building for the first time...");
if (
	(await Bun.spawn({
		cmd: ["bun", "./scripts/build.ts"],
		stdout: "inherit",
		stderr: "inherit",
	}).exited) !== 0
) {
	console.error("Initial build failed, exiting.");
}

console.log("Create Watcher for PHP files...");
async function onPhpChange(path: string) {
	await cp(path, path.replace("php", "dist"));
	console.log(`File ${path} copied to dist.`);
}

const php_watcher = chokidar.watch("php", {
	ignored: /(^|[\/\\])\../,
	persistent: true,
});

php_watcher.on("change", async (path) => await onPhpChange(path));

console.log("Create Watcher for Frontend files...");
async function onFrontendChange() {
	await Bun.build({
		entrypoints: ["./src/index.html"],
		outdir: "./dist/html",
		sourcemap: true,
		target: "browser",
		minify: true,
		define: {
			"process.env.NODE_ENV": "'production'",
		},
	});
	console.log("Frontend rebuilt.");
}

const frontend_watcher = chokidar.watch("src", {
	ignored: /(^|[\/\\])\../,
	persistent: true,
});

frontend_watcher.on("change", async () => await onFrontendChange());
