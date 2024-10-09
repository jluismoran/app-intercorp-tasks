import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { TareaModel } from './model/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  tareaNuevaShared = new BehaviorSubject<TareaModel>(new TareaModel());
  tareaNuevaShared$ = this.tareaNuevaShared.asObservable();
  ocultarNuevaTarea = new BehaviorSubject<boolean>(true);
  tareaEditar = new BehaviorSubject<boolean>(false);
  ocultarEdicion = new BehaviorSubject<boolean>(true);
  tareaSeleccionadaShared = new BehaviorSubject<TareaModel>(new TareaModel());
  tareaSeleccionadaShared$ = this.tareaSeleccionadaShared.asObservable();
  tareaEditadaShared = new BehaviorSubject<TareaModel>(new TareaModel());
  tareaEditadaShared$ = this.tareaEditadaShared.asObservable();

  private apiUrl = 'http://localhost:8081/intercorp-task';

  constructor(private http: HttpClient) { }

  getListaTareas(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl+'/list-tasks');
  }

  eliminarTarea(idTarea: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl+'/delete-task'}/${idTarea}`);
  }

  guardarTarea(tarea: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/save-task`, tarea);
  }

  actualizarTarea(idTarea: number, tarea: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update-task/${idTarea}`, tarea);
  }
}
