import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SelectorComponent } from './components/selector/selector.component';
import { OrganaizerComponent } from './components/organaizer/organaizer.component';

import { MomentPipe } from './pipes/moment.pipe';


@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    SelectorComponent,
    OrganaizerComponent,
    MomentPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
