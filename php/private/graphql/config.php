<?php

class Config
{
	public $db_host;
	public $db_port;
	public $db_name;
	public $db_user;
	public $db_password;

	public function __construct()
	{
		$config = parse_ini_file("../app_conf.conf", true);
		if ($config === false) {
			throw new \Exception("Could not read configuration file.");
		}

		$this->db_host = $config["DB_HOST"];
		$this->db_port = $config["DB_PORT"];
		$this->db_name = $config["DB_NAME"];
		$this->db_user = $config["DB_USER"];
		$this->db_password = $config["DB_PASSWORD"];
	}

	public function get($key)
	{
		return match ($key) {
			"database" => [
				"host" => $this->db_host,
				"port" => $this->db_port,
				"dbname" => $this->db_name,
				"user" => $this->db_user,
				"password" => $this->db_password,
			],
			default => throw new \InvalidArgumentException("Unknown configuration key: $key"),
		};
	}
}