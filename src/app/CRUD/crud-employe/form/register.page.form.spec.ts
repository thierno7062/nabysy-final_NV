import { FormBuilder, FormGroup } from '@angular/forms';
import { RegisterPageForm } from './register.page.form';

describe('CrudEmployePage',()=>{
  let registerPageForm: RegisterPageForm;
  let form: FormGroup;

    beforeEach(()=>{
      registerPageForm = new RegisterPageForm (new FormBuilder());
      form = registerPageForm.getForm();
    });

    it('should  empty prenom be invalid', ()=>{
      expect(form.get('prenom').valid).toBeFalse();
    });
    it('should  empty nom be invalid', ()=>{
      expect(form.get('nom').valid).toBeFalse();
  });
  it('should  empty adresse be invalid', ()=>{
      expect(form.get('adresse').valid).toBeFalse();
    });
    it('should  empty fonction be invalid', ()=>{
      expect(form.get('fonction').valid).toBeFalse();
  });
  it('should  empty phone be invalid', ()=>{
    expect(form.get('phone').valid).toBeFalse();
});
  it('should invalid email be invalid', ()=>{
    form.get('nom').setValue('invalidEmail');

    expect(form.get('nom').valid).toBeFalse();
  });
  it('should phone less than 7 characters be invalid', ()=>{
    form.get('phone').setValue('778885566');

    expect(form.get('phone').valid).toBeFalse();
  });

  it('should form be valid', ()=>{
    form.get('prenom').setValue('anyName');
    form.get('nom').setValue('anyName');
    form.get('adresse').setValue('adresse');
    form.get('fonction').setValue('fonction');
    form.get('phone').setValue('phone');

    expect(form.valid).toBeTruthy();
  });

});

