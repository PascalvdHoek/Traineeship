"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/** Project Type */
var Status;
(function (Status) {
    Status[Status["ACTIVE"] = 0] = "ACTIVE";
    Status[Status["FINISHED"] = 1] = "FINISHED";
})(Status || (Status = {}));
//Project class
class Project {
    constructor(id, title, description, numOfPeople, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.numOfPeople = numOfPeople;
        this.status = status;
    }
}
//General State
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
//Project State Management
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        else {
            this.instance = new ProjectState();
            return this.instance;
        }
    }
    addProject(title, description, numOfPeople) {
        const newProject = new Project(Math.random().toString(), title, description, numOfPeople, Status.ACTIVE);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(projectId, newStatus) {
        const project = this.projects.find((proj) => proj.id === projectId);
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
function validate(rules) {
    let isValid = true;
    if (rules.required) {
        isValid = isValid && rules.value.toString().trim().length !== 0;
    }
    if (rules.minLength != null && typeof rules.value === 'string') {
        isValid = isValid && rules.value.length >= rules.minLength;
    }
    if (rules.maxLength != null && typeof rules.value === 'string') {
        isValid = isValid && rules.value.length <= rules.maxLength;
    }
    if (rules.min != null && typeof rules.value === 'number') {
        isValid = isValid && rules.value >= rules.min;
    }
    if (rules.max != null && typeof rules.value === 'number') {
        isValid = isValid && rules.value <= rules.max;
    }
    return isValid;
}
//Autobind
function Autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjustMethod = {
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustMethod;
}
/*  Component Base class */
class Component {
    constructor(templateId, hostId, position, elementId) {
        this.position = position;
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (elementId) {
            this.element.id = `${elementId}`;
        }
        this.attach();
    }
    attach() {
        this.hostElement.insertAdjacentElement(this.position, this.element);
    }
}
/** Project Item class */
class ProjectItem extends Component {
    constructor(hostId, project) {
        super('single-project', hostId, 'beforeend', project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        return this.project.numOfPeople === 1
            ? this.project.numOfPeople.toString() + ' Person'
            : this.project.numOfPeople.toString() + ' Persons';
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(event) {
        console.log(event);
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.persons + ' assigned.';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    Autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    Autobind
], ProjectItem.prototype, "dragEndHandler", null);
/** Project List class */
class ProjectList extends Component {
    constructor(type) {
        super('project-list', 'app', 'beforeend', `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const projId = event.dataTransfer.getData('text/plain');
        projectState.moveProject(projId, this.type === 'active' ? Status.ACTIVE : Status.FINISHED);
    }
    dragLeaveHandler(_) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        projectState.addListener((projects) => {
            const relevantProjects = projects.filter((prj) => {
                if (this.type === 'active') {
                    return prj.status === Status.ACTIVE;
                }
                else {
                    return prj.status === Status.FINISHED;
                }
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.type.toUpperCase() + ' PROJECTS';
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        listEl.textContent = '';
        for (const prjItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul').id, prjItem);
        }
    }
}
__decorate([
    Autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    Autobind
], ProjectList.prototype, "dragLeaveHandler", null);
/** ProjectInput class */
class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', 'afterbegin', 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.renderContent();
        this.configure();
    }
    renderContent() { }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionInputElement.value;
        const enteredPeople = +this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            minLength: 5,
        };
        const peopleValidatable = {
            value: enteredPeople,
            min: 1,
            max: 10,
        };
        if (validate(titleValidatable) && validate(descriptionValidatable) && validate(peopleValidatable)) {
            return [enteredTitle, enteredDescription, enteredPeople];
        }
        else {
            throw new Error('Invalid input!, please try again!');
        }
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, descr, people] = userInput;
            projectState.addProject(title, descr, people);
            console.log(title, descr, people);
            this.clearInputs();
        }
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
const projectInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
//# sourceMappingURL=app.js.map