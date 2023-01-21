<?php
class EmulatorCommandController extends BaseController
{
    public function get() 
    {
        $user = $this->getAuthUser();

        if ($user["rank"] < 13) {
            throw new HttpException("Vous n'avez pas les permissions requis", 400);
        }
        
        return EmulatorCommandDto::getAll();
    }

    public function patch()
    {
        $data = $this->getData(['id', 'minrank', 'description_fr']);

        $user = $this->getAuthUser();

        if ($user["rank"] < 13) {
            throw new HttpException("Vous n'avez pas les permissions requis", 400);
        }

        if(is_int($data['id']) || is_int($data['minrank'])) {
            throw new HttpException("Identifiants incorrects", 400);
        }

        EmulatorCommandDto::update((int)$data['id'], (int)$data['minrank'], $data['description_fr']);
    }

    public function delete()
    {
        $data = $this->getData(['id']);

        $user = $this->getAuthUser();

        if ($user["rank"] < 13) {
            throw new HttpException("Vous n'avez pas les permissions requis", 400);
        }

        EmulatorCommandDto::delete((int)$data['id']);
    }

    public function post()
    {
        $data = $this->getData(['input', 'minrank', 'description_fr']);

        $user = $this->getAuthUser();

        if ($user["rank"] < 13) {
            throw new HttpException("Vous n'avez pas les permissions requis", 400);
        }

        $id = EmulatorCommandDto::create($data['input'], (int)$data['minrank'], $data['description_fr']);

        return EmulatorCommandDto::getOne($id);
    }
}