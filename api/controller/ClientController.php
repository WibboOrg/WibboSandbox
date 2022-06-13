<?php
class ClientController extends BaseController
{
    public function get()
    {
        $auth = $this->getAuth();

        $user = UserDto::getOne($auth->id);

        if(!$user) throw new HttpException("Utilisateur non trouver", 404);
        
        $ticket = Helper::generateTicket();

        UserDto::updateTicket($auth->id, $ticket);

        $this->send(["ticket" => $ticket]);
    }
}
