import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '@/lib/supabaseClient'

async function fetchMetadata(url: string) {
  const res = await fetch(`https://jsonlink.io/api/extract?url=${encodeURIComponent(url)}`)
  return await res.json()
}

interface NoteFormProps {
  note?: {
    id: string
    url: string
    title: string
  }
}

export default function NoteForm({ note }: NoteFormProps) {
  const [url, setUrl] = useState(note?.url || '')
  const [title, setTitle] = useState(note?.title || '')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (note) {
      setUrl(note.url)
      setTitle(note.title)
    }
  }, [note])

  const handleSubmit = async () => {
    setLoading(true)
    const user = await supabase.auth.getUser()
    let finalTitle = title
    let thumbnail = ''

    if (!note) {
      // Nếu tạo mới, tự động lấy metadata
      const meta = await fetchMetadata(url)
      finalTitle = meta.title || url
      thumbnail = meta.images?.[0] || ''
      await supabase.from('notes').insert({
        url,
        title: finalTitle,
        thumbnail,
        user_id: user.data.user?.id
      })
    } else {
      // Nếu chỉnh sửa
      await supabase.from('notes').update({ title: finalTitle }).eq('id', note.id)
    }

    router.push('/')
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl mb-4">{note ? 'Chỉnh sửa ghi chú' : 'Tạo ghi chú mới'}</h1>

      {!note && (
        <input
          type="text"
          placeholder="Nhập URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border p-2 w-full mb-2"
        />
      )}

      <input
        type="text"
        placeholder="Tiêu đề (tuỳ chọn)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? 'Đang lưu...' : note ? 'Lưu thay đổi' : 'Tạo ghi chú'}
      </button>
    </div>
  )
}
