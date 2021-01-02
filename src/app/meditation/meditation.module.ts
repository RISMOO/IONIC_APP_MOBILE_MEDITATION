import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MeditationPageRoutingModule } from './meditation-routing.module';

import { MeditationPage } from './meditation.page';
import { RoundProgressModule } from 'angular-svg-round-progressbar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MeditationPageRoutingModule,
    RoundProgressModule,
  
  ],
  declarations: [MeditationPage]
})
export class MeditationPageModule {}
