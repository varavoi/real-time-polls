import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { pollsService } from '@/lib/polls';

export async function POST(request:NextRequest){
    const session = await getServerSession(authOptions)
    if(!session?.user?.id){
        return NextResponse.json({error:'Не авторизован'},{status:401})
    }
    try {
        const body = await request.json()
        const {question, options} = body
        if(!question || !options || !Array.isArray(options) || options.length<2){
            return NextResponse.json({error:'Неверные данные'},{status: 400})
        }
        const poll = pollsService.createPoll(
            {question, options},
            session.user.id,
            session.user.name || 'Аноним'
        )
        return NextResponse.json(poll)
    } catch {
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}
export async function GET(){
    try {
        const polls = pollsService.getAllPolls()
        return NextResponse.json(polls)
    } catch {
        return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 });
    }
}