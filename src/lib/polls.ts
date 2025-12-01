import type { Poll, CreatePollData, PollOption } from '@/types';

// Временное хранилище в памяти (заменим на БД позже)
const polls:Poll[]=[]
let nextId=1

export const pollsService = {
    // Создать новый опрос
    createPoll(data:CreatePollData,userId:string,userName:string):Poll{
        const poll:Poll ={
            id:`poll-${nextId++}`,
            question:data.question,
            options:data.options.map((text,index)=>({
                id:`opt-${index}`,
                text,
                votes:0,
            })),
            createdAt:new Date(),
            createdBy:userId,
            createdByName:userName,
            totalVotes:0
        }
        polls.push(poll)
        return poll
    },
    // Получить все опросы
    getAllPolls():Poll[]{
        return polls.sort((a,b)=>b.createdAt.getTime()-a.createdAt.getTime())
    },

    // Получить опрос по ID
    getPollById(id:string):Poll|undefined{
        return polls.find(poll=>poll.id===id)
    },

    // Проголосовать в опросе
    vote(pollId:string,optionId:string, userId:string=''):boolean{
        const poll =polls.find(p=>p.id===pollId)
        if(!poll) return false
        // TODO: Проверять, голосовал ли уже пользователь
        // Пока разрешаем множественные голоса от одного пользователя
        console.log(userId)
        const option = poll.options.find(opt=>opt.id===optionId)
        if(!option) return false
        option.votes++
        poll.totalVotes++
        return true
    },
    getPollsById(userId:string){
        return polls.filter(poll=>poll.createdBy===userId)
            .sort((a,b)=>b.createdAt.getTime()-a.createdAt.getTime())
    },
}