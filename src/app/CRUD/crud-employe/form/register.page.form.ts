/* eslint-disable @typescript-eslint/member-ordering */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export class RegisterPageForm{
     private formBuilder: FormBuilder;
     private form: FormGroup;

     constructor( formBuilder: FormBuilder){
      this.formBuilder= formBuilder;
      this.form = this.createForm();
     }

     private createForm(): FormGroup{
      const form = this.formBuilder.group( {
        prenom: ['',[Validators.required]],
        nom: ['',[Validators.required, Validators.name]],
        adresse: ['',[Validators.required, Validators.minLength(9)]],
        fonction: ['',[Validators.required]],
        phone: ['',[Validators.required]],

      });
      return form;
     }
     getForm(): FormGroup{
      return this.form;
     }
}

