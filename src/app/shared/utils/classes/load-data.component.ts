import { SelectItem } from 'primeng/api';

export abstract class LoadDataComponent {
    public sortOptions: SelectItem[];
    public sortOrder: number;
    public sortField: string;
    public limit: number = 10;
    public limitData: number = 9; // Cuando  es dataview
    public limitTable: number = 10; // Cuando solo es tabla
    public page: number = 1;
    public q: string;
    public orderBy: string;
    public orderDirection: string;
    public totalRecords: any = 0;
    public isLoaded: boolean;
    public detailLoading: boolean;

    search(event) {
        this.q = event.target.value;
    }

    paginate(event) {
        this.isLoaded = false;
        this.page = event.page + 1;
    }

    sortChange(event) {
        // const value = event.value;
        const value = event;
        this.orderBy = value.replace('!', '');
        if (value.indexOf('!') === 0) {
            this.sortOrder = -1;
            this.sortField = value.substring(1, value.length);
            this.orderDirection = 'DESC';
        } else {
            this.sortOrder = 1;
            this.sortField = value;
            this.orderDirection = 'ASC';
        }
    }
}
