import { CanActivateFn } from '@angular/router';

export const ReflectionGuard: CanActivateFn = () => {
  let counter = Number(localStorage.getItem('reflectionCounter')) || 0;
  counter++;
  localStorage.setItem('reflectionCounter', counter.toString());

  if (counter > 20) {
    alert('Ya accediste más de 20 veces a la ruta /reflection.');
    return false;
  }

  return true;
};