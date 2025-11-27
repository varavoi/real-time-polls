"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        alert("Ошибка входа. Проверьте email и пароль.");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      alert("Произошла ошибка при входе");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100
    flex items-center justify-center py-8 ">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Вход в систему
          </h1>
        <form 
        onSubmit={handleSubmit}
        className="space-y-4"
        >
          <div>
            <label
            className="block text-sm font-medium text-gray-700 mb-1">
              Email
              </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <label
            className="block text-sm font-medium text-gray-700 mb-1"
            >
              Пароль
              </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded
          hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Вход..." : "Войти"}
          </button>
        </form>
        <div
        className="mt-6 p-4 bg-gray-50 rounded-md"
        >
          <p className="text-sm text-gray-600 text-center">
            Тестовые данные для входа:
            </p>
          <p className="text-sm text-gray-600 text-center">
            Email: test@test.com
            <br />
            Пароль: password123
          </p>
        </div>
      </div>
    </div>
  );
}
