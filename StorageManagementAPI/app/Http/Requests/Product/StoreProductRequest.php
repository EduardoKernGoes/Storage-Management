<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:0',
            'partner_id' => 'nullable|exists:partners,id',
        ];
    }

    public function messages(): array {
        return [
            'name.required' => 'Nome do produto é obrigatório.',
            'name.max' => 'Tamanho máximo do nome é de 255 caracteres.',
            'name.string' => 'Nome deve ser um texto válido.',

            'description.string' => 'Descrição deve ser um texto válido.',

            'price.required' => 'Preço do produto é obrigatório.',
            'price.numeric' => 'Preço deve ser um número válido.',
            'price.min' => 'Preço do produto não pode ser negativo.',

            'quantity.required' => 'Quantidade do produto é obrigatória.',
            'quantity.integer' => 'Quantidade deve ser um número inteiro válido.',
            'quantity.min' => 'Quantidade deve ser um valor positivo.',

            'partner_id.exists' => 'Parceiro selecionado não foi encontrado no sistema.',
        ];
    }
}
