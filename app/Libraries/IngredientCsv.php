<?php

namespace App\Libraries;

use App\Models\Ingredient;

class IngredientCsv
{
    public static function csv_to_database()
    {
        (new self)->txt_to_csv();

        $file = storage_path() .'/csv/ingredients.csv';
        $handle = fopen($file, 'r');
        while (($row = fgetcsv($handle)) !== FALSE)
            Ingredient::create([
                'name' => trim($row[0]),
                'ingredient_category_id' => intval($row[1]),
                'ingredient_subcategory_id' => intval($row[2])
            ]);
        fclose($handle);
    }

    public function txt_to_csv() {
        $txt_file = storage_path().'/csv/ingredients.txt';
        $delimiter = ',';
        $handle = fopen($txt_file, 'r');

        if( !file_exists($txt_file) ||
            !is_readable($txt_file) || 
            $handle == FALSE)
            return FALSE;
        
        $ingredients = array();
        while (($row = fgetcsv($handle, 1000, $delimiter, '"')) !== FALSE) {
            if ( $row[0] == '' || strpos($row[0], '//') !== FALSE || strpos($row[0], '#') !== FALSE ) continue;
            $ingredients[] = [
                'name' => strval($row[0]),
                'ingredient_category_id' => $row[1],
                'ingredient_subcategory_id' => $row[2]
            ];
        }
        fclose($handle);

        // Organize Ingredients by Alphabetical Order
        usort($ingredients, function ($ingredient1, $ingredient2) {
            return $ingredient1['name'] <=> $ingredient2['name'];
        });
        $csv_file = storage_path().'/csv/ingredients.csv';
        $handle = fopen($csv_file, 'w') or die('Cannot Open File: ' . $csv_file);
        // csv file for seeding
        foreach ($ingredients as $ingredient) {
            foreach($ingredient as $key => $value) {
                if ($key == 'name')
                    $ingredient[$key] = trim(strval((str_replace(' - ', ', ', $ingredient[$key]))));
                else {
                    $ingredient[$key] = trim($ingredient[$key]);
                    $ingredient[$key] = intval($ingredient[$key]);
                }
            }
            fputcsv($handle, $ingredient);
        }
        fclose($handle);
    }
}