<?php
namespace MacAdresseDatenbank\Resolvers;

class addressesLen implements \ResolverInterface
{

   use \ResolverTrait;
   public function resolver($rootValue, array $args)
   {
      $this->authReq([\Permission::WriteEntries]);
      $stmt = $this->pdo->prepare('SELECT COUNT(*) FROM entry');
      $stmt->execute();
      return $stmt->fetch(\PDO::FETCH_NUM)[0];
   }
}