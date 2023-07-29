import "./style.css"

//--------------     Model Data      --------------//

let allProjects = [
  {
    title: 'Inbox',
    array: []  }, 
  {
    title: 'Default', 
    array: [
      {
        title: "Gym",
        description: "Workout 5 minutes",
        dueDate:"30/7/2023",
        priority: "low",
        checklist: false,
      },
      {
        title: "Study Physics",
        description: "Chapter 3: Quantum Physics",
        dueDate:"1/8/2023",
        priority: "medium",
        checklist: false,
      },
      {
        title: "Take out trash",
        description: "Do this in the morning ASAP",
        dueDate:"2/8/2023",
        priority: "high",
        checklist: false,
      },
    ]
  }, 
  {
    title: 'Default 2', 
    array: [
      {
        title: "Gym 2",
        description: "Workout 5 minutes",
        dueDate:"30/7/2023",
        priority: "low",
        checklist: false,
      },
      {
        title: "Study Physics 2",
        description: "Chapter 3: Quantum Physics",
        dueDate:"1/8/2023",
        priority: "medium",
        checklist: false,
      },
      {
        title: "Take out trash 2",
        description: "Do this in the morning ASAP",
        dueDate:"2/8/2023",
        priority: "high",
        checklist: false,
      },
    ]
  }, 
  {
    title: 'Default 3', 
    array: [
      {
        title: "Gym 3",
        description: "Workout 5 minutes",
        dueDate:"30/7/2023",
        priority: "low",
        checklist: false,
      },
      {
        title: "Study Physics 3",
        description: "Chapter 3: Quantum Physics",
        dueDate:"1/8/2023",
        priority: "medium",
        checklist: false,
      },
      {
        title: "Take out trash 3",
        description: "Do this in the morning ASAP",
        dueDate:"2/8/2023",
        priority: "high",
        checklist: false,
      },
    ]
  }, 
];

class Project {
  constructor(title) {
    this.title = title;
    this.array = new Array();
  }
}

class TodoItem {
  constructor(title, description, dueDate, priority, checklist) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist || false;
  }
}

//-------x------     Model Data      -------x------//


//--------------     Views (UI)      --------------//

const page = {
  init() {
    this.render();
  },

  render() {
    document.body.innerHTML = `
    <h1>Todo List</h1>
    <main class="main-container">
      <div id="project-list"></div>
      <div id="todo-items"></div>
    </main>
    `
  },
}

const projectListView = {
  init() {
    this.projectListElem = document.getElementById("project-list")
    this.render();
  },

  render() {
    let elem;

    const projects = controller.getProjectList();
    
    projects.forEach(project => {
      elem = document.createElement('button')
      elem.className = '';
      elem.textContent = project.title;
      elem.style.cursor = 'pointer';

      elem.onclick = () => todoItemsView.init(project);

      this.projectListElem.appendChild(elem);
    })
  }
}

const allTodoItemsView = {
  init() {
    this.render();
  },

  render() {
    controller.getAllTodoItems().forEach(todoItem => console.log(todoItem))
  }
}

const todoItemsView = {
  init(project) {
    this.todoItemsElem = document.getElementById("todo-items");
    this.render(project);
  },

  render(project) {
    this.todoItemsElem.textContent = "";
    let elem;
    controller.getTodoItems(project).forEach(todoItem => {
      elem = document.createElement('button')
      elem.className = '';
      elem.textContent = todoItem.title;
      elem.style.cursor = 'pointer';
      this.todoItemsElem.appendChild(elem);
    })
  }
}

//-------x------     Views (UI)      -------x------//


//--------------     Controller      --------------//

const controller = {
  init() {

    allProjects[0].array = this.getAllTodoItems();

  page.init();
  projectListView.init();
  allTodoItemsView.init();
  todoItemsView.init(allProjects[0]);
  },

  getProjectList() {
    return allProjects;
  },

  getAllTodoItems() {
    const allTodoItemsArray = [];
    allProjects.forEach(project => (project.array.forEach(todoItem => allTodoItemsArray.push(todoItem))))
    return allTodoItemsArray;
  },

  getTodoItems(project) {
    const todoItemsArray = [];
    project.array.forEach(todoItem => todoItemsArray.push(todoItem));
    return todoItemsArray;
  },

  addNewProject(project) {
    allProjects.push(project);
  },

  createNewTodo(title, description, dueDate, priority, checklist) {
    let newTodo = new TodoItem(title, description, dueDate, priority, checklist);
    return newTodo;
  },

  addTodoItem(project, todoItem) {
    project.array.push(todoItem);
  },

  deleteTodoItem(project, todoItem) {
    project.array = project.array.filter(items => items != todoItem);
  },
  
  modifyTodoItem(project, todoItem, title, description, dueDate, priority, checklist) {
    const index = project.array.indexOf(todoItem);
    project.array[index] = new TodoItem(title, description, dueDate, priority, checklist);
  },

  toggleChecklist(todoItem) {todoItem.checklist == true ? todoItem.checklist = false : todoItem.checklist = true}
}

controller.init();

//-------x------     Controller      -------x------//