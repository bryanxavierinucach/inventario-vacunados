import { IProfile } from './profile.model';

export interface IUser {
    id?: string;
    user?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    userType?: number;
    walletAddress?: string;
    maturity?: string;
    avatar?: Blob;
    avatarShow?: string;
    profile?: IProfile;
}

export class User implements IUser {
    constructor(id?: string, username?: string, firstName?: string, lastName?: string, email?: string,
        password?: string, role?: string, userType?: number, maturity?: string, avatar?: Blob, walletAddres?: string,
        profile?: IProfile,
        avatarShow?: string, user?: string,
) { }
    user?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    role?: string;
    userType?: number;
    walletAddress?: string;
    maturity?: string;
    avatar?: Blob;
    avatarShow?: string;
    profile?: IProfile;
}

