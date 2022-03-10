// https://github.com/Divergenti/Divergenti-Core/blob/master/src/app/services/global.service.ts

import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class GlobalService {

    static singletonInstance: GlobalService;

    constructor() {

        if (!GlobalService.singletonInstance) {
            GlobalService.singletonInstance = this;
        }

        return GlobalService.singletonInstance;

    }

    private coinType: number;
    private coinName: string;
    private coinUnit = 'DIVER';
    private decimalLimit = 8;
    public locale: string;

    getCoinType() {
        return this.coinType;
    }

    setCoinType(coinType: number) {
        this.coinType = coinType;
    }

    getCoinName() {
        return this.coinName;
    }

    setCoinName(coinName: string) {
        this.coinName = coinName;
    }

    getCoinUnit() {
        return this.coinUnit;
    }

    setCoinUnit(coinUnit: string) {
        this.coinUnit = coinUnit;
    }

    transform(value: number) {
        let temp;
        if (typeof value === 'number') {
            switch (this.getCoinUnit()) {
                case 'DIVER':
                    temp = value / 100000000;
                    return temp.toFixed(this.decimalLimit);
            }
        }
    }
}
