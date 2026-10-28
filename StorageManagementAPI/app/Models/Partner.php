<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        'social_name',
        'email',
        'cnpj',
        'phone',
        'cep',
        'address'
    ];

    public function products(){
        return $this->hasMany(Product::class);
    }
}
