import { HttpClient } from '@angular/common/http';
import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss',
})
export class CounterComponent implements OnInit, OnChanges, DoCheck {
  count = 10;
  isDone = false;
  // reset = true;
  private intervalId: ReturnType<typeof setInterval> | undefined;
  private httpClient = inject(HttpClient);

  constructor() {
    // console.log('count constructor');
  }
  ngDoCheck(): void {
    // console.log(this.count);
    // if (this.count == 0) {
    //   clearInterval(this.intervalId);
    //   this.isDone = true;
    // }
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('count on changes', changes);
  }
  ngOnInit(): void {
    this.httpClient
      .get('https://localhost:7137/WeatherForecast')
      .subscribe((data) => console.log(data));
  }

  countdown(): void {
    this.intervalId = setInterval(() => {
      this.count -= 1;
    }, 1000);
  }

  getInfo() {
    this.httpClient
      .get('https://localhost:7137/manage/info')
      .subscribe((data) => console.log(data));
  }
}
