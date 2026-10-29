import { toast } from 'react-toastify';
import { useEffect, useState } from 'react'
import { ModifyClient } from '../../components/Modals/Client/ModifyClient';
import { DeleteClient } from '../../components/Modals/Client/DeleteClient';
import api from '../../services/api'
import './Clients.css'

export default function Clients(){
  const [clients, setClients] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [modalMode, setModalMode] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [deleteClient, setDeleteClient] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    cep: '',
    address: ''
  });

  useEffect(() => { loadClients() }, [])


  const loadClients = async () => {
    try{
      const response = await api.get('/clients');

      const data = response.data

      setClients(data);

    } catch (error){
      console.error('Erro ao buscar clientes: ', error)

      setError('Não foi possível carregar a lista de clientes. Tente novamente mais tarde.');

    } finally { setLoading(false) }
  }
  
  const handleOpenCreate = () => {
    setModalMode('create');
    setFormData({ id: '', first_name: '', last_name: '', email: '', phone: '', cep: '', address: '' });
    setShowModifyModal(true);
  };

  const handleOpenEdit = (client) => {
    setModalMode('edit');
    setFormData(client);
    setShowModifyModal(true);
  };

  const handleOpenDelete = (clientId) => {
    setDeleteClient(clientId);
    setShowDeleteModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'create') {
        await api.post('/clients', formData);
        toast.success('Cliente cadastrado com sucesso!')

      } else if (modalMode === 'edit') {
        await api.put(`/clients/${formData.id}`, formData);
        toast.success('Cliente atualizado com sucesso!')

      } else {
        await api.delete(`/clients/${deleteClient}`);
        toast.success('Cliente excluído com sucesso!')
      }

      setShowModifyModal(false);
      setShowDeleteModal(false);

      loadClients();
    } catch (error) {
      if(error.response && error.response.status === 422){
        const errors = error.response.data.errors;
        const firstKey = Object.keys(errors)[0]

        toast.warning(errors[firstKey][0]);
      } else {
        toast.error('Ocorreu um erro ao salvar cliente.')
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
    }
  };

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
          Clientes
        </h2>
        <i className="clients__add_client bi bi-person-plus-fill fs-2 mx-4 px-2" onClick={handleOpenCreate}></i>
      </div>
      <div className='clients__container rounded-4 overflow-hidden shadow-sm'>
        {clients.length === 0 ? (
          <div className='p-4 text-center bg-white'>
            <p className='mb-0 text-muted'>Não há nenhum cliente cadastrado no sistema.</p>
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
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className='ps-3'>{client.first_name} {client.last_name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone || '-'}</td>
                  <td>{client.cep || '-'}</td>
                  <td>{client.address || '-'}</td>
                  <td className='pe-3'>
                    <div className='d-flex justify-content-center gap-2'>
                      <button className='btn btn-sm btn-primary border-0' title='Editar' onClick={() => handleOpenEdit(client)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className='btn btn-sm btn-danger border-0' title='Excluir' onClick={() => handleOpenDelete(client.id)}>
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
      <ModifyClient 
        show={showModifyModal}
        modalMode={modalMode}
        formData={formData}
        setFormData={setFormData}
        onClose={() => {setShowModifyModal(false)}}
        onSubmit={handleSubmit}
      />
      <DeleteClient 
        show={showDeleteModal}
        onClose={() => {setShowDeleteModal(false)}}
        onSubmit={handleSubmit}
      />
    </>
  )
}