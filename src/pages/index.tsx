import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import NoteCard from '@/components/NoteCard'
import { useRouter } from 'next/router'
import Link from 'next/link'

type Note = {
  id: string
  title: string
  url: string
  thumbnail: string
  [key: string]: any
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([])
  const router = useRouter()

  const fetchNotes = async () => {
    const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false })
    if (!error) setNotes(data || [])
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push('/login')
      else fetchNotes()
    })
  }, [])

  const handleDelete = async (id: string) => {
    await supabase.from('notes').delete().eq('id', id)
    fetchNotes()
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Ghi chú trang web</h1>
        <Link href="/create" className="bg-blue-600 text-white px-4 py-2 rounded">+ Thêm ghi chú</Link>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={() => handleDelete(note.id)} />
        ))}
      </div>
    </div>
  )
}