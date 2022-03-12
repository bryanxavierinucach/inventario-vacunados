export interface ITemplateEmail {
    id?: string;
    description?: string;
    code?: string;
    templateHtml?: string;
}

export class Reward implements ITemplateEmail {
    constructor(id?: string,
        description?: string,
        code?: string,
        templateHtml?: string) { }
}
