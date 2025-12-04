"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Poll } from "@/types";

export default function PollsPage() {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const response = await fetch("/api/polls");
        if (response.ok) {
          const data = await response.json();
          setPolls(data);
        }
      } catch (error) {
        console.error("Ошибка загрузки опросов:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPolls();
  }, []);
  if (loading) {
    return (
      <div
        className="min-h-screen bg-linear-to-br
            from-blue-50 to-indigo-100 flex items-center justify-center"
      >
        <div className="text-center">
          <div className="text-xl">Загрузка опросов...</div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-500 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Все опросы
              </h1>
            <Link 
            href="/create-poll"
            className="bg-amber-500 text-white px-6 py-2
            rounded-lg hover:bg-green-600 transition"
            >
              Создать опрос
              </Link>
          </div>
          {polls.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h2 className="text-xl font-semibold mb-4">Опросов пока нет</h2>
              <p className="text-gray-600 mb-6">Будьте первым, кто создаст опрос!</p>
              <Link 
              href="/create-poll"
              className="bg-green-500 text-white px-6 py-2
            rounded-lg hover:bg-green-600 transition"
              >
                Создать первый опрос
                </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {polls.map((poll) => (
                <div 
                key={poll.id}
                className="bg-white rounded-lg shadow-md p-6"
                >
                  <h2 
                  className="text-xl font-semibold mb-3"
                  >
                    {poll.question}
                    </h2>
                  <div 
                  className="flex justify-between items-center text-sm text-gray-500 mb-4"
                  >
                    <span>Автор: {poll.createdByName}</span>
                    <span>Голосов: {poll.totalVotes}</span>
                    <span>
                      Создан:{" "}
                      {new Date(poll.createdAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    {poll.options.map((option) => (
                      <div 
                      key={option.id} 
                      className="flex justify-between items-center p-3 border rounded"
                      >
                        <span>{option.text}</span>
                        <span>{option.votes} голосов</span>
                      </div>
                    ))}
                  </div>
                  <Link href={`/polls/${poll.id}`}
                  className="block w-full bg-blue-500 text-white text-center py-2 rounded hover:bg-blue-600 transition"
                >
                  Проголосовать
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
