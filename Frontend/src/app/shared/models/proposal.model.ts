import { ProposalStatus } from '../enums/proposal-status.enum';
import { IUser } from './user.model';

export interface IProposal {
    id?: string;
    opportunityId?: string;
    talentId?: string;
    dateApplication?: Date;
    status?: ProposalStatus;
    user?: IUser;
}

export class Proposal implements IProposal {
    constructor(id?: string, opportunityId?: string, talentId?: string,
        dateApplication?: Date,
        status?: ProposalStatus, user?: IUser) { }
}
