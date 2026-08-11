<?php

namespace MacAdresseDatenbank\Resolvers;

require_once __DIR__ . "/resolver.php";

class helloWorld implements \ResolverInterface
{
	use \ResolverTrait;

	public function resolver($rootValue, array $args)
	{
		return "Hello World!";
	}
}