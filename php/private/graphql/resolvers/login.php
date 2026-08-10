<?php
namespace MacAdresseDatenbank\Resolvers;

require_once __DIR__ . "/resolver.php";

class login implements \ResolverInterface
{
	use \ResolverTrait;

	public function resolver($rootValue, array $args)
	{
		$username = $args['username'];
		$password = $args['password'];
		$db = $this->getDbConnection();

		// $stmt = $db->prepare(`SELECT * FROM users WHERE username = ?`);
		// $stmt->execute([$username]);
		// if ($stmt->rowCount() === 0) {
		// 	throw new \Exception("Invalid username or password.");
		// }


		// return [
		// 	'token' => 'some_generated_token',
		// 	'name' => $username,
		// 	'expiresIn' => 3600,
		// 	'permissions' => ['USER', 'ADMIN']
		// ];
	}
}