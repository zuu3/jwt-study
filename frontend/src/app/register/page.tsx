'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../../utils/api';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post(
        '/register',
        JSON.stringify({ username, password }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      router.push('/login');
    } catch {
      alert('회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 300, gap: 8 }}>
      <h2>회원가입</h2>
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
        autoComplete="new-password"
        required
      />
      <button type="submit">회원가입</button>
      <button type="button" onClick={() => router.push('/login')} style={{ background: 'none', border: 'none', color: 'blue', cursor: 'pointer', marginTop: 4 }}>
        이미 계정이 있다면 로그인
      </button>
    </form>
  );
}