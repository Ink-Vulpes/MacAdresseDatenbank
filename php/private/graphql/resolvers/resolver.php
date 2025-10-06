<?php

interface ResolverInterface
{
	public function resolver($rootValue, array $args);
}

trait ResolverTrait
{
	private Config $config;

	public function __construct(Config $config)
	{
		$this->config = $config;
	}

	private function getDbConnection()
	{
		$dbConfig = $this->config->get('database');
		$dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']};charset=utf8mb4";
		$options = [
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES => false,
		];

		return new PDO($dsn, $dbConfig['user'], $dbConfig['password'], $options);
	}
}