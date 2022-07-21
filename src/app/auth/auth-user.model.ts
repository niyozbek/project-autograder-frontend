export class AuthUser {
  constructor(
    private _username: string,
    private _role: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) { }

  // readonly property
  get username() {
    return this._username
  }
  get role() {
    return this._role
  }
  get token() {
    if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
      return null
    }
    return this._token
  }
}
export enum AuthRole {
  ADMIN, LECTURER, STUDENT, ETC
}
