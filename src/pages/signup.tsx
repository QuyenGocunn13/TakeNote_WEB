import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else router.push('/')
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">Đăng ký</h1>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 w-full mb-2" />
      <input type="password" placeholder="Mật khẩu" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 w-full mb-2" />
      <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2">Đăng ký</button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}