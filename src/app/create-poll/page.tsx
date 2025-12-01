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
     const removeOptions=(index:number)=>{
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
            
        } catch {
            
        }finally{
            
        }
     }
}