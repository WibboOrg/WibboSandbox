<?php 
class UserDto extends BaseDto
{
    public static ?BaseModel $model = null;
    private static string $modelName = "user";

    public static function getAll()
    {
        $model = self::$model == null ? self::getModel(self::$modelName) : self::$model;

        $data = $model->select('username', 'id')->get();

        return $data;
    }

    public static function getOneByName(string $name)
    {
        $model = self::$model == null ? self::getModel(self::$modelName) : self::$model;

        $data = $model->select('id', 'username', 'password')->where('username', $name)->first();

        return $data;
    }

    public static function getOne(int $id)
    {
        $model = self::$model == null ? self::getModel(self::$modelName) : self::$model;

        $data = $model->select('id', 'rank')->where('id', $id)->first();

        return $data;
    }

    public static function delete(int $id)
    {
        $model = self::$model == null ? self::getModel(self::$modelName) : self::$model;

        $model->where('id', $id)->delete();
    }

    public static function getIdByName(string $name)
    {
        $model = self::$model == null ? self::getModel(self::$modelName) : self::$model;

        $data = $model->select('id')->where('username', $name)->first();

        return $data;
    }

    public static function updatePassword(int $userId, string$password)
    {
        $model = self::$model == null ? self::getModel(self::$modelName) : self::$model;

        $model->where('id', $userId)->update(['password' => password_hash($password, PASSWORD_DEFAULT)]);
    }

    public static function updateTicket(string $userId, string $ticket)
    {
        $model = self::$model == null ? self::getModel(self::$modelName) : self::$model;

        $model->where('id', $userId)->limit(1)->update(['auth_ticket' => $ticket]);
    }

    public static function create(string $name, string $password)
    {
        $model = self::$model == null ? self::getModel(self::$modelName) : self::$model;

        $model->insert(['username' => $name, 'password' => password_hash($password, PASSWORD_DEFAULT)]);

        return $model->getLastInsertId();
    }
}