<?php
require_once "../vendor/autoload.php";
require_once "../private/graphql/schema.php";

$schema = new Schema();

$input = json_decode(file_get_contents('php://input'), true);
$query = $input['query'];
$variableValues = isset($input['variables']) ? $input['variables'] : null;

try {
	$rootValue = ['prefix' => 'You said: '];
	$result = $schema->execute($query, $rootValue, null, $variableValues);
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