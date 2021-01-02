import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeditationPage } from './meditation.page';

const routes: Routes = [
  {
    path: '',
    component: MeditationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeditationPageRoutingModule {}
