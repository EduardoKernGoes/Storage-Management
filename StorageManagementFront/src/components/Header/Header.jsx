import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header(){
  return (
    <header className="px-4 w-min mb-4">
      <div className='mx-auto d-flex justify-content-between align-items-center py-3' style={{ maxWidth: 1500 }}>
        <div className='component__bg py-2 px-4 rounded-2 header_logo d-flex align-items-center'>
          <div className='header__signature d-flex align-items-center justify-content-center'>
            <a
              href='https://github.com/EduardoKernGoes'
              target='_blank'
              className='font-monospace fs-4 fw-semibold m-2 text-black text-decoration-none'
            >
              EK
              </a>
          </div>
          <h1 className='ps-2 m-0'>
            Storage Management
          </h1>
        </div>
        <nav className='nav gap-2'>
          <NavLink
            to="/"
            className='component__bg py-2 px-4 rounded-2 nav-link fw-medium fs-5 text-black'
            style={({ isActive }) => ({ background: isActive ? 'var(--ligth-bg)' : '' })}
          >
            Home
          </NavLink>

          <NavLink
            to="/produtos"
            className='component__bg py-2 px-4 rounded-2 nav-link fw-medium fs-5 text-black'
            style={({ isActive }) => ({ background: isActive ? 'var(--ligth-bg)' : '' })}
          >
            Produtos
          </NavLink>

          <NavLink
            to="/clientes"
            className='component__bg py-2 px-4 rounded-2 nav-link fw-medium fs-5 text-black'
            style={({ isActive }) => ({ background: isActive ? 'var(--ligth-bg)' : '' })}
          >
            Clientes
          </NavLink>

          <NavLink
            to="/parceiros"
            className='component__bg py-2 px-4 rounded-2 nav-link fw-medium fs-5 text-black'
            style={({ isActive }) => ({ background: isActive ? 'var(--ligth-bg)' : '' })}
          >
            Parceiros
          </NavLink>
        </nav>
      </div>
    </header>
  )
}