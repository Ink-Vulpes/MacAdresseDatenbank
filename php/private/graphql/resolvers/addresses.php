<?php
namespace MacAdresseDatenbank\Resolvers;

require_once __DIR__ . "/resolver.php";

class addresses implements \ResolverInterface
{
   use \ResolverTrait;

   public function resolver($rootValue, array $args)
   {
      $this->authReq([\Permission::WriteEntries]);
      $from = $args['from'];
      $to = $args['to'];
      $stmt = $this->pdo->prepare('SELECT e.id, e.name, e.user, e.networkcard, ma.sect1, ma.sect2, ma.sect3, ma.sect4, ma.sect5, ma.sect6 FROM entry e INNER JOIN mac_address ma ON e.mac_address_id = ma.id LIMIT ? OFFSET ?');
      $stmt->execute([$to - $from, $from]);
      $result = $stmt->fetchAll(\PDO::FETCH_ASSOC);
      $stmt = $this->pdo->prepare('SELECT COUNT(*) FROM entry');
      $stmt->execute();
      $len = $stmt->fetch(\PDO::FETCH_NUM)[0];
      return [
         'range' => [
            'from' => $from,
            'to' => $to,
         ],
         'total' => $len,
         'addresses' => array_map(fn($v) => [
            'id' => $v['id'],
            'device_name' => $v['name'],
            'networkcard' => $v['networkcard'],
            'user_name' => $v['user'],
            'macAdress' => [
               $v['sect1'],
               $v['sect2'],
               $v['sect3'],
               $v['sect4'],
               $v['sect5'],
               $v['sect6'],
            ]
         ], $result),
      ];
   }

}