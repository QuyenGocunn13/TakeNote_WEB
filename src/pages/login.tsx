import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'

export default function Login() {
  const router = useRouter()
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/')
    })

    const theme = localStorage.getItem('theme')
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      setIsDark(true)
    }
  }, [])

  const toggleDarkMode = () => {
    const dark = document.documentElement.classList.toggle('dark')
    setIsDark(dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://172.16.0.1:3000/' // đổi nếu deploy
      }
    })
    if (error) console.error('OAuth login error:', error.message)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
          Đăng nhập bằng Google
        </h1>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition"
        >
          Đăng nhập với Google
        </button>

        <button
          onClick={toggleDarkMode}
          className="mt-4 w-full py-2 rounded-lg border dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          Chuyển nền {isDark ? 'Sáng' : 'Tối'}
        </button>
      </div>
    </div>
  )
}
