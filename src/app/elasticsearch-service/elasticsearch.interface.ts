interface SearchResult {
    hits: {
      hits: Hit[]
    }
    timed_out: boolean;
    took: number;
    _shards: {
      total: number;
      successful: number;
      skipped: number;
      failed: number;
    }
  }
  
  interface Hit {
    _id: number;
    _index: string;
    _score: number;
    _source: Operator | Furniture | Item | SubChapter;
    _type: string;
  }

  interface Searchable {
    name: string;
    type: string;
  }
  
  interface Operator extends Searchable {
    gender: string;
    class: string;
  }

interface Item extends Searchable {
    use: string;
    description: string;
}

interface Furniture extends Item {
    set: string;
}

interface Chapter {
    name: string;
    number: number;
    chapters: Chapter[];
}

interface SubChapter extends Searchable {
    number: number;
    lines: Line[];
}

interface Line {
    speaker: string;
    text: string;
}