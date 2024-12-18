// pages/api/users.js
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // 查询 users 表中的所有数据
      const { data, error } = await supabase
        .from('users')
        .select('*');  // 获取所有字段

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      // 返回查询到的数据
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
