export interface ISocial {
    code?: string;
    sessionState?: string;
}

export class Social implements ISocial {
    constructor(code?: string, sessionState?: string) { }
}
