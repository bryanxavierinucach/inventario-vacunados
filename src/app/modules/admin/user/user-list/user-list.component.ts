import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { UserService } from '../../../../shared/services/user.service';
import { ToastService } from 'app/@core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { IUser } from 'app/shared/models/user.model';
import { ROLE_ADMIN, ROLE_ADMIN_SHOW, ROLE_PYME, ROLE_PYME_SHOW, ROLE_USER, ROLE_USERS_SHOW } from 'app/shared/constants/role.constants';
import { AuthService } from 'app/modules/auth/services';

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent extends LoadDataComponent implements OnInit {
  users: IUser[];

  ROLE_ADMIN = ROLE_ADMIN;
  ROLE_ADMIN_SHOW = ROLE_ADMIN_SHOW;
  ROLE_PYME = ROLE_PYME;
  ROLE_PYME_SHOW = ROLE_PYME_SHOW;
  ROLE_USER = ROLE_USER;
  ROLE_USERS_SHOW = ROLE_USERS_SHOW;
  public base64imagen;

  private FIELD_SEARCH = 'user';
  @Output() updateEvent = new EventEmitter<IUser>();

  constructor(private userService: UserService, private confirmationService: ConfirmationService,
    private toastService: ToastService, private authSvc: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    this.sortOptions = [
      { label: 'Descripción A-Z', value: 'user' },
      { label: 'Descripción Z-A', value: '!user' },
    ];
  }


  loadData() {
    this.isLoaded = false;
    this.userService.getAll(this.limitTable, this.page, this.q, this.FIELD_SEARCH, this.orderBy,
      this.orderDirection).subscribe(res => {
        this.users = res['data'];
        this.limitTable = res['limit'];
        this.totalRecords = res['total'];
        this.isLoaded = true;
      });
  }

  onSearch(event) {
    this.search(event);
    this.loadData();
  }
  onPaginate(event) {
    this.paginate(event);
    this.loadData();
  }

  onSortChange(event) {
    this.sortChange(event);
    this.loadData();
  }

  onConfirmDelete(data: IUser) {
    this.confirmationService.confirm({
      key: 'cddelete',
      message: '¿Quiere eliminar?',
      header: 'Confimar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(data.id);
      },
    });
  }
  delete(id: string) {
    this.isLoaded = false;
    this.userService.delete(id).subscribe(res => {
      this.isLoaded = true;
      this.loadData();
      this.toastService.showSuccess('Eliminado', res['message']);
    }, err => {
      this.isLoaded = true;
      if (err.error.message)
        this.toastService.showWarning('Atención', err.error.message);
      else
        this.toastService.showWarning('Atención', 'No se pudo eliminar');
    });
  }

  onUpdate(dataAll: IUser) {
    const id = dataAll.id;
    this.userService.getUserKeycloak(id).subscribe((res: any) => {
      const data = {
        id : dataAll.id,
        firstName: res.firstName,
        lastName: res.lastName,
        email: res.email,
        username: res.username,
        password: 'xxxxxxxxx',
      };
      this.updateEvent.emit(data);
    });
  }


}
