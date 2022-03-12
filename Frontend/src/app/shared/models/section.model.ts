import { IFeedback } from './feedback.model';
import { IQuestion } from './question.model';
import { IQuestionary } from './questionary.model';

export interface ISection {
    id?: string;
    sectionName?: string;
    questionaryId?: string;
    questions?: IQuestion[];
    questionary?: IQuestionary;
    feedbacks?: IFeedback[];
}

export class Section implements ISection {
    constructor(id?: string, sectionName?: string, questionaryId?: string, questions?: IQuestion[],
        questionary?: IQuestionary, feedbacks?: IFeedback) { }
}
