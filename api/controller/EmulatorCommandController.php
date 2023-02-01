<?php
class EmulatorCommandController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];

    public function get() 
    { 
        return EmulatorCommandDto::getAll();
    }

    public function patch()
    {
        $data = $this->getData(['id', 'minrank', 'description_fr']);

        if(is_int($data['id']) || is_int($data['minrank'])) {
            throw new HttpException("Identifiants incorrects", 400);
        }

        EmulatorCommandDto::update((int)$data['id'], (int)$data['minrank'], $data['description_fr']);
        LogSandboxDto::create($this->user['id'], 'patch', 'emulator_command', $data['id']);
    }

    public function delete()
    {
        $data = $this->getData(['id']);

        EmulatorCommandDto::delete((int)$data['id']);

        LogSandboxDto::create($this->user['id'], 'delete', 'emulator_command', $data['id']);
    }

    public function post()
    {
        $data = $this->getData(['input', 'minrank', 'description_fr']);

        $id = EmulatorCommandDto::create($data['input'], (int)$data['minrank'], $data['description_fr']);

        LogSandboxDto::create($this->user['id'], 'post', 'emulator_command', $id);

        return EmulatorCommandDto::getOne($id);
    }
}