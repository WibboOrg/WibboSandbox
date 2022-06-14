<?php
class ClientController extends BaseController
{
    public function get()
    {
        $user = $this->getAuthUser();
        
        $ticket = Helper::generateTicket();

        UserDto::updateTicket($user["id"], $ticket);

        $this->send(["ticket" => $ticket]);
    }
}
