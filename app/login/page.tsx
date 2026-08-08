import { login } from './actions'

export default function LoginPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 bg-black text-white">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Bienvenido de nuevo</h1>
          <p className="text-gray-400 mt-2">Inicia sesión en tu cuenta</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Correo Electrónico</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Contraseña</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <button 
            formAction={login}
            className="w-full bg-emerald-500 text-black font-semibold rounded-lg px-4 py-3 hover:bg-emerald-400 transition-colors active:scale-[0.98]"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
    </main>
  )
}
