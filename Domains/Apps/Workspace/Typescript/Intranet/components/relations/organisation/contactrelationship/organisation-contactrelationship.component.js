"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.template = `
<td-layout-card-over [cardTitle]="title" [cardSubtitle]="subTitle">
<form #form="ngForm" *ngIf="organisationContactRelationship" (submit)="save()">

  <div class="pad">
    <a-mat-static *ngIf="!organisationContactRelationship.isNew" [object]="organisationContactRelationship" [roleType]="m.OrganisationContactRelationship.Contact"
    display="displayName"></a-mat-static>
    <a-mat-autocomplete *ngIf="organisationContactRelationship.isNew" [object]="organisationContactRelationship" [roleType]="m.OrganisationContactRelationship.Contact"
    [filter]="peopleFilter.create()" display="displayName"></a-mat-autocomplete>
    <button *ngIf="organisationContactRelationship.isNew" type="button" mat-icon-button (click)="addPerson = true"><mat-icon>add</mat-icon></button>
    <a-mat-select [object]="organisationContactRelationship" [roleType]="m.OrganisationContactRelationship.ContactKinds" [options]="organisationContactKinds"
      display="Description"></a-mat-select>
    <a-mat-select [object]="organisationContactRelationship.Contact" [roleType]="m.Person.PersonRoles" [options]="roles" display="Name"></a-mat-select>
  </div>

  <div *ngIf="addPerson" style="background: lightblue" class="pad">
    <person-inline (cancelled)="personCancelled($event)" (saved)="personAdded($event)">
    </person-inline>
  </div>

  <mat-divider></mat-divider>
  <mat-card-actions>
    <button mat-button color="primary" type="submit" [disabled]="!form.form.valid">SAVE</button>
    <button mat-button (click)="goBack()" type="button">CANCEL</button>
  </mat-card-actions>

</form>
</td-layout-card-over>
`;
