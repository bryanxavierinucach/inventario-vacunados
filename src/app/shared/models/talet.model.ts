export interface ITalet {
    id?: string;
    name?: string;
    path?: string;
}

export class Talent implements ITalet {
    constructor(id?: string, name?: string, path?: string) { }
}
