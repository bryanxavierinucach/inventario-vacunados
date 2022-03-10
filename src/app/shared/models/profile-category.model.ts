import { ICategory } from './category.model';
import { IProfile } from './profile.model';

export interface ICategoryProfile {
    id?: string;
    categoryId?: ICategory[];
    profileId?: IProfile[];
}

export class CategoryProfile implements ICategoryProfile {
    constructor(
        id?: string,
        categoryId?: ICategory[],
        profileId?: IProfile[],
       ) { }
}
