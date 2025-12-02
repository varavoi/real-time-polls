"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function CreatePoll(){
    const {data:session} = useSession()
    const router=useRouter()
     const [question, setQuestion] = useState('')
     const [options,setOptions] = useState(['',''])
     const [loading,setLoading] = useState(false)
     // Если пользователь не авторизован, показываем сообщение
     if(!session){
        return (
            <div>
                <div>
                    <h2>Доступ запрещен</h2>
                    <p>Для создания опроса необходимо войти в систему.</p>
                    <button
                        onClick={()=>router.push('/auth/signin')}
                    >Войти</button>
                </div>
            </div>
        )
     }
     const addOption=()=>{
        if(options.length<6){
            setOptions([...options,''])
        }
     }
     const removeOption=(index:number)=>{
        if(options.length>2){
            const newOptions = [...options]
            newOptions.splice(index,1)
            setOptions(newOptions)
        }
     }
     const updateOption = (index:number,value:string)=>{
        const newOptions = [...options]
        newOptions[index]=value
        setOptions(newOptions)
     }
     const handleSubmit = async (e:React.FormEvent)=>{
        e.preventDefault()
        // Валидация
        if(!question.trim()){
            alert('Введите вопрос опроса')
            return
        }
        const validOptions =options.filter(opt=>opt.trim() !=='')
        if(validOptions.length<2){
            alert('Добавьте хотя бы 2 варианта ответа');
            return;
        }
        setLoading(true)
        try {
      const response = await fetch('/api/polls', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: question.trim(),
          options: validOptions,
        }),
      });

      if (response.ok) {
        router.push('/polls');
      } else {
        alert('Ошибка при создании опроса');
      }
    } catch {
      alert('Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };
     return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Создать новый опрос
          </h1>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Поле вопроса */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Вопрос опроса *
                </label>
                <input
                  type="text"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Например: Какой ваш любимый язык программирования?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md 
                  focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Варианты ответов */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Варианты ответов * (минимум 2)
                </label>
                <div className="space-y-3">
                  {options.map((option, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(index, e.target.value)}
                        placeholder={`Вариант ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300
                        rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {options.length > 2 && (
                        <button
                          type="button"
                          onClick={() => removeOption(index)}
                         className="px-3 py-2 bg-red-500 text-white
                         rounded hover:bg-red-600 transition"
                        >
                          Удалить
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                
                {options.length < 6 && (
                  <button
                    type="button"
                    onClick={addOption}
                    className="mt-3 px-4 py-2 bg-green-500 text-white
                    hover:bg-green-600 transition"
                  >
                    + Добавить вариант
                  </button>
                )}
                
                <p className="mt-2 text-sm text-gray-500">
                  Максимум 6 вариантов ответа
                </p>
              </div>

              {/* Кнопки */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 bg-gray-500 text-white py-2 px-4
                  rounded hover:bg-gray-600 transition"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-500 text-white py-2 px-4
                  rounded hover:bg-blue-600 transition disabled:opacity-50"
                >
                  {loading ? 'Создание...' : 'Создать опрос'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}