import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OperatorsComponent } from '../operators/operators.component';
import { SearchComponent } from '../search/search.component';

const routes: Routes = [
  { path: 'operator/:name', component: OperatorsComponent },
  { path: 'search', component: SearchComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }