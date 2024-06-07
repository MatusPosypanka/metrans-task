import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Data } from '../../models/data.model';

@Component({
  selector: 'app-item-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.scss',
})
export class ItemFormComponent implements OnInit {
  @Input() data?: Data;
  @Output() save = new EventEmitter<Data>();
  @Output() delete = new EventEmitter<number>();
  form: FormGroup;
  deleteButton = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      userId: ['', Validators.required],
      completed: [false],
    });
  }

  ngOnInit(): void {
    if (this.data) {
      this.form.patchValue(this.data);
      this.deleteButton = true;
    }
  }

  onSubmit(): void {
    console.log('save');
    if (this.form.valid) {
      console.log('valid');
      this.save.emit({ ...this.data, ...this.form.value });
    }
  }
}
