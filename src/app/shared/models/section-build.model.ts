import { FormGroup } from '@angular/forms';
export interface ISectionBuild {
    form?: FormGroup;
}

export class Section implements ISectionBuild {
    constructor(form?: FormGroup) { }
}
