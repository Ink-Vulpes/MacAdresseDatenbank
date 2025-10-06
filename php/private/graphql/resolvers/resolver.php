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
}