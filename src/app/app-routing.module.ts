import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProgressformComponent } from './pages/progressform/progressform.component';
import { RecordComponent } from './pages/record/record.component';

const routes: Routes = [
  {
    path: '',
    component: ProgressformComponent,
  },
  {
    path: 'record',
    component: RecordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
