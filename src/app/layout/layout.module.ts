import { NgModule } from '@angular/core';

import { RoutingModule } from '../modules/routing.module';
import { SharedModule } from '../shared/shared.module';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    RoutingModule,
    SharedModule,
  ],
  declarations: [
    HeaderComponent,
    LayoutComponent,
    FooterComponent
  ],
  exports: [LayoutComponent]
})
export class LayoutModule { }
