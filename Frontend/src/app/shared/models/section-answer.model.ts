import { IAnswer } from './answer.model';
import { IFeedback } from './feedback.model';
import { ISection } from './section.model';

export interface ISectionAnswer {
    id?: string;
    sectionId?: string;
    feedbackId?: string;
    userId?: string;
    totalScore?: number;
    targePercentage?: number;
    dateCreation?: Date;
    answers?: IAnswer[];
    questionaryId?: string;
    section?: ISection;
    feedback?: IFeedback;
}

export class SectionAnswer implements ISectionAnswer {
    constructor(d?: string,
        sectionId?: string,
        feedbackId?: string,
        userId?: string,
        totalScore?: number,
        dateCreation?: Date,
        answers?: IAnswer[],
        questionaryId?: string,
        section?: ISection,
        feedback?: IFeedback,
        targePercentage?: number) { }
}
