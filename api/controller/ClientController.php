<?php
class ClientController extends BaseController
{
    public function get()
    {
        $user = $this->getAuthUser();
        
        $ticket = Helper::generateTicket();

        UserDto::updateTicket($user["id"], $ticket);

        return ["ticket" => $ticket];
    }
}
