import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '@/lib/supabaseClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  switch (method) {
    case 'GET': {
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) return res.status(500).json({ error: error.message })
      return res.status(200).json(data)
    }

    case 'POST': {
      const { url, title, thumbnail, user_id } = req.body

      if (!url || !user_id) {
        return res.status(400).json({ error: 'Thiếu trường bắt buộc' })
      }

      const { data, error } = await supabase.from('notes').insert([
        { url, title, thumbnail, user_id }
      ])

      if (error) return res.status(500).json({ error: error.message })
      return res.status(201).json(data)
    }

    default:
      return res.status(405).json({ error: 'Phương thức không hỗ trợ' })
  }
}
