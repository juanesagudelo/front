import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FacultadService } from './services/facultad.service';
import { Facultad } from './models/facultad.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  facultades = signal<Facultad[]>([]);

  form = {
    nombre: '',
    decano: '',
    ubicacion: ''
  };

  constructor(private facultadService: FacultadService) {}

  ngOnInit() {
    this.cargarFacultades();
  }

  cargarFacultades() {
    this.facultadService.getAll().subscribe({
      next: (data) => this.facultades.set(data),
      error: (err) => console.error('Error cargando facultades', err)
    });
  }

  crearFacultad() {
    if (!this.form.nombre || !this.form.decano || !this.form.ubicacion) return;
    this.facultadService.create(this.form).subscribe({
      next: (nueva) => {
        this.facultades.update(list => [...list, nueva]);
        this.form = { nombre: '', decano: '', ubicacion: '' };
      },
      error: (err) => console.error('Error creando facultad', err)
    });
  }
}