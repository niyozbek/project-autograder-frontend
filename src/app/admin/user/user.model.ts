import { Role } from "../role/role.model";

export class User {
  public id: number;
  public username: string;
  public password: string;
  public fullname: string;
  public email: string;
  public roles: Role[]
}
