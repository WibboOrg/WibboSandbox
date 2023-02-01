<?php
class EmulatorTextController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];

    public function get() 
    {
        return EmulatorTextDto::getAll();
    }

    public function patch()
    {
        $data = $this->getData(['id', 'value_fr']);

        EmulatorTextDto::update((int)$data['id'], $data['value_fr']);

        LogSandboxDto::create($this->user['id'], 'patch', 'emulator_text', $data['id']);
    }

    public function delete()
    {
        $data = $this->getData(['id']);

        EmulatorTextDto::delete((int)$data['id']);

        LogSandboxDto::create($this->user['id'], 'delete', 'emulator_text', $data['id']);
    }

    public function post()
    {
        $data = $this->getData(['identifiant', 'value_fr']);

        $id = EmulatorTextDto::create($data['identifiant'], $data['value_fr']);

        LogSandboxDto::create($this->user['id'], 'post', 'emulator_text', $id);

        return EmulatorTextDto::getOne($id);
    }
}