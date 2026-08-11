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
      $stmt = $this->pdo->prepare('SELECT e.name, e.networkcard, ma.sect1, ma.sect2, ma.sect3, ma.sect4, ma.sect5, ma.sect6 FROM entry e INNER JOIN mac_address ma ON e.mac_address_id = ma.id LIMIT ? OFFSET ?');
      $stmt->execute([$to - $from, $from]);
      return array_map(fn($v) => [
         'device_name' => $v['name'],
         'networkcard' => $v['networkcard'],
         'macAdress' => [
            $v['sect1'],
            $v['sect2'],
            $v['sect3'],
            $v['sect4'],
            $v['sect5'],
            $v['sect6'],
         ]
      ], $stmt->fetchAll(\PDO::FETCH_ASSOC));
   }

}