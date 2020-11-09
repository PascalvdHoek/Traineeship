/*  Component Base class */
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
