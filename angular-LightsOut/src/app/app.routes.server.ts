import { RenderMode, ServerRoute } from '@angular/ssr';
import { ProblemService } from './services/problem.service';
import { inject } from '@angular/core';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }

];
