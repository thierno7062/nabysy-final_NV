import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CrudEmployePageModule } from './crud-employe.module';

import { CrudEmployePage } from './crud-employe.page';

describe('CrudEmployePage', () => {
  let component: CrudEmployePage;
  let fixture: ComponentFixture<CrudEmployePage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudEmployePage ],
      imports: [IonicModule.forRoot(),ReactiveFormsModule,CrudEmployePageModule]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudEmployePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  it('should create employe form on pâge init', ()=>{
    fixture.detectChanges();

    // expect(component.registerForm).not.toBeUndefined();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
