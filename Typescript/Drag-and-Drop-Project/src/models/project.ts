/** Project Type */
export enum Status {
  ACTIVE,
  FINISHED,
}
//Project class
export class Project {
  constructor(public id: string, public title: string, public description: string, public numOfPeople: number, public status: Status) {}
}
