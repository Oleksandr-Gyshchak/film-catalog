import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TransformImgPathPipe } from './pipes/transform-path.pipe';
import { TransformDurationPipe } from './pipes/transform-duration.pipe.1';
import { SpinnerDirective } from './directives/spinner.directive';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [
    PaginationComponent,
    TransformImgPathPipe,
    TransformDurationPipe,
    SpinnerDirective,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatDividerModule

  ],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatSelectModule,
    MatToolbarModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatTabsModule,
    ReactiveFormsModule,
    PaginationComponent,
    MatMenuModule,
    MatSnackBarModule,
    MatButtonToggleModule,
    MatBadgeModule,
    MatTooltipModule,
    TransformImgPathPipe,
    TransformDurationPipe,
    SpinnerDirective,
    SpinnerComponent,
    MatDividerModule
  ],
  entryComponents: [SpinnerComponent]
})
export class SharedModule { }
