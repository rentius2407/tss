import { WorkoutService } from './../workout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  ctlDays = 42;
  atlDays = 7;

  ctl: number;
  atl: number;
  tss: number;

  constructor(private workoutService: WorkoutService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.setCtl();
    this.setAtl();
    this.setTSS();
  }

  setTSS() {
    this.tss = this.ctl - this.atl;
  }

  setCtl() {
    this.ctl = this.calculateTotalCtlTSS() / this.ctlDays;
  }

  setAtl() {
    this.atl = this.calculateTotalAtlTSS() / this.atlDays;
  }

  calculateTotalCtlTSS() {
    let totalCtlTSS = 0;
    const ctlFromDate = this.getCtlFromDate();

    this.workoutService.workouts.forEach(function (workout) {
      if (Date.parse(workout.time.toString()) >= ctlFromDate.getTime()) {
        totalCtlTSS = totalCtlTSS + workout.tss;
      }
    });

    return totalCtlTSS;
  }

  calculateTotalAtlTSS() {
    let totalAtlTSS = 0;
    const atlFromDate = this.getAtlFromDate();

    this.workoutService.workouts.forEach(function (workout) {
      if (Date.parse(workout.time.toString()) >= atlFromDate.getTime()) {
        totalAtlTSS = totalAtlTSS + workout.tss;
      }
    });

    return totalAtlTSS;
  }

  getAtlFromDate() {
    const atlFromDate = new Date();
    atlFromDate.setHours(0);
    atlFromDate.setMinutes(0);
    atlFromDate.setSeconds(0);
    atlFromDate.setMilliseconds(0);
    atlFromDate.setDate(atlFromDate.getDate() - this.atlDays);
    return atlFromDate;
  }

  getCtlFromDate() {
    const ctlFromDate = new Date();
    ctlFromDate.setHours(0);
    ctlFromDate.setMinutes(0);
    ctlFromDate.setSeconds(0);
    ctlFromDate.setMilliseconds(0);
    ctlFromDate.setDate(ctlFromDate.getDate() - this.ctlDays);
    return ctlFromDate;
  }

}
