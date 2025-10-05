<?php
require "../vendor/autoload.php";

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Schema;
use GraphQL\GraphQL;

$config = parse_ini_file("../app_conf.conf", true);
if ($config === false) {
	throw new \Exception("Could not read configuration file.");
}

$db_host = $config['DB_HOST'];
$db_port = $config['DB_PORT'];
$db_name = $config['DB_NAME'];
$db_user = $config['DB_USER'];
$db_password = $config['DB_PASSWORD'];

$queryType = new ObjectType([
	'name' => 'Query',
	'fields' => [
		'hello_world' => [
			'type' => Type::string(),
			'resolve' => fn() => 'Hello, World!'
		],
	],
]);

$schema = new Schema([
	'query' => $queryType
]);

$input = json_decode(file_get_contents('php://input'), true);
$query = $input['query'];
$variableValues = isset($input['variables']) ? $input['variables'] : null;

try {
	$rootValue = ['prefix' => 'You said: '];
	$result = GraphQL::executeQuery($schema, $query, $rootValue, null, $variableValues);
	$output = $result->toArray();
} catch (\Exception $e) {
	$output = [
		'errors' => [
			[
				'message' => $e->getMessage()
			]
		]
	];
}
header('Content-Type: application/json');
echo json_encode($output, JSON_THROW_ON_ERROR);