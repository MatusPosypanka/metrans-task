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
    // Initialize the form group with controls
    this.form = this.fb.group({
      title: ['', Validators.required],
      userId: ['', Validators.required],
      completed: [false],
    });
  }

  ngOnInit(): void {
    // If data is provided, patch the form values and show the delete button
    if (this.data) {
      this.form.patchValue(this.data);
      this.deleteButton = true;
    }
  }

  // Emit save event with form values when form is submitted
  onSubmit(): void {
    if (this.form.valid) {
      this.save.emit({ ...this.data, ...this.form.value });
    }
  }
}
