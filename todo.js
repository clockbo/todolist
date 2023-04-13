let tasks = [];
const taskList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');




function fetchtodo()
{
    //get requeste it is 1 method 
fetch('https://jsonplaceholder.typicode.com/todos')
.then(function(response)
{
    console.log(response);
    return response.json();
})
.then(function(data)
{
    tasks=data.slice(0,10);
    renderList();
})
.catch(function(error)
{
    console.log('error',error);
})

// it is 2 method
// try
// {
//     const response = await fetch('https://jsonplaceholder.typicode.com/todos');
//     const data=await response.json();
//     tasks=data.slice(0,10);
//     renderList();
// }catch(error)
// {
// console.log(error);
// }

}

function addtasktodom(task)
{
    const li=document.createElement('li');
    li.innerHTML=`
    <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}class="custom-checkbox">
    <label for="${task.id}">${task.title}</label>
    <img src="icons8-trash-can.gif" class="delete" data-id="${task.id}" />
    `;
    taskList.append(li);
}

function renderList () {
   taskList.innerHTML=''; 
    for(let i=0;i<tasks.length;i++)
    {
        addtasktodom(tasks[i]);
    }
    tasksCounter.innerHTML=tasks.length;
}

function markTaskAsComplete (taskId)
{
    const task=tasks.filter(function(task)
    {
        return task.id==Number(taskId);
    });
    if(task.length>0)
    {

        const currenttask= task[0];
        currenttask.completed= !currenttask.completed;
        renderList();
        showNotification('task toggled successsfully');
        return;
    }
    showNotification("could not toggle the task");
}

function deleteTask (taskId)
{
    const newtask=tasks.filter(function(task)
    {
        return task.id!==Number(taskId);
    })
    tasks=newtask;
    renderList();
    showNotification('task deleted succesfully');

}

function addTask (task)
{
    if(task)
    {
        tasks.push(task);
        renderList();
        showNotification("task added suceesfully");
        return;
    }
    showNotification("task can not be added");
    
}

function showNotification(text) {
    alert(text);
}
function handleinputkeypress(e)
{
    if(e.key==='Enter')
    {
        const text=e.target.value;
        // console.log('text',text);
        if(!text)
        {
            showNotification('task test can not be empty');
            return;
        }
        const task=
        {
            //text or
            title:text,//similar h ye dono property
            id:Date.now(),
            completed:false

        }
        e.target.value='';
        addTask(task);
    }
}
function handleclicklisner(e)
{
const target=e.target;
console.log(target)
if(target.className === 'delete')
{   
    const taskId=target.dataset.id;
    // console.log(taskId);
    deleteTask(taskId);
    return;
}
else if(target.className === 'custom-checkbox')
{
    const taskId=target.id;
    // console.log(taskId);
    markTaskAsComplete(taskId);
    return;
}
};
function initialapp()
{

    fetchtodo();
    addTaskInput.addEventListener('keyup',handleinputkeypress);
    document.addEventListener('click',handleclicklisner);
    
}
initialapp();

