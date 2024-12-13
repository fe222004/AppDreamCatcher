import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApplianceServiceService {
  private readonly http = inject(HttpClient);

  private selectedType: string | null = null;
  private apiUrl = `${environment.apiUrl}/appliances`;

  setSelectedType(type: string | null) {
    this.selectedType = type;
  }

  getUserAppliances(
    userId: number,
    page: number,
    filters?: any
  ): Observable<any> {
    let url = `${this.apiUrl}/${userId}?page=${page}`;

    if (this.selectedType) {
      url += `&filter[appliance_type]=${this.selectedType}`;
    }
    return this.http.get(url);
  }
}
