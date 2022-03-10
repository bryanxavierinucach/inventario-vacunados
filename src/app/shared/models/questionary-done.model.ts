import { IQuestionary } from './questionary.model';

export interface IQuestionaryDone {
    id?: string;
    userId?: string;
    dateCrearion?: Date;
    questionary?: IQuestionary;
}

export class Questionary implements IQuestionaryDone {
    constructor(id?: string,
        userId?: string,
        dateCrearion?: Date,
        questionary?: IQuestionary) { }
}
