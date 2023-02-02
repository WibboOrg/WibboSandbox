<?php

class Request 
{
    protected array $input;

    public function __construct()
    {
        $inputData = file_get_contents('php://input');
        
        $this->input = $inputData ? json_decode($inputData, true) : [];
    }

    private function requireData(array $keyList): array
    {
        if(!$this->input) throw new Exception('Un champ est manquent', 400);

        $inputs = [];

        foreach ($keyList as $key)
        {
            if(!array_key_exists($key, $this->input)) {
                throw new Exception('Un champ est manquent', 400);
            }

            $inputs[$key] = $this->input[$key];
        }

        return $inputs;
    }

    public function getFile(): array
    {
        $inputs = $this->requireData(['file']);
        
        return $inputs['file'];
    }

    public function getBoolean(array $keyList): array
    {
        $inputs = $this->requireData($keyList);

        foreach ($inputs as &$input)
            $input = is_numeric($input) ? ($input === 1 ? 1 : 0) : 0;

        return $inputs;
    }

    public function getNumber(array $keyList): array
    {
        $inputs = $this->requireData($keyList);

        foreach ($inputs as &$input)
            $input = is_numeric($input) ? $input : 0;

        return $inputs;
    }
    
    public function getString(array $keyList): array
    {
        $inputs = $this->requireData($keyList);

        foreach ($inputs as &$input)
            $input = strval($input);

        return $inputs;
    }
}