import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero.service';

@Component({
  selector: 'hero-list-item',
  templateUrl: './hero-list-item.component.html',
  styleUrls: ['./hero-list-item.component.css']
})
export class HeroListItemComponent implements OnInit {
  @Input() hero?: Hero

  constructor() { }

  ngOnInit() {
  }

}
