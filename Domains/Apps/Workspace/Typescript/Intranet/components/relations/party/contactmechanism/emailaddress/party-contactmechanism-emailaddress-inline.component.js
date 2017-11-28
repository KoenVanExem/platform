"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const base_angular_1 = require("@allors/base-angular");
const framework_1 = require("@allors/framework");
let PartyContactMechanismEmailAddressInlineComponent = class PartyContactMechanismEmailAddressInlineComponent {
    constructor(workspaceService, errorService) {
        this.workspaceService = workspaceService;
        this.errorService = errorService;
        this.saved = new core_1.EventEmitter();
        this.cancelled = new core_1.EventEmitter();
        this.m = this.workspaceService.metaPopulation.metaDomain;
    }
    ngOnInit() {
        const query = [
            new framework_1.Query({
                name: "contactMechanismPurposes",
                objectType: this.m.ContactMechanismPurpose,
            }),
        ];
        this.scope
            .load("Pull", new framework_1.PullRequest({ query }))
            .subscribe((loaded) => {
            this.contactMechanismPurposes = loaded.collections.contactMechanismPurposes;
            this.partyContactMechanism = this.scope.session.create("PartyContactMechanism");
            this.emailAddress = this.scope.session.create("EmailAddress");
            this.partyContactMechanism.ContactMechanism = this.emailAddress;
        }, (error) => {
            this.cancelled.emit();
        });
    }
    cancel() {
        this.cancelled.emit();
    }
    save() {
        this.saved.emit(this.partyContactMechanism);
    }
};
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PartyContactMechanismEmailAddressInlineComponent.prototype, "saved", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PartyContactMechanismEmailAddressInlineComponent.prototype, "cancelled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", base_angular_1.Scope)
], PartyContactMechanismEmailAddressInlineComponent.prototype, "scope", void 0);
PartyContactMechanismEmailAddressInlineComponent = __decorate([
    core_1.Component({
        selector: "party-contactmechanism-emailAddress",
        template: `
  <a-mat-select [object]="partyContactMechanism" [roleType]="m.PartyContactMechanism.ContactPurposes" [options]="contactMechanismPurposes" display="Name"></a-mat-select>
  <a-mat-input [object]="emailAddress" [roleType]="m.EmailAddress.ElectronicAddressString" label="Email address"></a-mat-input>
  <a-mat-slide-toggle [object]="partyContactMechanism" [roleType]="m.PartyContactMechanism.UseAsDefault" label="Use as default"></a-mat-slide-toggle>
  <a-mat-slide-toggle [object]="partyContactMechanism" [roleType]="m.PartyContactMechanism.NonSolicitationIndicator" label="Non Solicitation"></a-mat-slide-toggle>

  <button mat-button color="primary" type="button" (click)="save()">Save</button>
  <button mat-button color="secondary" type="button"(click)="cancel()">Cancel</button>
`,
    }),
    __metadata("design:paramtypes", [base_angular_1.WorkspaceService, base_angular_1.ErrorService])
], PartyContactMechanismEmailAddressInlineComponent);
exports.PartyContactMechanismEmailAddressInlineComponent = PartyContactMechanismEmailAddressInlineComponent;