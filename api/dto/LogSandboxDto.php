<?php 
class LogSandboxDto extends BaseDto
{
    public static ?BaseModel $model = null;
    public static string $modelName = "log_sandbox";

    public static function getAll()
    {
        $model = self::getModel();

        return $model->select('log_sandbox.id', 'log_sandbox.method', 'log_sandbox.edit_name', 'log_sandbox.edit_key', 'log_sandbox.timestamp_created')->select(['user.username', 'user_name'])->join('LEFT', 'user', 'user.`id` = log_sandbox.`user_id`')->get();
    }

    public static function create(string $userId, string $method, string $editName, string | int $editKey)
    {
        $model = self::getModel();

        $model->insert(['user_id' => $userId, 'method' => $method, 'edit_name' => $editName, 'edit_key' => $editKey, 'timestamp_created' => time()]);
    }
}