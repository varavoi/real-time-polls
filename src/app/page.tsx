

export default function Home() {
  return (
    <main className=" min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Опросы в реальном времени
          </h1>
        <p className="text-center text-gray-600 mb-8">
          Создавайте опросы и следите за результатами в реальном времени
        </p>
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            Добро пожаловать! 👋
            </h2>
          <p className="text-gray-600 mb-6">
            Здесь мы будем создавать наше приложение для опросов. 
            Следующие шаги: аутентификация и создание первого опроса.
            </p>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white
              py-2 px-4 rounded hover:bg-blue-600 transition">
                Войти (скоро)
              </button>
              <button className="w-full bg-green-500 text-white
              py-2 px-4 rounded hover:bg-green-600 transition">
                Создать опрос (скоро)
              </button>
            </div>
        </div>
      </div>
    </main>
  );
}
