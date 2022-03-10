import { IOpportunity } from './opportunity.model';
import { IQuestionary } from './questionary.model';

export interface IQuestionaryOpportunity {
    questionary?: IQuestionary;
    opportunity?: IOpportunity;
}

