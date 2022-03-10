import { OpportunityMode } from '../enums/opportunity-mode.enum';
import { OpportunityStatus } from '../enums/opportunity-status.enum';
import { ICategory } from './category.model';
import { IProposal } from './proposal.model';
import { IPaymentPercentage } from './payment-percentage.model';
import { IUser } from './user.model';

export interface IOpportunity {
    id?: string;
    pymeCreationId?: string;
    title?: string;
    description?: string;
    categoryId?: string;
    category?: ICategory;
    dateCreation?: Date;
    dateExpiration?: Date;
    dateStart?: Date;
    dateEnd?: Date;
    dateAccepted?: Date;
    dateCompleted?: Date;
    talentAssignedId?: string;
    talentAssinged?: IUser;
    status?: OpportunityStatus;
    mode?: OpportunityMode;
    paymentPercentages?: IPaymentPercentage[];
    proposals?: IProposal[];
    pymeQuestionaryDoneId?: string;
    talentQuestionaryDoneId?: string;
}

export class Opportunity implements IOpportunity {
    constructor(id?: string,
        pymeCreationId?: string,
        title?: string,
        description?: string,
        categoryId?: string,
        category?: ICategory,
        dateCreation?: Date,
        dateExpiration?: Date,
        dateStart?: Date,
        dateEnd?: Date,
        amount?: number,
        dateAccepted?: Date,
        dateCompleted?: Date,
        talentAssignedId?: string,
        talentAssinged?: IUser,
        status?: OpportunityStatus,
        mode?: OpportunityMode,
        paymentPercentages?: IPaymentPercentage[],
        pymeQuestionaryDoneId?: string,
        talentQuestionaryDoneId?: string) { }
}
