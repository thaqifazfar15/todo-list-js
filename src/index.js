import "./style.css"

//--------------     Model Data      --------------//

let allProjects = [];

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
    this.checklist = false;
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
    <div id="project-list"></div>
    <div id="todo-items"></div>
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
      elem = document.createElement('li')
      elem.className = '';
      elem.textContent = project;
      elem.style.cursor = 'pointer';
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
    this.render(project);
  },

  render(project) {
    controller.getTodoItems(project).forEach(todoItem => console.log(todoItem))
  }
}

//-------x------     Views (UI)      -------x------//


//--------------     Controller      --------------//

const controller = {
  init() {
  //  Create Default Project
  let defaultTodoProject = new Project("Default");
  this.addNewProject(defaultTodoProject);

  // Create examples of todo items
  const gymTodo = new TodoItem("Gym", "Workout 5 minutes", "30/7/2023", "low");
  const studyTodo = new TodoItem("Study Physics", "Quantum Physic", "1/8/2023", "medium");
  const trashTodo = new TodoItem("Take out trash", "Do this in the morning ASAP", "2/8/2023", "high");


  this.addTodoItem(defaultTodoProject, gymTodo);
  this.addTodoItem(defaultTodoProject, studyTodo);
  this.addTodoItem(defaultTodoProject, trashTodo);

  page.init()
  projectListView.init();
  allTodoItemsView.init();
  todoItemsView.init(defaultTodoProject);
  },

  getProjectList() {
    const projectListArray = [];
    allProjects.forEach(project => projectListArray.push(project.title))
    return projectListArray;
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
    let newTodo = new TodoItem(title, description, dueDate, checklist);
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