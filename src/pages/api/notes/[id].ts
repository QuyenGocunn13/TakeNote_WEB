import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req
  const { id } = req.query

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'ID không hợp lệ' })
  }

  switch (method) {
    case 'PUT': {
      const { title } = req.body

      const { data, error } = await supabase
        .from('notes')
        .update({ title })
        .eq('id', id)

      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json(data)
    }

    case 'DELETE': {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', id)

      if (error) return res.status(500).json({ error: error.message })
      return res.status(204).end()
    }

    default:
      return res.status(405).json({ error: 'Phương thức không hỗ trợ' })
  }
}
