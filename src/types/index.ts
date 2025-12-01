export type PollOptions{
    id:string;
    text:string;
    votes:number;
}
export interface Poll{
    id:string;
    question:string;
    options:PollOptions[];
    createdAt:Date;
    createdBy:string;
    createdByName:string;
    totalVotes:number
}
export interface CreatePollData{
    question:string;
    options:string[]
}