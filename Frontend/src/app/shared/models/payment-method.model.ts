export interface IPaymentMethod {
    id?: string;
    name?: string;
    icon?: string;
}

export class PaymentMethod implements IPaymentMethod {
    constructor(id?: string, name?: string,  icon?: string) { }
}
