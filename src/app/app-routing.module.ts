import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';
import { RbacDialogComponent } from './shared/components/rbac-dialog/rbac-dialog.component';
import { HomePageComponent } from './views/home-page/home-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { environment } from 'src/environments/environment';
import { DashboardModule } from './views/dashboard/dashboard.module';

var routes: Routes = [];

if (environment.loginNeeded) {
  routes = [
    {
      path: '', redirectTo: `summary-statistics`, pathMatch: 'full'
    },
    {
      path: 'public', redirectTo: 'summary-statistics', pathMatch: 'full'
    },
    {
      path: '',
      loadChildren: () => import('./views/authentication/authentication.module').then(module => module.AuthenticationModule)
    },
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'rbac', component: RbacDialogComponent,
          canActivate: [AuthGuard],
          data: { allowedUser: 'private_user'}
        },
        {
          path: 'home', component: HomePageComponent,
          canActivate: [AuthGuard],
          data: { allowedUser: 'private_user'}
        },
        {
          path: 'summary-statistics',
          loadChildren: () =>
            import('./views/dashboard/dashboard.module').then(
              (module) => module.DashboardModule
            )
        },
        {
          path: 'telemetry',
          loadChildren: () =>
          import('./views/telemetry/telemetry.module').then(
          (module) => module.TelemetryModule
          ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'telemetry' }
          },
        {
          path: 'teacher-attendance',
          loadChildren: () =>
            import('./views/teacher-attendance/teacher-attendance.module').then(
              (module) => module.TeacherAttendanceModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'sch_att' }
        },
        {
          path: 'udise',
          loadChildren: () =>
            import('./views/udise/udise.module').then(
              (module) => module.UdiseModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'udise' }
        },
        {
          path: 'nishtha',
          loadChildren: () =>
            import('./views/nishtha/nishtha.module').then(
              (module) => module.NishthaModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'nishtha' }
        },
        {
          path: 'pgi',
          loadChildren: () =>
            import('./views/pgi/pgi.module').then(
              (module) => module.PgiModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'pgi' }
        },
        {
          path: 'pmposhan',
          loadChildren: () =>
            import('./views/pmposhan/pmposhan.module').then(
              (module) => module.PmPoshanModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'pm_poshan' }
        },
        {
          path: 'nas',
          loadChildren: () =>
            import('./views/nas/nas.module').then(
              (module) => module.NasModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'nas' }
        },
        {
          path: 'diksha',
          loadChildren: () =>
            import('./views/diksha/diksha.module').then(
              (module) => module.DikshaModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'diksha' }
        },
        {
          path: 'ncf',
          loadChildren: () =>
            import('./views/ncf/ncf.module').then(
              (module) => module.NcfModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'ncf' }
        },
        {
          path: 'quizzes',
          loadChildren: () =>
            import('./views/ncert-quiz/ncert-quiz.module').then(
              (module) => module.NcertQuizModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'ncert_quiz' }
        },
        {
          path: 'microimprovement',
          loadChildren: () =>
            import('./views/micro-improvements/micro-improvements.module').then(
              (module) => module.MicroImprovementsModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'micro_improvements' }
        },
        {
          path: 'nipunBharat',
          loadChildren: () =>
            import('./views/nipun-bharat/nipun-bharat.module').then(
              (module) => module.NipunBharatModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'nipun_bharat' }
        },
        {
          path: 'pmShri',
          loadChildren: () =>
            import('./views/pm-shri/pm-shri.module').then(
              (module) => module.PmShriModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'pm_shri' }
        },
      ],
    },
  ];
}
else {
  routes = [
    {
      path: '', redirectTo: `summary-statistics`, pathMatch: 'full'
    },
    {
      path: '',
      component: LayoutComponent,
      children: [
        {
          path: 'summary-statistics',
          loadChildren: () =>
            import('./views/dashboard/dashboard.module').then(
              (module) => module.DashboardModule
            )
        },
        // {
        //   path: 'student-attendance',
        //   loadChildren: () =>
        //     import('./views/student-attendance/student-attendance.module').then(
        //       (module) => module.StudentAttendanceModule
        //     )
        // },
        {
          path: 'telemetry',
          loadChildren: () =>
          import('./views/telemetry/telemetry.module').then(
          (module) => module.TelemetryModule
          ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'telemetry' }
          },
        {
          path: 'teacher-attendance',
          loadChildren: () =>
            import('./views/teacher-attendance/teacher-attendance.module').then(
              (module) => module.TeacherAttendanceModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'sch_att' }
        },
        // {
        //   path: 'review-meetings',
        //   loadChildren: () =>
        //     import('./views/review-meetings/review-meetings.module').then(
        //       (module) => module.ReviewMeetingsModule
        //     )
        // },
        {
          path: 'udise',
          loadChildren: () =>
            import('./views/udise/udise.module').then(
              (module) => module.UdiseModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'udise' }
        },
        {
          path: 'nishtha',
          loadChildren: () =>
            import('./views/nishtha/nishtha.module').then(
              (module) => module.NishthaModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'nishtha' }
        },
        {
          path: 'pgi',
          loadChildren: () =>
            import('./views/pgi/pgi.module').then(
              (module) => module.PgiModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'pgi' }
        },
        {
          path: 'pmposhan',
          loadChildren: () =>
            import('./views/pmposhan/pmposhan.module').then(
              (module) => module.PmPoshanModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'pm_poshan' }
        },
        {
          path: 'nas',
          loadChildren: () =>
            import('./views/nas/nas.module').then(
              (module) => module.NasModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'nas' }
        },
        {
          path: 'diksha',
          loadChildren: () =>
            import('./views/diksha/diksha.module').then(
              (module) => module.DikshaModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'diksha' }
        },
        // {
        //   path: 'student-assessment',
        //   loadChildren: () =>
        //       import('./views/student-assessment/student-assessment.module').then(
        //           (module) => module.StudentAssessmentModule
        //       )
        // },
        // {
        //   path: 'school-infrastructure',
        //   loadChildren: () =>
        //       import('./views/school-infrastructure/school-infrastructure.module').then(
        //           (module) => module.SchoolInfrastructureModule
        //       )
        // },
        // {
        //   path: 'school-progression',
        //   loadChildren: () =>
        //       import('./views/school-progression/school-progression.module').then(
        //           (module) => module.SchoolProgressionModule
        //       )
        // // },
        // {
        //   path: 'student-assessments',
        //   loadChildren: () =>
        //       import('./views/student-assessments/student-assessments.module').then(
        //           (module) => module.StudentAssessmentsModule
        //       )
        // },
        {
          path: 'ncf',
          loadChildren: () =>
            import('./views/ncf/ncf.module').then(
              (module) => module.NcfModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'ncf' }
        },
        {
          path: 'quizzes',
          loadChildren: () =>
            import('./views/ncert-quiz/ncert-quiz.module').then(
              (module) => module.NcertQuizModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'ncert_quiz' }
        },
        {
          path: 'microimprovement',
          loadChildren: () =>
            import('./views/micro-improvements/micro-improvements.module').then(
              (module) => module.MicroImprovementsModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'micro_improvements' }
        },
        {
          path: 'nipunBharat',
          loadChildren: () =>
            import('./views/nipun-bharat/nipun-bharat.module').then(
              (module) => module.NipunBharatModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'nipun_bharat' }
        },
        {
          path: 'pmShri',
          loadChildren: () =>
            import('./views/pm-shri/pm-shri.module').then(
              (module) => module.PmShriModule
            ),
          canLoad: [AuthGuard],
          data: { nameSpace: 'pm_shri' }
        },
      ],
    },
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
