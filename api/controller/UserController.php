<?php
class UserController extends BaseController
{
    public array $minRank = ['GET' => 11, 'POST' => 12, 'PATCH' => 12, 'DELETE' => 12];

    public function get(Request $request) 
    {
        return UserDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id', 'rank']);

        if($this->user['rank'] < $dataInt['rank'])
            throw new HttpException("Vous n'avais pas la permission", 400);

        UserDto::updateRank($dataInt['id'], $dataInt['rank']);
        LogSandboxDto::create($this->user['id'], 'patch', 'user', $dataInt['id']);
    }

    public function delete(Request $request)
    {
        $dataInt = $request->getNumber(['id']);

        UserDto::delete($dataInt['id']);
        LogSandboxDto::create($this->user['id'], 'delete', 'user', $dataInt['id']);
    }

    public function post(Request $request)
    {
        $dataStr = $request->getString(['username']);
        $dataInt = $request->getString(['rank']);

        if($this->user['rank'] <= $dataInt['rank'])
            throw new HttpException("Vous n'avais pas la permission", 400);

        $userId = UserDto::create($dataStr['username'], $dataInt['rank']);

        LogSandboxDto::create($this->user['id'], 'post', 'user', $userId);

        return UserDto::getOne($userId);
    }
}
