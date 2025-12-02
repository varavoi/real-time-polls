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
    <div>
      <div>
        <div>
          <div>
            <h1>Все опросы</h1>
            <Link href="/create-poll">Создать опрос</Link>
          </div>
          {polls.length === 0 ? (
            <div>
              <h2>Опросов пока нет</h2>
              <p>Будьте первым, кто создаст опрос!</p>
              <Link href="/create-poll">Создать первый опрос</Link>
            </div>
          ) : (
            <div>
              {polls.map((poll) => (
                <div key={poll.id}>
                  <h2>{poll.question}</h2>
                  <div>
                    <span>Автор: {poll.createdByName}</span>
                    <span>Голосов: {poll.totalVotes}</span>
                    <span>
                      Создан:{" "}
                      {new Date(poll.createdAt).toLocaleDateString("ru-RU")}
                    </span>
                  </div>
                  <div>
                    {poll.options.map((option) => (
                      <div key={option.id}>
                        <span>{option.text}</span>
                        <span>{option.votes} голосов</span>
                      </div>
                    ))}
                  </div>
                  <Link href={`/polls/${poll.id}`}>Проголосовать</Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
