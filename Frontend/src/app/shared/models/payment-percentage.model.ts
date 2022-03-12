import { IPaymentMethod } from './payment-method.model';

export interface IPaymentPercentage {
    id?: string;
    paymentMethod?: IPaymentMethod;
    paymentMethodId?: string;
    percentage?: number;
}

export class PaymentMethod implements IPaymentPercentage {
    constructor(id?: string, paymentMethod?: string, paymentMethodId?: string,
        percentage?: number) { }
}
