<?php 
class UserDto extends BaseDto
{
    public static function getOneByName($name)
    {
        $model = self::getModel();

        $stmt = $model->conn->prepare("SELECT `id`, `username`, `password` FROM `user` WHERE username = :name LIMIT 1");
        $stmt->execute(['name' => $name]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function getOne($id)
    {
        $model = self::getModel();

        $stmt = $model->conn->prepare("SELECT `id`, `username`, `password` FROM `user` WHERE id = :id LIMIT 1");
        $stmt->execute(['id' => $id]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function getIdByName($name)
    {
        $model = self::getModel();

        $stmt = $model->conn->prepare("SELECT `id` FROM `user` WHERE username = :name LIMIT 1");
        $stmt->execute(['name' => $name]);

        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public static function updatePassword($userId, $password)
    {
        $model = self::getModel();

        $stmt = $model->conn->prepare("UPDATE `user` SET `password` = :password WHERE `id` = :id LIMIT 1");
        $stmt->execute(['id' => $userId, 'password' => password_hash($password, PASSWORD_DEFAULT)]);
    }

    public static function updateTicket($userId, $ticket)
    {
        $model = self::getModel();

        $stmt = $model->conn->prepare("UPDATE `user` SET `auth_ticket` = :ticket WHERE `id` = :id LIMIT 1");
        $stmt->execute(['id' => $userId, 'ticket' => $ticket]);
    }

    public static function create($user_name, $password)
    {
        $model = self::getModel();

        $stmt = $model->conn->prepare("INSERT INTO `user` (`username`, `password`) VALUES (:name, :password)");
        $stmt->execute(['name' => $user_name, 'password' => password_hash($password, PASSWORD_DEFAULT)]);

        return $model->conn->lastInsertId();
    }
}