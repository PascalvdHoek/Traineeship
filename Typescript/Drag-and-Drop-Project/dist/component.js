"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Component = void 0;
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
exports.Component = Component;
//# sourceMappingURL=component.js.map