<?php
namespace MacAdresseDatenbank\Resolvers;

require_once __DIR__ . "/resolver.php";

function genToken($n)
{
	$chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	$rnd = '';
	for ($i = 0; $i < $n; $i++) {
		$r = random_int(0, strlen($chars) - 1);
		$rnd .= $chars[$r];
	}
	return $rnd;
}

class login implements \ResolverInterface
{
	use \ResolverTrait;

	public function resolver($rootValue, array $args)
	{
		$username = $args['username'];
		$password = $args['password'];

		$stmt = $this->pdo->prepare('SELECT * FROM users WHERE name = ?');
		$stmt->execute([$username]);
		if ($stmt->rowCount() === 0) {
			throw new \GraphQL\Error\UserError('Ivalide Username or Password.');
		}
		$u_data = $stmt->fetch(\PDO::FETCH_ASSOC);
		$test = hash('sha256', $password);
		if (hash('sha256', $password) !== $u_data['password_sha512']) {
			throw new \GraphQL\Error\UserError('Invalide Password.');
		}
		$token = genToken(30);
		$stmt = $this->pdo->prepare('SELECT permission FROM permissions WHERE user_id = ?');
		$stmt->execute([$u_data['id']]);
		$permissons = [];
		foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
			array_push($permissons, $row['permission']);
		}
		$stmt = $this->pdo->prepare('INSERT INTO tokens (token, user_id) VALUES (?, ?)');
		$stmt->execute([$token, $u_data['id']]);
		return [
			'token' => $token,
			'name' => $u_data['name'],
			'expiresIn' => 3600,
			'permissions' => $permissons
		];
	}
}