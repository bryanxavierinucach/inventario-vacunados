import { Injectable } from '@angular/core';
import { NbComponentStatus, NbGlobalPhysicalPosition, NbToastrConfig, NbToastrService } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastService {

  constructor(private toastrService: NbToastrService) {

  }

  public showError(title: string, body: string) {
    this.createToast('danger', title, body);
  }

  public showInfo(title: string, body: string) {
    this.createToast('info', title, body);
  }

  public showPrimary(title: string, body: string) {
    this.createToast('primary', title, body);
  }

  public showSuccess(title: string, body: string) {
    this.createToast('success', title, body);
  }

  public showWarning(title: string, body: string) {
    this.createToast('warning', title, body);
  }

  private createToast(type: NbComponentStatus, title: string, body: string) {
    const configToast: Partial<NbToastrConfig> = {
      status: type,
      destroyByClick: true,
      duration: 7000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
      iconPack: 'eva',
    };

    const titleContent = title ? ` ${title} ` : '';
    this.toastrService.show(body, titleContent, configToast);
  }
}
