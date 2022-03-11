import { ToastService } from 'app/@core/services/toast.service';
import { SectionService } from 'app/modules/admin/services/section.service';
import { QuestionaryDirected } from 'app/shared/enums/questionary-directed.enum';
import { QuestionaryType } from 'app/shared/enums/questionary-type.enum';
import { IFeedback } from 'app/shared/models/feedback.model';
import { IQuestionary } from 'app/shared/models/questionary.model';
import { ISectionAnswer } from 'app/shared/models/section-answer.model';
import { ISectionShow } from 'app/shared/models/section-show.model';
import { ISection } from 'app/shared/models/section.model';
import { FeedbackService } from 'app/shared/services/feedback.service';
import { QuestionaryService } from 'app/shared/services/questionary.service';
import { SectionAnswerService } from 'app/shared/services/section-answer.service';

export abstract class QuestionaryMakeComponent {
    loadingSection: boolean;
    errorSection: boolean;
    buildSections: ISectionShow[] = [];
    showSection: ISectionShow;
    finished: boolean;
    sectionAnswerCreate: ISectionAnswer;
    loadingSave: boolean;
    feedback: IFeedback;
    errorFeedback: boolean;
    loadingFeedback: boolean;

    constructor(public sectionService: SectionService, public feedbackService: FeedbackService,
        public sectionAnswerService: SectionAnswerService,
        public toastService: ToastService, public questionaryService: QuestionaryService) { }

    async getSections(id: string) {
        this.loadingSection = true;
        this.errorSection = false;
        this.sectionService.getAllComplete(id).subscribe(res => {
            this.loadingSection = false;
            const sections: ISection[] = res as ISection[];


        }, (err) => {
            this.loadingSection = false;
            this.errorSection = true;
        });
    }

    onBackForm() {
        this.finished = false;
        this.showSection.totalScore = 0;
    }

    async onNextSection(index: number, dataForm: any, opportunityId: string) {
        try {
            if (opportunityId) {
                let totalScore = 0;
                // tslint:disable-next-line:forin
                for (const key in dataForm) {
                    this.showSection.section.questions.forEach(question => {
                        if (key === question.id) {
                            question.options.forEach(option => {
                                if (dataForm[key] === option.id) {
                                    totalScore += option.score;
                                }
                            });
                        }
                    });
                }
                this.showSection.totalScore = totalScore;
            }
            this.finished = false;
            if (index + 1 < this.buildSections.length) {
                this.showSection = this.buildSections[index + 1];
            } else if (index + 1 === this.buildSections.length) {
                // Finaliza las preguntas
                const sectionAnwers: ISectionAnswer[] =
                    this.sectionAnswerService.getSectionAnswerBuild(this.buildSections);
                this.loadingSave = true;
                const questionaryId = this.showSection.section.questionaryId;
                const resultQuestionary = await this.questionaryService.getById(questionaryId).toPromise();
                if (resultQuestionary) {
                    const questionary = resultQuestionary as IQuestionary;
                    let data;
                    if (questionary.type === QuestionaryType.DIAGNOSIS) {
                        data = {
                            sections: sectionAnwers,
                        };
                    } else {
                        if (questionary.directed === QuestionaryDirected.TALENT) {
                            data = {
                                sections: sectionAnwers,
                                talent: opportunityId,
                            };
                        }
                        if (questionary.directed === QuestionaryDirected.PYME) {
                            data = {
                                sections: sectionAnwers,
                                pyme: opportunityId,
                            };
                        }
                    }
                    this.sectionAnswerService.create(data).subscribe(res => {
                        this.loadingSave = false;
                        this.toastService.showSuccess('Exitoso', res['message']);
                        this.finished = true;
                        this.sectionAnswerCreate = res['sectionAnswer'] as ISectionAnswer;
                    }, (err) => {
                        this.loadingSave = false;
                        if (err.error.message)
                            this.toastService.showWarning('Atención', err.error.message);
                        else
                            this.toastService.showWarning('Atención', 'No se pudo ingresar');
                    });
                } else {
                    this.loadingSave = false;
                    this.toastService.showWarning('Atención', 'No se pudo ingresar');
                    return;
                }
            }
        } catch (err) {
            this.loadingSave = false;
            this.toastService.showWarning('Atención', 'No se pudo ingresar');
        }
    }

    onFeedback(data) {
        let totalScore = 0;
        // tslint:disable-next-line:forin
        for (const key in data) {
            this.showSection.section.questions.forEach(question => {
                if (key === question.id) {
                    question.options.forEach(option => {
                        if (data[key] === option.id) {
                            totalScore += option.score;
                        }
                    });
                }
            });
        }
        if (totalScore > 0) {
            this.errorFeedback = false;
            this.loadingFeedback = true;
            this.feedbackService.getByTotal(this.showSection.id, totalScore).subscribe(res => {
                if (res) {
                    this.showSection.totalScore = totalScore;
                    this.showSection.feedback = res;
                } else {
                    this.errorFeedback = true;
                }
                this.loadingFeedback = false;
            }, (err) => {
                this.loadingFeedback = false;
                this.errorFeedback = true;
            });
        }

    }
}
