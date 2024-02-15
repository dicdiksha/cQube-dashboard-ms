import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NasComponent } from './nas-apex.component';           
const routes: Routes = [
    {
        path:'',
        component: NasComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NasApexRoutingComponent { }