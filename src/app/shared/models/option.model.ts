export interface IOption {
    id?: string;
    answer?: string;
    questionId?: string;
    score?: number;
}

export class Option implements IOption {
    constructor(id?: string, answer?: string, questionId?: string, score?: number) { }
}
