import Link from 'next/link'

export default function NoteCard({ note, onDelete }: { note: any, onDelete: () => void }) {
  return (
    <div className="border rounded-xl p-4 shadow w-full max-w-sm">
      <img src={note.thumbnail} alt="thumbnail" className="rounded w-full h-32 object-cover" />
      <h2 className="text-lg font-semibold mt-2">{note.title}</h2>
      <a href={note.url} target="_blank" className="text-blue-500 text-sm break-all">{note.url}</a>
      <div className="mt-2 flex justify-between">
        <Link href={`/edit/${note.id}`} className="text-yellow-600">Sửa</Link>
        <button onClick={onDelete} className="text-red-600">Xoá</button>
      </div>
    </div>
  )
}