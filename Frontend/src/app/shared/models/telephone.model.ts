export interface ITelephone {
    internationalNumber?: string;
}

export class Telephone implements ITelephone {
    constructor(internationalNumber?: string) { }
}
