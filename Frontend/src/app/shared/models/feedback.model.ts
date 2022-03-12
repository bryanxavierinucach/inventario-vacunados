export interface IFeedback {
    id?: string;
    sectionId?: string;
    rangeMin?: number;
    rangeMax?: number;
    level?: string;
    recommendation?: string;
}

export class Feedback implements IFeedback {
    constructor(id?: string, sectionId?: string,
        rangeMin?: number,
        rangeMax?: number,
        level?: string,
        recommendation?: string) { }
}
