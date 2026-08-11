<?php

require_once __DIR__ . '/config.php';

use GraphQL\Utils\BuildSchema;
use GraphQL\Language\AST\TypeDefinitionNode;
use GraphQL\GraphQL;


class Schema
{
	private $schema_file;
	public $schema;

	private Config $config;


	private function typeConfigDecorator(array $typeConfig, TypeDefinitionNode $typeDefinitionNode): array
	{
		if ($typeConfig["name"] === "Query" || $typeConfig["name"] === "Mutation") {
			$typeConfig["fields"] = function () use ($typeConfig) {
				$fields = $typeConfig["fields"]();

				foreach ($fields as $fieldName => $field) {
					$resolver_file = __DIR__ . "/resolvers/{$fieldName}.php";
					if (!file_exists($resolver_file)) {
						throw new Error("Resolver file not found: {$resolver_file}");
					}
					require_once $resolver_file;

					$class_name = "MacAdresseDatenbank\\Resolvers\\{$fieldName}";
					if (!class_exists($class_name)) {
						throw new Error("Resolver class not found: {$class_name}");
					}

					$resolver = new $class_name($this->config);
					$fields[$fieldName]["resolve"] = [$resolver, "resolver"];
				}

				return $fields;
			};
		}

		return $typeConfig;
	}

	public function __construct()
	{
		$this->schema_file = file_get_contents(__DIR__ . "/schema.graphql");
		if ($this->schema_file === false) {
			throw new \Exception("Could not read schema file.");
		}

		$config = parse_ini_file("../app_conf.conf", true);
		if ($config === false) {
			throw new \Exception("Could not read configuration file.");
		}

		$this->config = new Config();

		$this->schema = BuildSchema::build(
			$this->schema_file,
			fn($c, $d) => $this->typeConfigDecorator($c, $d)
		);
	}


	public function execute($query, $rootValue, $context, $variableValues)
	{
		if (is_null($query)) {
			throw new Error("empty body");
		}
		return GraphQL::executeQuery($this->schema, $query, $rootValue, $context, $variableValues);
	}
}