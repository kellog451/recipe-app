export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private tokenExpirationDate: Date
  ) {}

  getToken() {}

  public get token() {
    if (!this.tokenExpirationDate || new Date() > this.tokenExpirationDate)
      return null;
    return this._token;
  }
}
