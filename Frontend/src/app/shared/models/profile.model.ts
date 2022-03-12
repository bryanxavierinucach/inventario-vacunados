import { ITelephone } from './telephone.model';
import {IUser} from './user.model';

export interface IProfile {
    id?: string;
    country?: string;
    city?: string;
    economicSector?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
    github?: string;
    telephone?: ITelephone;
    userId?: IUser[];
    summary?: Text;
}

export class Profile implements IProfile {
    constructor(id?: string,
        country?: string,
        city?: string,
        economicSector?: string,
        linkedin?: string,
        instagram?: string,
        website?: string,
        github?: string,
        telephone?: string,
        userId?: IUser[],
        summary?: Text) { }
}
