<?php
class EmulatorTextController extends BaseController
{
    public array $minRank = ['GET' => 13, 'POST' => 13, 'DELETE' => 13, 'PATCH' => 13];

    public function get(Request $request) 
    {
        return EmulatorTextDto::getAll();
    }

    public function patch(Request $request)
    {
        $dataInt = $request->getNumber(['id']);
        $dataStr = $request->getString(['identifiant', 'value_fr']);

        EmulatorTextDto::update($dataInt['id'], $dataStr['identifiant'], $dataStr['value_fr']);

        LogSandboxDto::create($this->user['id'], 'patch', 'emulator_text', $dataInt['id']);
    }

    public function delete(Request $request)
    {
        $dataInt = $request->getNumber(['id']);

        EmulatorTextDto::delete($dataInt['id']);

        LogSandboxDto::create($this->user['id'], 'delete', 'emulator_text', $dataInt['id']);
    }

    public function post(Request $request)
    {
        $data = $request->getString(['identifiant', 'value_fr']);

        $id = EmulatorTextDto::create($data['identifiant'], $data['value_fr']);

        LogSandboxDto::create($this->user['id'], 'post', 'emulator_text', $id);

        return EmulatorTextDto::getOne($id);
    }
}