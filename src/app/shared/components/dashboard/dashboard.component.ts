import { Component, OnInit } from '@angular/core';
import { DashboardAdminService } from 'app/modules/admin/services/dashboard-admin.service';
import { UserService } from 'app/shared/services/user.service';
import { AuthService } from 'app/modules/auth/services';
import { OpportunityStatus } from 'app/shared/enums/opportunity-status.enum';


@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  activeStatus;
  asignedStatus;
  completedStatus;
  expiredStatus;
  allRewardDone;
  allAchievement;
  rol;
  walletId = 0;
  walletBalance;
  walletAddress;
  valorProgress = 10;
  numItems = 10;
  constructor(private authSvc: AuthService, private dashboardSvc: DashboardAdminService,
    private userSvc: UserService) { }
  ngOnInit(): void {
    this.profile();
    this.dashboard();
  }

  public profile() {
    const token = this.authSvc.getUserRoleLogin();

    for (const i of token) {
      if (i === 'users') {
        this.rol = 'users';
      } else if (i === 'pyme') {
        this.rol = 'pyme';
      } else if (i === 'admin') {
        this.rol = 'admin';
      }
    }

  }
  dashboard() {
    const IdUser = this.authSvc.getUserIdLogin();
    if (this.rol === 'admin') {
      this.dashboardSvc.getDashboardAdmin(OpportunityStatus.ACTIVE, IdUser).subscribe((resAdmin: any) => {
        this.activeStatus = resAdmin.OpportunityByStatus.count;
        this.allAchievement = resAdmin.achivemetUser;
        this.allRewardDone = resAdmin.rewardDone;
        this.walletBalance = resAdmin.balance;
        this.walletAddress = resAdmin.wallet;
      });
      this.dashboardSvc.getDashboardAdmin(OpportunityStatus.ASSIGNED, IdUser).subscribe((resAdmin: any) => {
        this.asignedStatus = resAdmin.OpportunityByStatus.count;
      });
      this.dashboardSvc.getDashboardAdmin(OpportunityStatus.COMPLETED, IdUser).subscribe((resAdmin: any) => {
        this.completedStatus = resAdmin.OpportunityByStatus.count;
      });
      this.dashboardSvc.getDashboardAdmin(OpportunityStatus.EXPIRED, IdUser).subscribe((resAdmin: any) => {
        this.expiredStatus = resAdmin.OpportunityByStatus.count;
      });
    } else if (this.rol === 'pyme' || this.rol === 'users') {
      this.dashboardSvc.getDashboardUsers(IdUser).subscribe((resUser: any) => {
        this.allAchievement = resUser.achivemetUser.count;
        this.allRewardDone = resUser.rewardDone.count;
        this.walletBalance = resUser.balance;
        this.walletAddress = resUser.wallet;
      });
    }
  }


}
