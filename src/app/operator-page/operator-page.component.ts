import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-operator-page',
  templateUrl: './operator-page.component.html',
  styleUrls: ['./operator-page.component.css']
})
export class OperatorPageComponent implements OnInit {

  @Input() operator: Operator;
  @Input() subChapters: SubChapter[];
  @Input() furniture: Furniture[];
  @Input() items: Item[];

  constructor() { }

  ngOnInit() {
  }

}
