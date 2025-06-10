'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        router.push('/dashboard');
      } else {
        const data = await res.json();
        setError(data.message || 'Đăng nhập thất bại');
      }
    } catch (err) {
      setError('Lỗi kết nối mạng');
    } finally {
      setIsLoading(false);
    }
  };

    return (
    <div className="min-h-screen flex items-center justify-center bg-[#F9F6EE]">
      <div className="flex shadow-lg rounded-xl overflow-hidden w-[700px]">
        {/* Left side - Logo */}
        <div className="w-1/2 bg-cover bg-center flex items-center justify-center p-8"  style={{ backgroundImage: "url('/logo.png')" }}>
          {/* <img src="/logo.png" alt="XANH Logo" className="w-16 mb-4" /> */}
        </div>

        {/* Right side - Login Form */}
        <form onSubmit={handleLogin} className="w-1/2 bg-white p-8 flex flex-col justify-center">
          <h2 className="text-xl font-bold text-center mb-4">ĐĂNG NHẬP</h2>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Email</label>
            <div className="flex items-center border rounded-full px-4 py-2 bg-[#F6F4E8]">
              <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
              <span className="material-icons text-gray-500 mr-2"></span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent w-full focus:outline-none placeholder-gray-500"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Mật khẩu</label>
            <div className="flex items-center border rounded-full px-4 py-2 bg-[#F6F4E8]">
              <span className="material-icons text-gray-500 mr-2"></span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent w-full focus:outline-none placeholder-gray-500"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#BBD38B]  rounded-full py-2 mt-4 hover:bg-[#92c676] transition"
          >
            {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}