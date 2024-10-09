import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TareasService } from '../tareas.service';
import { TareaModel } from '../model/tarea.model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-tareas-lista',
  templateUrl: './tareas-lista.component.html',
  styleUrls: ['./tareas-lista.component.scss']
})
export class TareasListaComponent implements OnInit {
  // listaTareas: TareaModel[] = [];
  listaTareas = new MatTableDataSource<TareaModel>([]);

  columnasTabTareas: string[] = ['descripcionTarea', 'nombreColaborador', 'fechaHoraInicio', 'fechaHoraFin', 'editar', 'eliminar'];

  constructor(public tareasService: TareasService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tareasService.getListaTareas().subscribe(data => {
      this.listaTareas.data = data.listTareas;
    });
  }

  ngAfterViewInit() {
    this.tareasService.tareaNuevaShared$.subscribe(value => {
      console.log('agregar a lista...');
      if (value.descripcionTarea.length>0){
        const maxId = this.listaTareas.data.reduce((max, tarea) => tarea.idTarea > max ? tarea.idTarea : max, -Infinity);
        value.idTarea = maxId + 1;

        this.tareasService.guardarTarea(value).subscribe({
          next: (response) => console.log('Tarea guardado en microservicio:', response),
          error: (error) => console.error(error),
          complete: () => console.log('Guardado completado')
        });

        this.listaTareas.data = [...this.listaTareas.data, value];
      }
      console.log('cantidad de tareas: '+this.listaTareas.data.length);
      this.cdr.detectChanges();
    });

    this.tareasService.tareaEditadaShared$.subscribe(value => {
      console.log('actualizar tarea editada...');
      this.tareasService.actualizarTarea(value.idTarea, value).subscribe({
        next: (response) => console.log('Tarea actualizada en microservicio:', response),
        error: (error) => console.error(error),
        complete: () => console.log('Actualizacion completada')
      });

      const data = this.listaTareas.data;
      const index = data.findIndex(tarea => tarea.idTarea === value.idTarea);
      if (index !== -1) {
        data[index] = value;
        this.listaTareas.data = data; // Actualizar la tabla
      }
      this.cdr.detectChanges();
    });
  }

  eliminarTarea(idTarea: number): void {
    this.tareasService.eliminarTarea(idTarea).subscribe(() => {
      this.listaTareas.data = this.listaTareas.data.filter(tarea => tarea.idTarea !== idTarea);
    });
  }

  mostrarEditarTarea(tarea: TareaModel): void {
    this.tareasService.tareaEditar.next(true);
    this.tareasService.ocultarEdicion.next(false);
    
    this.tareasService.tareaSeleccionadaShared.next(tarea);
  }

  mostrarNuevaTarea(): void {
    this.tareasService.tareaEditar.next(false);
    this.tareasService.ocultarNuevaTarea.next(false);
  }

}
