<?php 
class UserDto extends BaseDto
{
    private static string $modelName = "User";

    public static function getOneByName($name)
    {
        $model = self::getModel(self::$modelName);

        $stmt = $model->select(['id', 'username', 'password'])->where('username', $name)->first();

        return $stmt;
    }

    public static function getOne($id)
    {
        $model = self::getModel(self::$modelName);

        $stmt = $model->select(`id`, `username`, `password`)->where('id', $id)->first();

        return $stmt;
    }

    public static function getIdByName($name)
    {
        $model = self::getModel(self::$modelName);

        $stmt = $model->select('id')->where('username', $name)->first();

        return $stmt;
    }

    public static function updatePassword($userId, $password)
    {
        $model = self::getModel(self::$modelName);

        $model->where('id', $userId)->update(['password' => password_hash($password, PASSWORD_DEFAULT)]);
    }

    public static function updateTicket($userId, $ticket)
    {
        $model = self::getModel(self::$modelName);

        $model->where('id', $userId)->limit(1)->update(['auth_ticket' => $ticket]);
    }

    public static function create($user_name, $password)
    {
        $model = self::getModel(self::$modelName);

        $model->insert(['username' => $user_name, 'password' => password_hash($password, PASSWORD_DEFAULT)]);

        return $model->getLastInsertId();
    }
}