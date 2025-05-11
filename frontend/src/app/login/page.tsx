'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../utils/api';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post(
        '/token',
        new URLSearchParams({ username, password })
      );
      localStorage.setItem('access_token', res.data.access_token);
      router.push('/');
    } catch {
      alert('로그인 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="password"
        required
      />
      <button type="submit">로그인</button>
    </form>
  );
}