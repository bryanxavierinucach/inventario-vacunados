export interface IReward {
    id?: string;
    description?: string;
    path?: string;
    ever?: boolean;
    amount?: number;
    specialReward?: boolean;
    active?: boolean;
}

export class Reward implements IReward {
    constructor(id?: string,
        description?: string,
        path?: string,
        ever?: boolean,
        amount?: number,
        specialReward?: boolean,
        active?: boolean) { }
}
