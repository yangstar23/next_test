// pages/index.js 或 src/app/page.js
'use client';  // 标记为客户端组件

import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 添加 loading 状态

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false); // 无论成功失败都设置 loading 为 false
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users List</h1>
      {isLoading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '1rem' 
        }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            border: '2px solid #f3f3f3',
            borderTop: '2px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
        </div>
      ) : (
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email}
              </li>
            ))
          ) : (
            <li>No users found</li>
          )}
        </ul>
      )}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
