<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:clients,email',
            'phone' => 'nullable|string|max:16|min:11',
            'cep' => 'nullable|string|max:10|min:8',
            'address' => 'nullable|string|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            'first_name.required' => 'Primeiro nome do cliente é obrigatório.',
            'first_name.max' => 'Tamanho máximo para primeiro nome é de 255 caracteres.',
            'first_name.string' => 'O primeiro nome deve ser um texto válido.',

            'last_name.required' => 'Sobrenome do cliente é obrigatório.',
            'last_name.max' => 'Tamanho máximo para o sobrenome é de 255 caracteres.',
            'last_name.string' => 'O sobrenome deve ser um texto válido.',
            
            'email.required' => 'E-mail é obrigatório',
            'email.max' => 'Tamanho máximo para o email é de 255 caracteres.',
            'email.email' => 'O campo e-mail deve ser um endereço de e-mail válido.',
            'email.unique' => 'Este e-mail já está cadastrado em outro cliente.',
            
            'phone.max' => 'Campo de telefone deve ter no máximo 16 caracteres.',
            'phone.min' => 'Campo de telefone deve ter no mínimo 11 caracteres.',
            
            'cep.max' => 'CEP deve ter no máximo 10 caracteres.',
            'cep.min' => 'CEP deve ter no mínimo 8 caracteres.',
            
            'address.max' => 'Campo do endereço deve ter no máximo 255 caracteres.',
        ];
    }
}
