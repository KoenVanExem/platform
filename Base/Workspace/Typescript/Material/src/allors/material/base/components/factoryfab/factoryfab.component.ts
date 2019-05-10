import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ObjectType, IObject } from '../../../../framework';
import { ObjectData, ObjectService } from '../../services/object';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'a-mat-factory-fab',
  templateUrl: './factoryfab.component.html',
  styleUrls: ['./factoryfab.component.scss']
})
export class FactoryFabComponent implements OnInit {

  @Input() private objectType: ObjectType;

  @Input() private createData: ObjectData;

  @Output() private created: EventEmitter<IObject> = new EventEmitter();

  classes: ObjectType[];

  constructor(public readonly factoryService: ObjectService) {
  }

  ngOnInit(): void {

    if (this.objectType.isInterface) {
      this.classes = this.objectType.classes;
    } else {
      this.classes = [this.objectType];
    }

    this.classes = this.classes.filter((v) => this.factoryService.hasCreateControl(v));
  }

  create(objectType: ObjectType) {
    this.factoryService.create(objectType, this.createData)
      .subscribe((v) => {
        if (v && this.created) {
          this.created.next(v);
        }
      });
  }
}