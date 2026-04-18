import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <header className='border-b border-slate-800 bg-slate-950/90'>
      <nav className='mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 text-slate-100'>
        <Link to='/' className='text-lg font-semibold tracking-tight'>
          Smart Task Manager
        </Link>
        <div className='flex items-center gap-4 text-sm'>
          <Link to='/login' className='transition hover:text-cyan-300'>
            Login
          </Link>
          <Link
            to='/register'
            className='rounded-md bg-cyan-500 px-3 py-1.5 font-medium text-slate-950 transition hover:bg-cyan-400'
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
