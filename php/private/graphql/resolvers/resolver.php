<?php
interface ResolverInterface
{
	public function resolver($rootValue, array $args);
}

enum Permission: string
{
	case ReadUsers = 'read_users';
	case WriteUsers = 'write_users';
	case DeleteUsers = 'delite_users';
	case ReadEntries = 'read_entries';
	case WriteEntries = 'write_entries';
	case DeleteEntries = 'delete_entries';
}

trait ResolverTrait
{
	private Config $config;
	private PDO|null $pdo;

	public function __construct(Config $config)
	{
		$this->config = $config;

		$dbConfig = $this->config->get('database');
		$dsn = "mysql:host={$dbConfig['host']};dbname={$dbConfig['dbname']};charset=utf8mb4";
		$options = [
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
			PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
			PDO::ATTR_EMULATE_PREPARES => false,
		];
		$this->pdo = new PDO($dsn, $dbConfig['user'], $dbConfig['password'], $options);
	}

	/**
	 * @param Permission[] $permissions
	 */
	private function authReq(array $permissions)
	{
		$headers = getallheaders();
		if (!isset($headers['Authorization'])) {
			throw new \GraphQL\Error\UserError('No Authorization Bearer Token is set!');
		}
		$stmt = $this->pdo->prepare('SELECT p.permission FROM users u INNER JOIN tokens t ON u.id = t.user_id INNER JOIN permissions p ON u.id = p.user_id  WHERE t.token = ?');
		$stmt->execute([str_replace('Bearer ', '', $headers['Authorization'])]);
		$map = array_map(fn($enum) => $enum->value, $permissions);
		$db_perm = array_map(fn($e) => $e['permission'], $stmt->fetchAll(\PDO::FETCH_ASSOC));
		foreach ($map as $row) {
			if (!in_array($row, $db_perm)) {
				throw new \GraphQL\Error\UserError('permission denited!');
			}
		}

	}
}