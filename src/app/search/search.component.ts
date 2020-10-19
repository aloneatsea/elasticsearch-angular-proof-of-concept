import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElasticSearchService } from '../elasticsearch-service/elastic-search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchQuery: string;
  results: Searchable[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _elasticSearchService: ElasticSearchService
  ) { }

  async ngOnInit() {
    this.searchQuery = this._activatedRoute.snapshot.queryParamMap.get('search_string');
    const hits = await this.search();
    this.results = hits.map(h => h._source) as Searchable[];
    console.log(this.results);
  }

  async search(): Promise<Hit[]> {
    return await this._elasticSearchService.searchFullText(this.searchQuery);
  }

}
