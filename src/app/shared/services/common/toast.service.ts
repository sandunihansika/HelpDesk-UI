import {Injectable} from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  messageFadeoutTime = 10000;

  constructor(private messageService: MessageService) {
  }

  info(summary: string, detail?: string): any {
    this.messageService.add({
      severity: 'info',
      key: 'general',
      summary,
      detail,
      life: this.messageFadeoutTime
    });
  }

  error(summary: string, detail?: string): any {
    this.messageService.add({
      severity: 'error',
      key: 'general',
      summary,
      detail,
      sticky: true
    });
  }

  success(summary: string, detail?: string): any {
    this.messageService.add({
      severity: 'success',
      key: 'general',
      summary,
      detail,
      life: this.messageFadeoutTime
    });
  }

  warn(summary: string, detail?: string): any {
    this.messageService.add({
      severity: 'warn',
      key: 'general',
      summary,
      detail,
      life: this.messageFadeoutTime
    });
  }
  clear(key?: string) {
    this.messageService.clear(key);
  }
}
