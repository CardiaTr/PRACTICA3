// Capturar los elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');

// 5. Agregar Tareas
function addTask(event) {
    event.preventDefault(); // Evita que el formulario se recargue al enviar

    // Obtener el valor del input
    const taskText = taskInput.value.trim(); // Elimina espacios al inicio y al final

    if (taskText === '') {
        alert('Por favor, ingresa una tarea.'); // Mensaje de error
        return; // Evita agregar tarea vacía
    }

    // Crear un nuevo elemento <li>
    const li = document.createElement('li');
    li.textContent = taskText;

    // Permitir marcar la tarea como completada
    li.onclick = function() {
        li.classList.toggle('completed'); // Marca/desmarca la tarea como completada
        saveTasks(); // Guardar cambios en localStorage
    };

    // Crear un botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');
    deleteButton.onclick = function(event) {
        event.stopPropagation(); // Evita que el evento de clic en el <li> se dispare
        deleteTask(li);
    };

    // Agregar el botón de eliminar al <li>
    li.appendChild(deleteButton);

    // Añadir el <li> a la lista <ul>
    taskList.appendChild(li);

    // Guardar en localStorage
    saveTasks();

    // Limpiar el campo de entrada
    taskInput.value = '';
}

// 6. Eliminar Tareas
function deleteTask(taskItem) {
    taskItem.remove(); // Elimina el <li> del DOM
    saveTasks(); // Actualiza las tareas en localStorage
}

// 7. Almacenamiento Local
function saveTasks() {
    const tasks = [];
    // Recorrer todas las tareas en la lista
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed'), // Guardar estado completado
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Guardar como JSON en localStorage
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        // Marcar la tarea como completada si es necesario
        if (task.completed) {
            li.classList.add('completed');
        }

        // Permitir marcar la tarea como completada
        li.onclick = function() {
            li.classList.toggle('completed'); // Marca/desmarca la tarea como completada
            saveTasks(); // Guardar cambios en localStorage
        };

        // Crear el botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.classList.add('delete-button');
        deleteButton.onclick = function(event) {
            event.stopPropagation(); // Evita que el evento de clic en el <li> se dispare
            deleteTask(li);
        };

        // Agregar el botón de eliminar al <li>
        li.appendChild(deleteButton);

        // Añadir el <li> a la lista <ul>
        taskList.appendChild(li);
    });
}

// Cargar las tareas almacenadas al iniciar la aplicación
loadTasks();

// Escuchar el evento de enviar del formulario para agregar una nueva tarea
taskForm.addEventListener('submit', addTask);
