'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../utils/api';

export default function DashboardPage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) return router.push('/login');
    api
      .get('/users/me')
      .then(res => setUser(res.data))
      .catch(() => router.push('/login'));
  }, []);

  if (!user) return <div>Loading...</div>;
  return <h1>환영합니다, {user.username}님!</h1>;
}
