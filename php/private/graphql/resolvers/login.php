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


		return [
			'token' => 'some_generated_token',
			'name' => $username,
			'expiresIn' => 3600,
			'permissions' => ['USER', 'ADMIN']
		];
	}
}