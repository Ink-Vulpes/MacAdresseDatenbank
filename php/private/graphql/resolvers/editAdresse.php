<?php
namespace MacAdresseDatenbank\Resolvers;

require_once __DIR__ . "/resolver.php";

class editAdresse implements \ResolverInterface
{

   use \ResolverTrait;

   public function resolver($rootValue, array $args)
   {
      $this->authReq([\Permission::WriteEntries]);
      $id = $args['id'];
      $data = $args['edit'];
      $stmt = $this->pdo->prepare('SELECT * FROM entry WHERE id=?');
      $stmt->execute([$id]);
      $cash = $stmt->fetch(\PDO::FETCH_ASSOC);

      if (!empty($data['device_name']))
         $cash['name'] = $data['device_name'];
      if (!empty($data['user_name']))
         $cash['user'] = $data['user_name'];
      if (!empty($data['networkcard']))
         $cash['networkcard'] = $data['networkcard'];
      if (!empty($data['macAdress'])) {
         $m_stmt = $this->pdo->prepare('UPDATE mac_address
         SET
            sect1 = ?,
            sect2 = ?,
            sect3 = ?,
            sect4 = ?,
            sect5 = ?,
            sect6 = ?
         WHERE id = ?');
         $m_stmt->execute([
            $data['macAdress']['sect1'],
            $data['macAdress']['sect2'],
            $data['macAdress']['sect3'],
            $data['macAdress']['sect4'],
            $data['macAdress']['sect5'],
            $data['macAdress']['sect6'],
            $cash['mac_address_id']
         ]);
      }
      $stmt = $this->pdo->prepare('UPDATE entry 
      SET
         name=?,
         networkcard=?,
         user=?
      WHERE id = ?');
      $stmt->execute([
         $cash['name'],
         $cash['user'],
         $cash['networkcard'],
         $cash['id']
      ]);
   }
}