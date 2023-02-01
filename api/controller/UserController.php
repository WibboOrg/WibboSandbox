<?php
class UserController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'PATCH' => 13, 'DELETE' => 13];

    public function get() 
    {
        return UserDto::getAll();
    }

    public function patch()
    {
        $data = $this->getData(['id', 'rank']);

        if (!is_numeric($data['rank']))
            throw new HttpException('Rang incorrect', 400);

        if((int) $this->user['rank'] <= (int) $data['rank'])
            throw new HttpException("Vous n'avais pas la permission", 400);

        UserDto::updateRank((int) $data['id'], (int) $data['rank']);
        LogSandboxDto::create($this->user['id'], 'patch', 'user', $data['id']);
    }

    public function delete()
    {
        $data = $this->getData(['id']);

        UserDto::delete((int)$data['id']);

        LogSandboxDto::create($this->user['id'], 'delete', 'user', $data['id']);
    }

    public function post()
    {
        $data = $this->getData(['username', 'rank']);

        if (!is_numeric($data['rank']))
            throw new HttpException('Rang incorrect', 400);

        if((int) $this->user['rank'] <= (int) $data['rank'])
            throw new HttpException("Vous n'avais pas la permission", 400);

        $userId = UserDto::create($data['username'], (int) $data['rank']);

        LogSandboxDto::create($this->user['id'], 'post', 'user', $userId);

        return UserDto::getOne($userId);
    }
}
