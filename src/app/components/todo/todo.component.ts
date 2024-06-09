import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Job } from '../../interfaces/job';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  @ViewChild('inputField') inputField!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.jobs = JSON.parse(localStorage.getItem('jobs') ?? '');
  }

  jobs: Job[] = [];

  addJobForm = new FormGroup({
    jobInput: new FormControl('', Validators.required),
  });

  onSubmit(): void {
    if (this.addJobForm.invalid) {
      alert('You have to enter a job!');
    } else {
      const dateTime = new Date();

      let newJob: Job = {
        id: `${dateTime.getFullYear()}${dateTime.getMonth()}${dateTime.getDate()}${dateTime.getHours()}${dateTime.getMinutes()}${dateTime.getSeconds()}`,
        name: this.addJobForm.value.jobInput ?? 'no job',
        isComplete: false,
      };

      this.jobs.push(newJob);

      localStorage.setItem('jobs', JSON.stringify(this.jobs));

      this.jobs = JSON.parse(localStorage.getItem('jobs') ?? '');

      this.addJobForm.reset();
      this.inputField.nativeElement.focus();
    }
  }

  get jobInput() {
    return this.addJobForm.get('jobInput');
  }

  updateJob(id: string) {
    this.jobs = JSON.parse(localStorage.getItem('jobs') ?? '');

    let job = this.jobs.find((job) => job.id === id);

    if (job) {
      if (job.isComplete === false) job.isComplete = true;
      else job.isComplete = false;
    }

    localStorage.setItem('jobs', JSON.stringify(this.jobs));
  }

  deleteJob(id: string) {
    this.jobs = JSON.parse(localStorage.getItem('jobs') ?? '');

    this.jobs = this.jobs.filter((job) => job.id !== id);
    localStorage.setItem('jobs', JSON.stringify(this.jobs));
  }
}
