<?php
namespace MacAdresseDatenbank\Resolvers;

require_once __DIR__ . "/resolver.php";


class createAdresses implements \ResolverInterface
{
   use \ResolverTrait;

   public function resolver($rootValue, array $args)
   {
      $this->authReq([\Permission::WriteEntries]);
      $macAdressPayload = $args["addresses"];
      $res = [];
      $stmt_addres = $this->pdo->prepare('INSERT INTO mac_address (sect1, sect2, sect3, sect4, sect5, sect6) VALUES (?, ?, ?, ?, ?, ?)');
      $stmt_get_id = $this->pdo->prepare('SELECT LAST_INSERT_ID()');
      $stmt_entry = $this->pdo->prepare('INSERT INTO entry (name, networkcard, mac_address_id, user) VALUES (?, ?, ?, ?)');
      foreach ($macAdressPayload as $el) {
         $stmt_addres->execute([$el['macAdress']['sect1'], $el['macAdress']['sect2'], $el['macAdress']['sect3'], $el['macAdress']['sect4'], $el['macAdress']['sect5'], $el['macAdress']['sect6']]);
         $stmt_get_id->execute();
         $id = $stmt_get_id->fetch(\PDO::FETCH_NUM);
         if (key_exists('user_name', $el)) {
            $stmt_entry->execute([$el['device_name'], $el['networkcard'], (int) $id[0], $el['user_name']]);
         } else {
            $stmt_entry->execute([$el['device_name'], $el['networkcard'], (int) $id[0], null]);
         }
         array_push($res, [
            'id' => $id[0],
            ...$el,
         ]);
      }
      return $res;
   }
}