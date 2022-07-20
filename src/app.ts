import { Task, TaskStatus } from "./task"
import { TasksList } from "./tasksList"


document.addEventListener("DOMContentLoaded",async function (){
    const input = <HTMLInputElement>document.querySelector('#task-input')
    // const list = <HTMLUListElement>document.querySelector('.task-box')
    const button = <HTMLButtonElement>document.querySelector('#btn')
    // const buttonCompleted=<HTMLButtonElement>document.querySelector("#completed")
    // const form = <HTMLFormElement>document.querySelector(".task-form")
    
    let todoList = new TasksList("Todo");
    
    let inProgessList = new TasksList("InProgress");
    let complete = new TasksList("Complete");
    let lists = document.getElementById('lists') as HTMLElement;
    
    refreshData()
    
    // taskManager.addListItem(new Task('working',1))
    //  let  timeDiff:any


button.addEventListener('click', function clickEvent(event) {
        if(input.value === ""){
            alert("Please enter a task")
            event.preventDefault();
        }else{
        event.preventDefault();
        let task:Task={
            title: input.value,
            createdAt: new Date(),
            id: Math.floor(Math.random() * 1000000),
            status: TaskStatus.TODO,
        }   
        todoList.addListItem(task, TaskStatus.TODO)
        refreshData()
        input.value="";
        console.log(task.title +" created at :", task.createdAt)
        }
})


function refreshData(){
    let listsString='';
    listsString += todoList.drawList()
    listsString += inProgessList.drawList()
    listsString += complete.drawList()
    lists.innerHTML = listsString;
    bindFunc()
    
}






let startedAt: Date;

function bindFunc(){
    const deleteBtns = <HTMLButtonElement[]><unknown>document.querySelectorAll(`.btn-delete`)
    for(let b of deleteBtns){
    b.addEventListener('click', function clickEvent(event:any) {
        let btnId =event.path[0].getAttribute('data-id');
        todoList.removeTaskById(btnId);
        inProgessList.removeTaskById(btnId);
        console.log(123)
        refreshData();
    }) 
    }
    
    const moveTaskChekbox = <HTMLInputElement[]><unknown>document.querySelectorAll(`.move_task_chekbox`)
    // console.log(moveTaskChekbox)
    for(let b of moveTaskChekbox){
    b.addEventListener('change', function clickEvent(event:any) {
        if(b.checked){
        let taskId =event.path[0].getAttribute('data-id');
        let task = todoList.findTaskById(taskId) as Task;
        inProgessList.addListItem(task, TaskStatus.IN_PROGRESS);
        todoList.removeTaskById(taskId);
        startedAt= new Date()
        console.log( task.title + " task started at:",startedAt)

        // b.checked = true;
        refreshData();
        }
        else{
            let taskId =event.path[0].getAttribute('data-id');
            let task = inProgessList.findTaskById(taskId) as Task;
            todoList.addListItem(task, TaskStatus.TODO);
            inProgessList.removeTaskById(taskId);
            refreshData();
        }
        })
    }

    const moveTaskToCompleted = <HTMLButtonElement[]><unknown>document.querySelectorAll(".btn-complete")
    for(let b of moveTaskToCompleted){
        b.addEventListener('click', function clickEvent(event:any) {
        let taskId =event.path[0].getAttribute('data-id');
        let task = inProgessList.findTaskById(taskId) as Task;
        complete.addListItem(task, TaskStatus.DONE);
        inProgessList.removeTaskById(taskId);
        refreshData();
        let finishedAt = new Date()
        console.log(task.title +" task finished at: ",finishedAt)
        let timeDiff:any
        timeDiff = finishedAt.getTime() - startedAt.getTime()
        timeDiff /= 1000;
        let time = Math.round(timeDiff)
        console.log(time + " Seconds")
        }) 
        }

        
}













                // JavaScript CODE --->


    // button.addEventListener('click', function clickEvent(event) {
    //     if(input.value === ""){
    //         alert("Please enter a task")
    //     }
    //     event.preventDefault();
    //     const newTask = new Task(input.value, TaskStatus.TODO)
    //     taskManager.addListItem(newTask);
    //     const item = document.createElement("li")
    //     const label = document.createElement("label")
    //     label.innerText = newTask.title;
    //     const checkbox = document.createElement("input")
    //     checkbox.setAttribute('class', 'checkboxes')

    //     let completeTask = document.createElement("button")
    //     completeTask.innerHTML ="Complete"
    //     completeTask.setAttribute("class", "btn-complete")
    //     completeTask.type = 'button'

    //     let deleteTask = document.createElement("button")
    //     deleteTask.innerHTML = "Delete"
    //     deleteTask.setAttribute("class", "btn-delete")
    //     deleteTask.type = 'button'
    //     checkbox.type = "checkbox"
    


    //     checkbox.addEventListener('change', function changeEvent(event:any) {
    //         var checkedbox:any = event.path[0];
    //         let parent = event.path[2];
    //         if(checkedbox.checked){
    //             startTime = new Date();
    //             console.log( newTask.title + " Ckecked At: " + startTime)
    //         const theList = document.getElementById('in-progress')
    //         const lastListItem = theList?.children[theList?.children.length - 1];
    //         theList?.insertBefore(parent, lastListItem!)
                
    //         }else{
    //             console.log("unchecked")
    //            let toDoList = document.getElementsByClassName('task-box')[0];
    //            const lastListItem = toDoList?.children[toDoList?.children.length - 1];
    //            toDoList?.insertBefore(parent, lastListItem!)
    //         }
    //     })

    //     deleteTask.addEventListener('click', function removeTask(event:any){
    //         event.stopPropagation()
    //         event.path[1].remove();
    //     })

    //     completeTask.addEventListener('click', function completedTask(event:any){
    //         event.stopPropagation()
    //         let parent = event.path[1]
    //         let completeList = document.getElementById('completed-tasks')
    //         let lastCompleteItem= completeList?.children[completeList?.children.length - 1];
    //         completeList?.insertBefore(parent,lastCompleteItem!)
    //         endTime = new Date();
    //         timeDiff = endTime - startTime;
    //         timeDiff /= 1000;
    //         let time = Math.round(timeDiff)
    //         console.log( newTask.title + " Completed At: " + endTime)
    //         console.log("Task Completed for " + time + " Seconds")

            
    //     })

        
    //     console.log(newTask)

    //     item.append(label)
    //     label.append(checkbox, this.title)
    //     list.append(item)
    //     item.append(completeTask)
    //     item.append(deleteTask)
    //     input.value = "";
    // });

});
