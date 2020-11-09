/** Drag and Drop Interfaces */
interface Draggable {
  dragStartHandler(event: DragEvent): void;

  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}
/** Project Type */
enum Status {
  ACTIVE,
  FINISHED,
}
//Project class
class Project {
  constructor(public id: string, public title: string, public description: string, public numOfPeople: number, public status: Status) {}
}

type Listener<T> = (items: T[]) => void;
//General State

abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

//Project State Management
class ProjectState extends State<Project> {
  private static instance: ProjectState;
  private projects: Project[] = [];
  private constructor() {
    super();
  }
  static getInstance() {
    if (this.instance) {
      return this.instance;
    } else {
      this.instance = new ProjectState();
      return this.instance;
    }
  }
  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(Math.random().toString(), title, description, numOfPeople, Status.ACTIVE);
    this.projects.push(newProject);
    this.updateListeners();
  }
  moveProject(projectId: string, newStatus: Status) {
    const project = this.projects.find((proj) => proj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

// Validation
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(rules: Validatable): boolean {
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
function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustMethod: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustMethod;
}

/*  Component Base class */
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(templateId: string, hostId: string, public position: InsertPosition, elementId?: string) {
    this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostId) as T;

    const importedNode = document.importNode(this.templateElement.content, true);

    this.element = importedNode.firstElementChild as U;
    if (elementId) {
      this.element.id = `${elementId}`;
    }

    this.attach();
  }

  private attach() {
    this.hostElement.insertAdjacentElement(this.position, this.element);
  }
  abstract configure(): void;
  abstract renderContent(): void;
}

/** Project Item class */
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get persons() {
    return this.project.numOfPeople === 1
      ? this.project.numOfPeople.toString() + ' Person'
      : this.project.numOfPeople.toString() + ' Persons';
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, 'beforeend', project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  @Autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @Autobind
  dragEndHandler(event: DragEvent) {
    console.log(event);
  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler);

    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned.';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

/** Project List class */
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[];
  constructor(private type: string) {
    super('project-list', 'app', 'beforeend', `${type}-projects`);

    this.assignedProjects = [];
    this.configure();
    this.renderContent();
  }
  @Autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }
  @Autobind
  dropHandler(event: DragEvent) {
    const projId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(projId, this.type === 'active' ? Status.ACTIVE : Status.FINISHED);
  }

  @Autobind
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((prj) => {
        if (this.type === 'active') {
          return prj.status === Status.ACTIVE;
        } else {
          return prj.status === Status.FINISHED;
        }
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + ' PROJECTS';
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`) as HTMLUListElement;
    listEl.textContent = '';
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prjItem);
    }
  }
}

/** ProjectInput class */
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', 'afterbegin', 'user-input');

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

    this.renderContent();
    this.configure();
  }

  renderContent() {}
  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private gatherUserInput(): [string, string, number] {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = +this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    };
    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      minLength: 5,
    };
    const peopleValidatable: Validatable = {
      value: enteredPeople,
      min: 1,
      max: 10,
    };

    if (validate(titleValidatable) && validate(descriptionValidatable) && validate(peopleValidatable)) {
      return [enteredTitle, enteredDescription, enteredPeople];
    } else {
      throw new Error('Invalid input!, please try again!');
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @Autobind
  private submitHandler(event: Event) {
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

const projectInput = new ProjectInput();
const activePrjList = new ProjectList('active');
const finishedPrjList = new ProjectList('finished');
