import { Component, OnInit } from '@angular/core';
import { TareasService } from '../tareas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaModel } from '../model/tarea.model';

@Component({
  selector: 'app-tarea-edicion',
  templateUrl: './tarea-edicion.component.html',
  styleUrls: ['./tarea-edicion.component.scss']
})
export class TareaEdicionComponent implements OnInit {

  idTarea: number = 0;
  editarTareaForm: FormGroup;

  constructor(private tareasService: TareasService,
              private fb: FormBuilder) { 
    this.editarTareaForm = this.fb.group({
      descripcionTarea: ['', Validators.required],
      nombreColaborador: ['', Validators.required],
      fechaHoraInicio: ['', Validators.required],
      fechaHoraFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.tareasService.tareaSeleccionadaShared$.subscribe(tarea => {
      console.log('cargar tarea para editar...');
      this.idTarea = tarea.idTarea;
      this.editarTareaForm.get('descripcionTarea')?.setValue(tarea.descripcionTarea);
      this.editarTareaForm.get('nombreColaborador')?.setValue(tarea.nombreColaborador);
      this.editarTareaForm.get('fechaHoraInicio')?.setValue(tarea.fechaHoraInicio);
      this.editarTareaForm.get('fechaHoraFin')?.setValue(tarea.fechaHoraFin);
    });
  }

  onSubmit() {
    if (this.editarTareaForm.valid) {
      var tareaEditada = new TareaModel();
      tareaEditada.idTarea = this.idTarea;
      tareaEditada.descripcionTarea = this.editarTareaForm.get('descripcionTarea')?.value;
      tareaEditada.nombreColaborador = this.editarTareaForm.get('nombreColaborador')?.value;
      tareaEditada.fechaHoraInicio = this.editarTareaForm.get('fechaHoraInicio')?.value;
      tareaEditada.fechaHoraFin = this.editarTareaForm.get('fechaHoraFin')?.value;
      console.log('Tarea editada:', tareaEditada);
      this.tareasService.tareaEditadaShared.next(tareaEditada);
      this.editarTareaForm.reset();
      this.tareasService.ocultarEdicion.next(true);
    }
  }
}
