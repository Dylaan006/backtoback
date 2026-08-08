import { login } from './actions'

export default function LoginPage() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-6 bg-black text-white">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>
        
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
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
            Sign In
          </button>
        </form>
      </div>
    </main>
  )
}
