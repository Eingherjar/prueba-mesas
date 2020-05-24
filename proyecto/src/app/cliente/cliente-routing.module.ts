import {NgModule } from '@angular/core'

import {Routes, RouterModule } from '@angular/router'
import {ClienteComponent} from './cliente.component';
const routes : Routes=[
    {
        path:'',
        component:ClienteComponent,
    }
    // ,
    // {
    //     path:'add',
    //     component: DetailComponent
    // }   
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClienteRoutingModule{

}