import Link from 'next/link'
import Image from 'next/image'

type Note = {
  id: string
  title: string
  url: string
  thumbnail: string
}

export default function NoteCard({
  note,
  onDelete,
}: {
  note: Note
  onDelete: () => void
}) {
  return (
    <div className="border rounded-xl p-4 shadow w-full max-w-sm bg-white dark:bg-gray-800">
      <div className="relative w-full h-32">
        <Image
          src={note.thumbnail}
          alt="thumbnail"
          fill
          className="rounded object-cover"
        />
      </div>

      <h2 className="text-lg font-semibold mt-2 text-gray-900 dark:text-gray-100">
        {note.title}
      </h2>

      <a
        href={note.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 text-sm break-all"
      >
        {note.url}
      </a>

      <div className="mt-2 flex justify-between">
        <Link href={`/edit/${note.id}`} className="text-yellow-600">
          Sửa
        </Link>
        <button onClick={onDelete} className="text-red-600">
          Xoá
        </button>
      </div>
    </div>
  )
}
