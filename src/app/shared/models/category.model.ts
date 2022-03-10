export interface ICategory {
    id?: string;
    name?: string;
    description?: string;
}

export class Category implements ICategory {
    constructor(id?: string, name?: string,  description?: string) { }
}
