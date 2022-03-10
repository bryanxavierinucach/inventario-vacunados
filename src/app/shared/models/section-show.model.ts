import { FormGroup } from '@angular/forms';
import { IFeedback } from './feedback.model';
import { QuestionBuild } from './question-build.model';
import { ISection } from './section.model';

export interface ISectionShow {
    id: string;
    index: number;
    questionsBuild: QuestionBuild<any>[];
    formGroup: FormGroup;
    section: ISection;
    totalScore?: number;
    feedback?: IFeedback;
}
