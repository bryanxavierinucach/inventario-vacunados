
export interface IAnswer {
    id?: string;
    questionId?: string;
    optionId?: string;
}

export class Answer implements IAnswer {
    constructor(d?: string,
        questionId?: string,
        optionId?: string) { }
}
