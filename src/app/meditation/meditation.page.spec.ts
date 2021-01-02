import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MeditationPage } from './meditation.page';

describe('MeditationPage', () => {
  let component: MeditationPage;
  let fixture: ComponentFixture<MeditationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeditationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MeditationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
