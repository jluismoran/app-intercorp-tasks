import { Component, OnInit } from '@angular/core';
import { TareasService } from '../tareas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TareaModel } from '../model/tarea.model';

@Component({
  selector: 'app-tarea-nueva',
  templateUrl: './tarea-nueva.component.html',
  styleUrls: ['./tarea-nueva.component.scss']
})
export class TareaNuevaComponent implements OnInit {

  crearTareaForm: FormGroup;

  constructor(private tareasService: TareasService,
              private fb: FormBuilder) {
    this.crearTareaForm = this.fb.group({
      descripcionTarea: ['', Validators.required],
      nombreColaborador: ['', Validators.required],
      fechaHoraInicio: ['', Validators.required],
      fechaHoraFin: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.crearTareaForm.valid) {
      var nuevaTarea = new TareaModel();
      nuevaTarea.descripcionTarea = this.crearTareaForm.get('descripcionTarea')?.value;
      nuevaTarea.nombreColaborador = this.crearTareaForm.get('nombreColaborador')?.value;
      nuevaTarea.fechaHoraInicio = this.crearTareaForm.get('fechaHoraInicio')?.value;
      nuevaTarea.fechaHoraFin = this.crearTareaForm.get('fechaHoraFin')?.value;
      console.log('Nuevo tarea creada:', nuevaTarea);
      this.tareasService.tareaNuevaShared.next(nuevaTarea);
      this.crearTareaForm.reset();
      this.tareasService.ocultarNuevaTarea.next(true);
    }
  }

}
