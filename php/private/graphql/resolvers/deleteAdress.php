<?php
namespace MacAdresseDatenbank\Resolvers;

require_once __DIR__ . "/resolver.php";

class deleteAdress implements \ResolverInterface
{
   use \ResolverTrait;

   public function resolver($rootValue, array $args)
   {
      $this->authReq([\Permission::DeleteEntries]);
      $id = $args['id'];
      $stmt = $this->pdo->prepare('SELECT mac_address_id FROM entry WHERE id = ?');
      $stmt->execute([$id]);
      $m_id = $stmt->fetch(\PDO::FETCH_NUM);
      if (!$m_id)
         return false;
      $stmt = $this->pdo->prepare('DELETE FROM entry WHERE id=?');
      $stmt->execute([$id]);
      $stmt = $this->pdo->prepare('DELETE FROM mac_address WHERE id=?');
      $stmt->execute([$m_id[0]]);
      return true;
   }
}