import {Component, OnInit, OnDestroy, Input} from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public show: boolean = true;
  @Input() loader = false;

  constructor() {
    setTimeout(() => {
      this.show = false;
    }, 3500);
  }

  ngOnInit() { }

  ngOnDestroy() { }

}
