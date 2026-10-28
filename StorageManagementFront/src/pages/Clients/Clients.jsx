import api from '../../services/api'
import './Clients.css'

export default function Clients(){
  async function registerClient(){
    try{
      const response = await api.post('/clients', {
        'first_name': 'Teste',
        'last_name': 'da Silva',
        'email': 'teste@gmail.com',
        'phone': '51998578496',
        'cep': '84758985',
        'address': 'Rua de teste número 98'
      });
      console.log(response)
    } catch (error){
      console.error('Erro ao cadastrar cliente: ', error)
    }
  }

  return (
    <>
      <h1>
        Área dos clientes
      </h1>
      <button onClick={registerClient}>
        Adicionar cliente
      </button>
    </>
  )
}