import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrashastComponent } from './prashast.component';

const routes: Routes = [
  {
      path:'',
      component: PrashastComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrashastRoutingModule { }
