export function ModifyClient({ show, modalMode, formData, setFormData, onClose, onSubmit }) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {modalMode === 'create' ? 'Cadastrar Novo Cliente' : 'Editar Cliente'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required
                  value={formData.first_name}
                  onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Sobrenome</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required
                  value={formData.last_name}
                  onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">E-mail</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Telefone</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">CEP</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.cep || ''}
                    onChange={(e) => setFormData({...formData, cep: e.target.value})}
                  />
                </div>
                <div className="col-md-8 mb-3">
                  <label className="form-label">Endereço</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    value={formData.address || ''}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {modalMode === 'create' ? 'Cadastrar Cliente' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}