<?php
class EmulatorCommandController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];

    public function get(Request $request) 
    { 
        return EmulatorCommandDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id', 'minrank']);
        $dataStr = $request->getNumber(['description_fr']);

        EmulatorCommandDto::update((int)$dataInt['id'], (int)$dataInt['minrank'], $dataStr['description_fr']);
        LogSandboxDto::create($this->user['id'], 'patch', 'emulator_command', $dataInt['id']);
    }

    public function delete(Request $request)
    {
        $dataInt = $request->getNumber(['id']);

        EmulatorCommandDto::delete($dataInt['id']);

        LogSandboxDto::create($this->user['id'], 'delete', 'emulator_command', $dataInt['id']);
    }

    public function post(Request $request)
    {
        $dataInt = $request->getNumber(['minrank']);
        $dataStr = $request->getNumber(['input', 'description_fr']);

        $id = EmulatorCommandDto::create($dataStr['input'], $dataInt['minrank'], $dataStr['description_fr']);

        LogSandboxDto::create($this->user['id'], 'post', 'emulator_command', $id);

        return EmulatorCommandDto::getOne($id);
    }
}