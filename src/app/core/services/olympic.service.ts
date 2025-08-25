import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { Olympic } from '../models/Olympic';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OlympicService {
  getMedals() {
    throw new Error('Method not implemented.');
  }
  private olympicUrl = './assets/mock/olympic.json';
  private olympics$ = new BehaviorSubject<Olympic[] | null>([]);

  constructor(private http: HttpClient, private router: Router) { }

  loadInitialData() {
    return this.http.get<Olympic[]>(this.olympicUrl).pipe(
      tap((value) => this.olympics$.next(value)),
      catchError((error) => {
        console.error(error);
        this.olympics$.next(null);
        this.router.navigate(['error']);
        return of(null);
      })
    );
  }

  getOlympics() {
    return this.olympics$.asObservable();
  }

  getOlympicById(id: number): Observable<Olympic | null> {
    return this.getOlympics().pipe(
      filter(data => data !== null && data.length > 0),
      map(data => data?.find(item => item.id === id) ?? null)
    );
  }
}
