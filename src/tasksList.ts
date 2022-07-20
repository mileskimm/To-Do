import { Task, TaskStatus } from "./task"

export class TasksList{
    name: string;
    tasks: Task[];
    shownTasks: Task[] = [];

    constructor(name: string){
        this.name = name;
        this.tasks = [];
    }

    addListItem(task: Task, taskStatus:TaskStatus){
        task.status = taskStatus;
        this.tasks.push(task);
    }

    
    drawTask(task:Task){
        let hiddenCheckbox = task.status === TaskStatus.DONE? 'hidden' : 'visible';
        let visibilityComplete = task.status !== TaskStatus.IN_PROGRESS ? 'hidden':'visible';
        let visibilityDelete = task.status !== TaskStatus.DONE ? 'visible':'hidden';
        let isChecked = task.status === TaskStatus.IN_PROGRESS ? 'checked' : '';
        let response = `
        
        <li class="task_${task.id}">
        <label>${task.title}<input class='move_task_chekbox' ${isChecked} data-id="${task.id}" style='visibility:${hiddenCheckbox};' type="checkbox"></label>
        <button class="btn-complete" data-id="${task.id}" style='visibility:${visibilityComplete};' type="button">Complete</button>
        <button class="btn-delete"  data-id="${task.id}" id="delete_btn_${task.id}"  style='visibility:${visibilityDelete};'  type="button">Delete</button>
        </li>
        `
    
        return response;
    }

    drawList(){
        let tasks_string = '';
        for(let task of this.tasks){
            tasks_string+=this.drawTask(task);
        }
        return `
        <h3 id="ListName">${this.name}</h3>
        <ul class='list_${this.name}'>
            ${tasks_string}
        </ul>
        `
    }

    findTaskById(id:number){
        return this.tasks.find(t=>t.id+''===id+'');
    }

    removeTaskById(id:number):void{
        let taskIndex = this.tasks.findIndex(t=> t.id+''===id+'')
        if(taskIndex >= 0){
           this.tasks.splice(taskIndex,1)  
        }
         
        
        
    }
    

}


