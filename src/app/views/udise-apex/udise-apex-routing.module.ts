import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UdiseComponent } from './udise-apex.component';           
const routes: Routes = [
    {
        path:'',
        component: UdiseComponent
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UdiseApexRoutingComponent { }