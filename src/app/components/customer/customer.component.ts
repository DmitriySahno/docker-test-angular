import {Component, inject} from '@angular/core';
import {MatFormField, MatInput, MatLabel} from "@angular/material/input";
import {FormBuilder, FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {DialogRef} from "@angular/cdk/dialog";

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatFormField,
    MatLabel
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {

  dialogRef = inject(DialogRef);
  fb = inject(FormBuilder);

  form = this.fb.group({
    id: new FormControl(0),
    name: new FormControl(""),
  })

  cancel() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.form.getRawValue());
  }

}
