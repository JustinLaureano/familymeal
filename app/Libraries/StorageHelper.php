<?php

namespace App\Libraries;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class StorageHelper
{
    public static function checkRecipePhotoStoage()
    {
        self::checkUploadDir();
        
        if (!is_dir( storage_path('uploads/recipe_photos') )) {
            mkdir(storage_path('uploads/recipe_photos'));
        }
    }

    public static function checkUploadDir() {
        if (!is_dir( storage_path('uploads') )) {
            mkdir(storage_path('uploads'));
        }
    }

}