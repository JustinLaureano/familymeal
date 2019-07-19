<?php

namespace App\Libraries;

use Illuminate\Http\Response;

class FileHelper
{
    public static function getExtension($type)
    {
        $ext;

        switch($type) {
            case 'image/jpeg':
                $ext = '.jpg';
                break;
            case 'image/gif':
                $ext = '.gif';
                break;
            case 'image/svg+xml':
                $ext = '.svg';
                break;
            default:
                $ext = '.jpg';
        }

        return $ext;
    }

    public static function validateImage($photo)
    {
        $valid_types = [
            'image/jpeg',
            'image/gif',
            'image/svg+xml',
        ];

        if (in_array($photo['type'], $valid_types)) {
            return true;
        }
        else {
            return response('Invalid Image', 200);
        }
    }
}