import { useEffect, useState } from 'react';
import { ModifyProduct } from '../../components/Modals/Product/ModifyProduct';
import api from '../../services/api'
import './Products.css'

export default function Products(){
  const [products, setProducts] = useState(null);
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deleteProduct, setDeleteProduct] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    cep: '',
    address: ''
  });

  useEffect(() => { loadProducts() }, [])

  const loadProducts = async () => {
    try{
      const response = await api.get('/products');

      const data = response.data

      console.log(response)
      console.log(data)

      setProducts(data);

    } catch (error){
      console.error('Erro ao buscar clientes: ', error)

      setError('Não foi possível carregar a lista de produtos. Tente novamente mais tarde.');

    } finally { setLoading(false) }
  }

  const openHandle = (typeModal, data) => {
    switch(typeModal){
      case 'create':
        console.log('Criar produto')
        setModalMode('create');
        setShowModal(true);
        break;

      case 'edit':
        console.log('Editar produto')
        break;
      
      case 'delete':
        console.log('Excluir produto')
        break;
        
    }
  }

  const submitHandle = async (e) => {
    e.preventDefault();
    try {
      let response
      if (modalMode === 'create') {
        response = await api.post('/products', formData);
      } else if (modalMode === 'edit') {
        response = await api.put(`/products/${formData.id}`, formData);
      } else {
        response = await api.delete(`/products/${deleteProduct}`);
      }

      toast.success(response.data.message)

      loadClients();
    } catch (error) {
      if(error.response && error.response.status === 422){
        const errors = error.response.data.errors;
        const firstKey = Object.keys(errors)[0]

        toast.warning(errors[firstKey][0]);
      } else {
        const operation = modalMode === 'create' ? 'criar' : modalMode === 'edit' ? 'atualizar' : 'excluir';
        toast.error(`Ocorreu um erro ao ${operation} produto.`)
      }
    } finally {
      setDeleteClient(null)
      setFormData({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        cep: '',
        address: ''
      })
      setModalMode(null);
      setShowModal(false);
    }
  }

  if(loading){
    return <h1>Carregando...</h1>
  }

  if(error){
    return <h1 className='fs-2 text-danger text-center'>{error}</h1>
  }

  return (
    <>
      <div className='d-flex align-items-center justify-content-between mb-1'>
        <h2>
          Produtos
        </h2>
        <i className="add_item_icon bi bi-plus-square-fill fs-2 mx-4 px-2" onClick={() => openHandle('create')}></i>
      </div>
      <div className='clients__container rounded-4 overflow-hidden shadow-sm'>
        {products.length === 0 ? (
          <div className='p-4 text-center bg-white'>
            <p className='mb-0 text-muted'>Não há nenhum produto cadastrado no sistema.</p>
          </div>
        ) : (
          <table className='table table-striped align-middle mb-0'>
            <thead>
              <tr>
                <th className='clients__table_header py-3 ps-3'>Nome Completo</th>
                <th className='clients__table_header py-3'>E-mail</th>
                <th className='clients__table_header py-3'>Telefone</th>
                <th className='clients__table_header py-3'>CEP</th>
                <th className='clients__table_header py-3'>Endereço</th>
                <th className='clients__table_header py-3 text-center pe-3'></th>
              </tr>
            </thead>
            <tbody>
              {products.map((client) => (
                <tr key={client.id}>
                  <td className='ps-3'>{client.first_name} {client.last_name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone || '-'}</td>
                  <td>{client.cep || '-'}</td>
                  <td>{client.address || '-'}</td>
                  <td className='pe-3'>
                    <div className='d-flex justify-content-center gap-2'>
                      <button className='btn btn-sm btn-primary border-0' title='Editar' onClick={() => openHandle('edit', client)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className='btn btn-sm btn-danger border-0' title='Excluir' onClick={() => openHandle('delete', client.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <ModifyProduct
        modalMode={modalMode}
        onSubmit={submitHandle}
        show={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  )
}