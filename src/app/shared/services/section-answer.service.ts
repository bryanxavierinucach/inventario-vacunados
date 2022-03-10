import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { config } from 'app/config';
import { IAnswer } from '../models/answer.model';
import { OptionQuestion } from '../models/option-build.model';
import { IOption } from '../models/option.model';
import { QuestionBuild } from '../models/question-build.model';
import { IQuestion } from '../models/question.model';
import { ISectionAnswer } from '../models/section-answer.model';
import { ISectionShow } from '../models/section-show.model';
import { ISection } from '../models/section.model';

const BASE_URL = `${config.api.url}${config.sectionAnswer.mainEndpoint}`;

@Injectable({
  providedIn: 'root',
})
export class SectionAnswerService {

  constructor(protected http: HttpClient) { }

  public create(data: any) {
    return this.http.post(`${BASE_URL}`, data);
  }

  public getById(id: string) {
    return this.http.get(`${BASE_URL}${id}`);
  }

  public getQuestionaries(userId: string, limit: number, page: number,
    q: string, field: string, orderBy: string, orderDirection: string) {
    let query = `${BASE_URL}${config.sectionAnswer.questionaries}`
      + `${userId}?page=${page}&limit=${limit}`;
    if (orderDirection && orderBy) query += `&orderBy=${orderBy}&orderDirection=${orderDirection}`;
    if (q && field) query += `&q=${q}&field=${field}`;
    return this.http.get(query);
  }

  public getReporByQuestionaryDone(id: string) {
    return this.http.get(`${BASE_URL}${config.sectionAnswer.questionary}${id}/${config.sectionAnswer.report}`);
  }

  // Armar question para mostrar encuesta
  getQuestionsBuild(section: ISection) {
    const questionBuilds: QuestionBuild<any>[] = [];
    for (let i = 0; i < section.questions.length; i++) {
      const question: IQuestion = section.questions[i];
      const options: any[] = [];
      for (let j = 0; j < question.options.length; j++) { // Crea las opciones de las preguntas
        const option: IOption = question.options[j];
        options.push({ key: option.id, value: option.answer });
      }
      questionBuilds.push(
        new OptionQuestion({ // Crear las preguntas
          key: question.id,
          label: question.question,
          options: options,
          order: i,
        }),
      );
    }
    return questionBuilds;
  }

  //  Armar respuestas con secciones
  getSectionAnswerBuild(buildSections: ISectionShow[]) {
    const sectionAnwers: ISectionAnswer[] = [];
    for (let i = 0; i < buildSections.length; i++) {
      const sectionShow: ISectionShow = buildSections[i];
      const data = sectionShow.formGroup.value;
      const answers: IAnswer[] = [];
      // tslint:disable-next-line:forin
      for (const key in data) {
        answers.push({ questionId: key, optionId: data[key] });
      }
      sectionAnwers.push({
        sectionId: sectionShow.id, feedbackId: sectionShow?.feedback?.id,
        totalScore: sectionShow.totalScore, answers: answers,
        questionaryId: sectionShow.section.questionaryId,
      });
    }
    return sectionAnwers;
  }
}
