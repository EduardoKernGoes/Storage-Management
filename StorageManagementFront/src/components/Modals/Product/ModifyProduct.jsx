export function ModifyProduct({ show, modalMode, formData, setFormData, onClose, onSubmit }) {
  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {modalMode === 'create' ? 'Cadastrar Novo Produto' : 'Editar Produto'}
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
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descrição</label>
                <input 
                  type="text"
                  className="form-control"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label className="form-label">Preço</label>

                  <div className="input-group">
                    <span className="input-group-text">R$</span>
                    <input 
                      type="number" 
                      step="0.01"
                      min="0"
                      className="form-control"
                      placeholder="00.00"
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                    />
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Quantidade</label>
                  <input 
                    type="number" 
                    step="1"
                    min="0"
                    className="form-control" 
                    placeholder="0"
                    required
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Empresa Parceira</label>
                <input 
                  type="text" 
                  className="form-control"
                  value={formData.partner || ''}
                  onChange={(e) => setFormData({...formData, partner: e.target.value})}
                />
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