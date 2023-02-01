<?php
class LogSandboxController extends BaseController
{
    public array $minRank = ['GET' => 13];

    public function get() 
    {
        return LogSandboxDto::getAll();
    }
}