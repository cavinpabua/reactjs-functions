export class Authentication {

    identifier: string;
    password: string;

    constructor(identifier: string, password: string) {
        this.identifier = identifier;
        this.password = password;
    }
}
