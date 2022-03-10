import { QuestionBuild } from './question-build.model';


export class OptionQuestion extends QuestionBuild<string> {
  controlType = 'radio';
  required = true;
  options: {key: string, value: string}[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}
