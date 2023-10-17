import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PmShriComponent } from './pm-shri.component';

const routes: Routes = [
  {
    path:'',
    component: PmShriComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PmShriRoutingModule { }
