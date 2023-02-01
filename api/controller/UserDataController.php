<?php
class UserDataController extends BaseController
{
    public array $minRank = ['GET' => 1];

    public function get() 
    {
        $ticket = Helper::generateTicket();

        UserDto::updateTicket($this->user["id"], $ticket);

        return array_merge($this->user, ['ticket' => $ticket]);
    }
}
