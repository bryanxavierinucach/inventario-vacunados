import { IOption } from './option.model';
import { ISection } from './section.model';

export interface IQuestion {
    id?: string;
    questionaryId?: string;
    sectionId?: string;
    question?: string;
    section?: ISection;
    totalScore?: number;
    options?: IOption[];
}

export class Question implements IQuestion {
    constructor(id?: string,
        questionaryId?: string,
        sectionId?: string,
        question?: string,
        options?: IOption[]) { }
}
