import { supabase } from '@/lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Header() {
  const router = useRouter()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="flex justify-between items-center p-4 border-b mb-4">
      <h1 className="text-xl font-bold">Takenote</h1>
      <button onClick={handleLogout} className="text-red-500">Đăng xuất</button>
    </div>
  )
}
