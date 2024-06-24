<?php
namespace App\Service;

use DateTime;

class UserService
{
    public function getAge(DateTime $birthdate): ?int
    {
        $now = new DateTime();
        $interval = $now->diff($birthdate);
        return $interval->y; 
    }
}