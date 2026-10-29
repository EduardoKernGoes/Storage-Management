export function DeleteClient({show, onClose, onSubmit}){
  if (!show) return null

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <form onSubmit={onSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                Excluir Cliente
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <p className="fs-4 text-center">
                Tem certeza que você deseja <span className="text-danger fw-bold">EXCLUIR</span> este cliente?
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-danger">
                Excluir
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}