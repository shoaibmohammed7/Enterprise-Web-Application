import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { RouterModule } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgbDropdownModule,
    CommonModule,
    AutocompleteLibModule,
  ],
  exports: [HeaderComponent],
})
export class SharedModule {}
