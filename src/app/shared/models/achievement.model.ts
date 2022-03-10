export interface IAchievement {
    id?: string;
    description?: string;
    creation_time?: Date;
    icon?: string;
    picture?: string;
}

export class Achievement implements IAchievement {
    constructor(id?: string,
        description?: string,
        creation_time?: Date,
        icon?: string) { }
}
