import { QuestionaryDirected } from '../enums/questionary-directed.enum';
import { QuestionaryType } from '../enums/questionary-type.enum';
import { ISection } from './section.model';

export interface IQuestionary {
    id?: string;
    questionaryTitle?: string;
    directed?: QuestionaryDirected;
    objective?: string;
    type?: QuestionaryType;
    sections?: ISection[];
}

export class Questionary implements IQuestionary {
    constructor(id?: string, questionaryTitle?: string, directed?: QuestionaryDirected, objective?: string,
        type?: QuestionaryType, sections?: ISection[]) { }
}
