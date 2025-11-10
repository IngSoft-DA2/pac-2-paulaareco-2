import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reflection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reflection.component.html',
  styleUrls: ['./reflection.component.css']
})
export class ReflectionComponent {
  dlls: string[] = [];
  loading = false;
  error = false;

  constructor(private http: HttpClient) {}

  loadDlls() {
    this.loading = true;
    this.error = false;
    this.http.get<string[]>('http://localhost:5248/api/reflection/importers').subscribe({
      next: data => {
        this.dlls = data;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}