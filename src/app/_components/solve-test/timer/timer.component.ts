import { Component, Input, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  @Input() startTime;
  @Input() duration;

  subscription: Subscription;

  public timeDiff;
  public minutesLeft;
  public secondsLeft;

  constructor() { }

  ngOnInit(): void {
    console.log(this.startTime, this.duration)
    this.subscription = interval(1000)
    .subscribe(x => {this.getTimeDifference();})
  }

  private getTimeDifference() {
    this.timeDiff = (this.startTime + this.duration * 60 * 1000) - new Date().getTime();

    if(this.timeDiff > 0) this.allocateTimeUnits(this.timeDiff);
    else {
      this.subscription.unsubscribe();
      this.minutesLeft = '00';
      this.secondsLeft = '00';
    }
  }

  private allocateTimeUnits(diff) {
    this.secondsLeft = Math.floor((diff) / 1000 % 60);
    this.minutesLeft = Math.floor((diff) / (1000*60) % 60);

    if(this.secondsLeft < 10) this.secondsLeft = '0' + this.secondsLeft;
    if(this.minutesLeft < 10) this.minutesLeft = '0' + this.minutesLeft;
  } 

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
