document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
  
    // Load tasks from storage
    chrome.storage.sync.get('tasks', function(data) {
      if (data.tasks) {
        data.tasks.forEach(function(task) {
          addTaskToList(task);
        });
      }
    });
  
    // Add task to the list and storage
    function addTaskToList(task) {
      const listItem = document.createElement('li');
      listItem.textContent = task;
      taskList.appendChild(listItem);
  
      // Add remove button
      const removeButton = document.createElement('button');
      removeButton.textContent = '  Completed';
      listItem.appendChild(removeButton);
  
      // Add event listener to remove button
      removeButton.addEventListener('click', function() {
        listItem.remove();
  
        // Remove task from storage
        chrome.storage.sync.get('tasks', function(data) {
          const tasks = data.tasks || [];
          const updatedTasks = tasks.filter(t => t !== task);
          chrome.storage.sync.set({ tasks: updatedTasks });
        });
      });
    }
  
    addButton.addEventListener('click', function() {
      const task = taskInput.value;
      if (task) {
        addTaskToList(task);
  
        // Save task to storage
        chrome.storage.sync.get('tasks', function(data) {
          const tasks = data.tasks || [];
          tasks.push(task);
          chrome.storage.sync.set({ tasks: tasks });
        });
  
        taskInput.value = ' ';
      }
    });
  });
  