import { IAchievement } from './achievement.model';
import { IUser } from './user.model';

export interface IUserAchievement {
    id?: string;
    userId?: IUser;
    score?: string;
    grantDate?: Date;
    achievementId?: IAchievement;
}

export class IUserAchievement implements IUserAchievement {
    constructor(id?: string,
        userId?: IUser,
        score?: string,
        grantDate?: Date,
        achievementId?: IAchievement) { }
}
