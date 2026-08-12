<?php
namespace MacAdresseDatenbank\Resolvers;

require_once __DIR__ . "/resolver.php";

class logout implements \ResolverInterface
{
   use \ResolverTrait;
   public function resolver($rootValue, array $args)
   {
      $token = $args["token"];
      $stmt = $this->pdo->prepare("DELETE FROM tokens WHERE token = ?");
      return $stmt->execute([$token]);
   }
}