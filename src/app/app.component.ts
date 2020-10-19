import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { ElasticSearchService } from './elasticsearch-service/elastic-search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'elasticsearch-test-project';

  searchQuery: string;

  constructor(
    private _elasticSearchService: ElasticSearchService,
    private _router: Router
  ) {
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this._elasticSearchService.initElasticSearch();
  }

  ping(): void {
    this._elasticSearchService.ping();
  }

  getOperator(): void {
    this._elasticSearchService.getOperator('siege');
  }

  getSubChapter(): void {
    this._elasticSearchService.getSubChapter('1');
  }

  search(): void {
    this._router.navigate(['search'], {
      queryParams: {
        search_string: this.searchQuery
      },
      queryParamsHandling: 'merge'
    });
  }
}
