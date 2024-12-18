// pages/api/users.js
import { supabase } from '../../lib/supabase';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // 查询用户表中的数据
    const { data, error } = await supabase
      .from('users') // 假设你已经在 Supabase 中创建了一个 "users" 表
      .select('*');

    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(200).json(data);
    }
  } else if (req.method === 'POST') {
    // 向用户表插入新数据
    const { name, email } = req.body;
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email }]);

    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(201).json(data);
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
