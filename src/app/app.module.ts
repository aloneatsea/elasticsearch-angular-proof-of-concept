import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ElasticSearchService } from './elasticsearch-service/elastic-search.service';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { OperatorPageComponent } from './operator-page/operator-page.component';
import { OperatorsComponent } from './operators/operators.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    OperatorPageComponent,
    OperatorsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ ElasticSearchService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
