import { rm, mkdir, cp, access, writeFile } from "fs/promises";
import { constants } from "fs";

export const DEFAULT_CONFIG = await Bun.file(
	"./scripts/default_app_conf.conf"
).text();

console.log("Checking dependencies...");
try {
	await access("./php/vendor/autoload.php", constants.F_OK);
} catch (_) {
	console.error("Please run 'composer install' first!");
	process.exit(1);
}

try {
	await access("./app_conf.conf", constants.F_OK);
} catch (_) {
	console.error(
		"app_conf.conf is missing! Creating a template, please fill in the required values."
	);
	await writeFile("./app_conf.conf", DEFAULT_CONFIG.trimStart(), "utf-8");
	process.exit(1);
}

console.log("Cleaning up dist...");
await rm("./dist/www", { recursive: true, force: true });
await mkdir("./dist/www");

console.log("Copying backend files...");
await cp("./php/html", "./dist/www/html", { recursive: true });
await cp("./php/private", "./dist/www/private", { recursive: true });
await cp("./php/vendor", "./dist/www/vendor", { recursive: true });
await cp("./app_conf.conf", "./dist/www/app_conf.conf");

console.log("Building frontend...");
await Bun.build({
	entrypoints: ["./src/index.html"],
	outdir: "./dist/www/html",
	sourcemap: true,
	target: "browser",
	minify: true,
	define: {
		"process.env.NODE_ENV": "'production'",
	},
});
