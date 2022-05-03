import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
  { path: 'movies/:id', loadChildren: () => import('./movie/movie.module').then(m => m.MovieModule) },
  { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
