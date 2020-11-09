import { Project, Status } from '../models/project';

type Listener<T> = (items: T[]) => void;

//General State
abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

//Project State Management
export class ProjectState extends State<Project> {
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

export const projectState = ProjectState.getInstance();
