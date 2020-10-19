import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ElasticSearchService } from '../elasticsearch-service/elastic-search.service';
import { pipe, from } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  private operator: Operator;
  private subChapters: SubChapter[];
  private furniture: Furniture[];
  private items: Item[];

  constructor(
    private _elasticSearchService: ElasticSearchService,
    private _activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    const operatorName = this._activatedRoute.snapshot.paramMap.get('name');
    this.operator = await this.getOperator(operatorName);
    const hits = await this.getRelatedContent();
    this.subChapters = hits.filter(h => h._source.type === 'subchapter').map(h => h._source) as SubChapter[];
    this.furniture = hits.filter(h => h._source.type === 'furniture').map(h => h._source) as Furniture[];
    this.items = hits.filter(h => h._source.type === 'item').map(h => h._source) as Item[];
  }

  async getOperator(operatorName: string): Promise<Operator> {
    return await this._elasticSearchService.getOperator(operatorName);
  }

  async getRelatedContent(): Promise<Hit[]> {
    return await this._elasticSearchService.searchFullText(this.operator.name);
  }

}
