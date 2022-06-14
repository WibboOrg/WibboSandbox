<?php 
class UserDto extends BaseDto
{
    private static string $modelName = "user";

    public static function getAll()
    {
        $model = self::getModel(self::$modelName);

        $data = $model->select('username', 'id')->get();

        return $data;
    }

    public static function getOneByName($name)
    {
        $model = self::getModel(self::$modelName);

        $data = $model->select('id', 'username', 'password')->where('username', $name)->first();

        return $data;
    }

    public static function getOne($id)
    {
        $model = self::getModel(self::$modelName);

        $data = $model->select('id', 'rank')->where('id', $id)->first();

        return $data;
    }

    public static function delete($id)
    {
        $model = self::getModel(self::$modelName);

        $model->where('id', $id)->delete();
    }

    public static function getIdByName($name)
    {
        $model = self::getModel(self::$modelName);

        $data = $model->select('id')->where('username', $name)->first();

        return $data;
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