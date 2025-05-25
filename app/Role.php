<?php

namespace App;

enum Role: string
{
    //
    case ADMIN = 'admin';
    case TECH = 'tech';
    case USER = 'user';
    case HOUSE_MANAGER = 'house_manager';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
