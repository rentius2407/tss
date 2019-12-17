import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'dashboard', loadChildren: '../workout/dashboard/dashboard.module#DashboardPageModule'
      },
      {
        path: 'workouts',
        children: [
          {
            path: '',
            loadChildren: '../workout/workout.module#WorkoutPageModule'
          },
          {
            path: 'add',
            loadChildren: '../workout/add-workout/add-workout.module#AddWorkoutPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
