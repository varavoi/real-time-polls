
"use client"
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  // Хук useSession возвращает информацию о текущем пользователе

  const {data:session, status} = useSession()
  // Пока загружается информация о сессии - показываем загрузку
  if(status==='loading'){
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50
      to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-xl">
          Загрузка...
          </div>
        </div>
      </div>
    )
  }
  return (
    <main className=" min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container max-auto px-4">
        <h1
        className="text-4xl font-bold text-center text-gray-800 mb-2"
        >
          Опросы в реальном времени
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Создавайте опросы и следите за результатами в реальном времени
        </p>
        <div className="max-w-d mx-auto bg-white rounded-lg shadow-md p-6">
          {session ? (
            <>
              <h2 className="text-xl font-semibold mb-4">
                Добро пожаловать, {session.user?.name}
              </h2>
              <p className="text-gray-600 mb-6">
                Теперь вы можете создавать опросы и участвовать в голосованиях.
              </p>
              <div className="space-y-4">
                  <Link 
                  href='/create-poll'
                  className="block w-full bg-green-500 text-white 
                  py-2 px-4 rounded hover:bg-green-600 transition text-center"
                  >
                    Создать опрос 
                  </Link>
                  <button 
                  onClick={()=>signOut()}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                  >
                    Выйти
                  </button>
              </div>
          </>
          ):(
            <>
            <h2 className="text-xl font-semibold mb-4">
                Добро пожаловать
              </h2>
              <p className="text-gray-600 mb-6">
                Войдите в систему, чтобы создавать опросы и участвовать в голосованиях.
              </p>
              <div className="space-y-4">
                  <Link 
                  href='/auth/signin'
                  className="block w-full bg-blue-500 text-white 
                  py-2 px-4 rounded hover:bg-blue-600 transition text-center"
                  >
                    Войти
                  </Link>
                  <Link 
                  href='/polls'
                  className="block w-full bg-gray-500 text-white 
                  py-2 px-4 rounded hover:bg-gray-600 transition text-center"
                  >
                    Посмотреть опросы (без входа)
                  </Link>
              </div>
          </>
        )}
        </div>
      </div>
    </main>
  );
}
