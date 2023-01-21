<?php
class EmulatorTextController extends BaseController
{
    public function get() 
    {
        $user = $this->getAuthUser();

        if ($user["rank"] < 13) {
            throw new HttpException("Vous n'avez pas les permissions requis", 400);
        }

        return EmulatorTextDto::getAll();
    }

    public function patch()
    {
        $data = $this->getData(['id', 'value_fr']);

        $user = $this->getAuthUser();

        if ($user["rank"] < 13) {
            throw new HttpException("Vous n'avez pas les permissions requis", 400);
        }

        EmulatorTextDto::update((int)$data['id'], $data['value_fr']);
    }

    public function delete()
    {
        $data = $this->getData(['id']);

        $user = $this->getAuthUser();

        if ($user["rank"] < 13) {
            throw new HttpException("Vous n'avez pas les permissions requis", 400);
        }

        EmulatorTextDto::delete((int)$data['id']);
    }

    public function post()
    {
        $data = $this->getData(['identifiant', 'value_fr']);

        $user = $this->getAuthUser();

        if ($user["rank"] < 13) {
            throw new HttpException("Vous n'avez pas les permissions requis", 400);
        }

        $id = EmulatorTextDto::create($data['identifiant'], $data['value_fr']);

        return EmulatorTextDto::getOne($id);
    }
}