import { Routes } from '@angular/router';
import { ReflectionComponent } from './shared/components/reflection/reflection.component';
import { ReflectionGuard } from './shared/components/reflection/reflection.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'reflection', pathMatch: 'full' },
  { path: 'reflection', component: ReflectionComponent, canActivate: [ReflectionGuard] }
];