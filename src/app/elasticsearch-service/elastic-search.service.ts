import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch-browser';

@Injectable({
  providedIn: 'root'
})
export class ElasticSearchService {

  constructor() { }

  private client: Client;

  public initElasticSearch(): void {
    this.client = new Client({
      host: 'localhost:9200'
    });
  }

  public ping(): void {
    this.client.ping({
      requestTimeout: 30000,
    }, function (error: any) {
      if (error) {
        console.error('elasticsearch cluster is down!');
      } else {
        console.log('All is well');
      }
    });
  }

  public async getOperator(operatorName: string): Promise<Operator> {
    const result: SearchResult = await this.getSearchResult(operatorName, 'operator');
    console.log(result.hits.hits[0]._source);
    return result.hits.hits[0]._source as Operator;
  }

  public async getItem(itemName: string): Promise<Item> {
    const result: SearchResult = await this.getSearchResult(itemName, 'item');
    return result.hits.hits[0]._source as Item;
  }

  public async getFurniture(furnitureName: string): Promise<Furniture> {
    const result: SearchResult = await this.getSearchResult(furnitureName, 'furniture');
    return result.hits.hits[0]._source as Furniture;
  }

  public async getSubChapter(subChapterNumber: string): Promise<SubChapter> {
    const result: SearchResult = await this.client.search({
      index: 'thelibrary',
      body: {
        query: {
          bool: {
            must: {
              term: { number: subChapterNumber }
            },
            filter: {
              term: { type: 'subchapter' }
            }
          }
        }
      }
    }) as SearchResult;
    console.log(result.hits.hits[0]._source);
    return result.hits.hits[0]._source as SubChapter;
  }

  async getSearchResult(name: string, type: string): Promise<SearchResult> {
    return await this.client.search({
      index: 'thelibrary',
      body: {
        query: {
          bool: {
            must: {
              term: { name: name }
            },
            filter: {
              term: { type }
            }
          }
        }
      }
    }) as SearchResult;
  }

  async searchFullText(query: string): Promise<Hit[]> {
    const result = await this.client.search({
      index: 'thelibrary',
      body: {
        query: {
          query_string: {
            query
          }
        }
      }
    });
    console.log(result.hits.hits);
    return result.hits.hits;
  }
}
