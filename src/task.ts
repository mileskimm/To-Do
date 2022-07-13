
export enum TaskStatus{
    TODO = 1,
    IN_PROGRESS = 2,
    DONE = 3,
}

export class Task  {
    id: number = 0;
    title: string;
    status: TaskStatus;
    createdAt: Date;

    constructor(title:string, status:TaskStatus){
        this.createdAt = new Date();
        this.title = title;
        this.status = status;
    }
  }