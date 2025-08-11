import {Permission} from "../permission/permission.model";

export class Role {
  public id: number;
  public name: string;
  public permissions: Permission[]
}
