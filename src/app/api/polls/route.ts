// app/api/polls/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { pollsService } from '@/lib/polls';
// Вспомогательная функция для добавления CORS-заголовков
function withCors(response: NextResponse, request: NextRequest): NextResponse {
  const origin = request.headers.get('origin') || 'http://localhost:3000';
  response.headers.set('Access-Control-Allow-Origin', origin);
  response.headers.set('Access-Control-Allow-Credentials', 'true');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}
export async function OPTIONS(request: NextRequest) {
  // Обработка preflight-запросов CORS
  const response = NextResponse.json({});
  return withCors(response, request);
}
export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
   console.log('=== API /api/polls POST ===');
  console.log('Сессия от getServerSession:', session);
  console.log('ID пользователя из сессии:', session?.user?.id);
  console.log('Заголовки запроса:', Object.fromEntries(request.headers));
  if (!session?.user?.id) {
    const errorResponse = NextResponse.json({ error: 'Не авторизован' }, { status: 401 });
    return withCors(errorResponse, request); // 👈 Не забываем добавить заголовки к ошибке
  }

  try {
    const body = await request.json();
    const { question, options } = body;

    if (!question || !options || !Array.isArray(options) || options.length < 2) {
      const errorResponse = NextResponse.json({ error: 'Неверные данные' }, { status: 400 });
      return withCors(errorResponse, request);
    }

    const poll = pollsService.createPoll(
      { question, options },
      session.user.id,
      session.user.name || 'Аноним'
    );

    const successResponse = NextResponse.json(poll);
    return withCors(successResponse, request); // 👈 Добавляем заголовки к успешному ответу
  } catch (error) {
    console.error('Ошибка при создании опроса:', error);
    const errorResponse = NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    return withCors(errorResponse, request);
  }
}

export async function GET(request: NextRequest) {
  try {
    const polls = pollsService.getAllPolls();
    const successResponse = NextResponse.json(polls);
    return withCors(successResponse, request);
  } catch (error) {
    console.error('Ошибка при загрузке опросов:', error);
    const errorResponse = NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    return withCors(errorResponse, request);
  }
}