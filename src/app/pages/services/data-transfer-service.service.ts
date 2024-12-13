import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataTransferServiceService {
  private storageKey = 'formData';

  constructor() {}

  setData(data: any): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getData(): any {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  clearData(): void {
    localStorage.removeItem(this.storageKey);
  }
}
