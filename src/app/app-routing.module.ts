import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./PAGES/home/home.module').then(m =>m.HomePageModule)
  },
 /*  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  }, */
  {
    path: 'personnel',
    loadChildren: () => import('./PAGES/personnel/personnel.module').then( m => m.PersonnelPageModule)
  },
  {
    path: 'absence',
    loadChildren: () => import('./PAGES/absence/absence.module').then( m => m.AbsencePageModule)
  },
  {
    path: 'affectation',
    loadChildren: () => import('./PAGES/affectation/affectation.module').then( m => m.AffectationPageModule)
  },
  {
    path: 'direction',
    loadChildren: () => import('./PAGES/direction/direction.module').then( m => m.DirectionPageModule)
  },
  {
    path: 'liste-services',
    loadChildren: () => import('./PAGES/liste-services/liste-services.module').then( m => m.ListeServicesPageModule)
  },
  {
    path: 'services',
    loadChildren: () => import('./PAGES/services/services.module').then( m => m.ServicesPageModule)
  },
  {
    path: 'administration',
    loadChildren: () => import('./PAGES/administration/administration.module').then( m => m.AdministrationPageModule)
  },
  {
    path: 'prime',
    loadChildren: () => import('./PAGES/prime/prime.module').then( m => m.PrimePageModule)
  },
  {
    path: 'salaires',
    loadChildren: () => import('./PAGES/salaires/salaires.module').then( m => m.SalairesPageModule)
  },
  {
    path: 'crud-absence',
    loadChildren: () => import('./CRUD/crud-absence/crud-absence.module').then( m => m.CrudAbsencePageModule)
  },
  {
    path: 'crud-affectation',
    loadChildren: () => import('./CRUD/crud-affectation/crud-affectation.module').then( m => m.CrudAffectationPageModule)
  },
  {
    path: 'crud-direction',
    loadChildren: () => import('./CRUD/crud-direction/crud-direction.module').then( m => m.CrudDirectionPageModule)
  },
  {
    path: 'crud-employe',
    loadChildren: () => import('./CRUD/crud-employe/crud-employe.module').then( m => m.CrudEmployePageModule)
  },
  {
    path: 'crud-service',
    loadChildren: () => import('./CRUD/crud-service/crud-service.module').then( m => m.CrudServicePageModule)
  },
  {
    path: 'detail-absence',
    loadChildren: () => import('./DETAIL/detail-absence/detail-absence.module').then( m => m.DetailAbsencePageModule)
  },
  {
    path: 'detail-affectation',
    loadChildren: () => import('./DETAIL/detail-affectation/detail-affectation.module').then( m => m.DetailAffectationPageModule)
  },
  {
    path: 'detail-employe',
    loadChildren: () => import('./DETAIL/detail-employe/detail-employe.module').then( m => m.DetailEmployePageModule)
  },

  {
    path: 'print-bulletin2',
    loadChildren: () => import('./pages/print-bulletin2/print-bulletin2.module').then( m => m.PrintBulletin2PageModule)
  },
  {
    path: 'crud-prime',
    loadChildren: () => import('./CRUD/crud-prime/crud-prime.module').then( m => m.CrudPrimePageModule)
  },
  {
    path: 'employe',
    loadChildren: () => import('./CRUD/employe/employe.module').then( m => m.EmployePageModule)
  },
  /* {
    path: 'photoviewer',
    loadChildren: () => import('./DETAIL/photoviewer/photoviewer.module').then( m => m.PhotoviewerPageModule)
  }, */
  {
    path: 'crud-sous-direction',
    loadChildren: () => import('./CRUD/crud-sous-direction/crud-sous-direction.module').then( m => m.CrudSousDirectionPageModule)
  },
  {
    path: 'detail-prime',
    loadChildren: () => import('./DETAIL/detail-prime/detail-prime.module').then( m => m.DetailPrimePageModule)
  },  {
    path: 'photoviewer',
    loadChildren: () => import('./DETAIL/photoviewer/photoviewer.module').then( m => m.PhotoviewerPageModule)
  },
  {
    path: 'avance',
    loadChildren: () => import('./CRUD/avance/avance.module').then( m => m.AvancePageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
