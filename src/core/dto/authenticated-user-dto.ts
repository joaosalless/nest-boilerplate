export class AuthenticatedUserDto {
  constructor(
    private id?: number,
    private name?: string,
    private phone?: string,
    private email?: string,
    private role?: string,
  ) {
    this.role = role;
    this.name = name;
    this.phone = phone;
    this.email = email;
    this.role = role;
  }
}
