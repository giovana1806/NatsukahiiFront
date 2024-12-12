import { Routes } from '@angular/router';
import { SushiComponent } from './sushi/sushi.component';
import { FormSushiComponent } from './form-sushi/form-sushi.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    {path: 'cadastro', component: FormSushiComponent},
    {path: 'cardapio', component: SushiComponent},
    {path: 'home', component: HomeComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
];
