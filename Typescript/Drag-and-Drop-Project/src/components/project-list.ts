import { Autobind } from '../decorators/autobind';
import { DragTarget } from '../models/drag-drop';
import { Project, Status } from '../models/project';
import { Component } from './base-component';
import { ProjectItem } from './project-item';
import { projectState } from '../state/project-state';

/** Project List class */
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
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
