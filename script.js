document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('addButton');
    const addTaskInput = document.getElementById('Input_Task');
    const prioritySelector = document.getElementById('prioritySelector');
    const taskList = document.getElementById('task-List');
    const completedTaskList = document.getElementById('completed-task-list');
    const completedSound = document.getElementById('completeSound');
    const deletedSound = document.getElementById('deleteSound');
    const addDueDateInput = document.getElementById('Input_DueDate');
    

    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0'); 
    const year = todayDate.getFullYear();
    const minDate = `${year}-${month}-${day}`; 
    addDueDateInput.setAttribute('min',minDate);


    addButton.addEventListener('click', function() {
        const taskText = addTaskInput.value.trim();
        const dueDateValue = addDueDateInput.value;
        const priorityValue = prioritySelector.value;

        if (taskText === '') {
            alert("You haven't written anything");
            return;
        }

        const taskItem = createTaskItem(taskText, dueDateValue, priorityValue);
        taskList.appendChild(taskItem);

        addTaskInput.value = '';
        addDueDateInput.value = '';
    });

    function createTaskItem(taskText, dueDateValue, priorityValue) {
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';

        const textSpan = document.createElement('span');
        textSpan.textContent = taskText + (dueDateValue ? ` (Due by: ${dueDateValue})` : '');

        


   
        let prioritySelectorColor = '';
        // Set text color based on priority, handled directly in css and js
        switch (priorityValue) {
            case 'High':
                prioritySelectorColor = 'priority-high';
                break;
            case 'Medium':
                prioritySelectorColor = 'priority-medium';
                break;
            case 'Low':
                prioritySelectorColor = 'priority-low';
                break;
        }
        if(prioritySelectorColor){
            textSpan.classList.add(prioritySelectorColor);
        }

        taskItem.appendChild(textSpan);


       
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function(event) {
            deletedSound.play();
            taskItem.remove();
        });
        taskItem.appendChild(deleteBtn);

        taskItem.addEventListener('click', function(event) {
            if (event.target !== deleteBtn) {
                textSpan.classList.toggle('completed');
                if (textSpan.classList.contains('completed')) {
                    textSpan.classList.add('completed');
                    completedSound.play();
                    
                    const completedClone = taskItem.cloneNode(true);
                    
                    completedClone.querySelector('.delete-btn').addEventListener('click', function(event) {
                        event.stopPropagation(); 
                        completedClone.remove();
                        deletedSound.play();
                    });
                    
                    completedClone.removeEventListener('click', taskItem.click);
                    completedClone.addEventListener('click', function() {
                       
                        completedClone.remove();
                          // create and place a sound for undo task here like the completSound.play();
                    });
                    completedTaskList.appendChild(completedClone);
                }
            }
        });

        return taskItem;
    }
    
    
});