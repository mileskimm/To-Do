import { Task } from "./task"

export class TasksList{
    name: string;
    tasks: Task[];
    idCounter;
    shownTasks: Task[] = [];

    constructor(name: string){
        this.name = name;
        this.idCounter = 1;
        this.tasks = [];
    }

    addListItem(task: Task){
        task.id = this.idCounter;
        this.idCounter++;
            this.tasks.push(task);
       
    }
}
