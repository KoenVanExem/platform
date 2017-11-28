"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/observable/of");
require("rxjs/add/operator/switchMap");
const framework_1 = require("@allors/framework");
const Invoked_1 = require("./responses/Invoked");
const Loaded_1 = require("./responses/Loaded");
const Saved_1 = require("./responses/Saved");
class Scope {
    constructor(database, workspace) {
        this.database = database;
        this.workspace = workspace;
        this.session = new framework_1.Session(this.workspace);
    }
    load(service, params) {
        return this.database
            .pull(service, params)
            .switchMap((pullResponse) => {
            const requireLoadIds = this.workspace.diff(pullResponse);
            if (requireLoadIds.objects.length > 0) {
                return this.database
                    .sync(requireLoadIds)
                    .map((syncResponse) => {
                    this.workspace.sync(syncResponse);
                    const loaded = new Loaded_1.Loaded(this.session, pullResponse);
                    return loaded;
                });
            }
            else {
                const loaded = new Loaded_1.Loaded(this.session, pullResponse);
                return Observable_1.Observable.of(loaded);
            }
        });
    }
    save() {
        const pushRequest = this.session.pushRequest();
        return this.database
            .push(pushRequest)
            .switchMap((pushResponse) => {
            this.session.pushResponse(pushResponse);
            const syncRequest = new framework_1.SyncRequest();
            syncRequest.objects = pushRequest.objects.map((v) => v.i);
            if (pushResponse.newObjects) {
                for (const newObject of pushResponse.newObjects) {
                    syncRequest.objects.push(newObject.i);
                }
            }
            return this.database
                .sync(syncRequest)
                .map((syncResponse) => {
                this.workspace.sync(syncResponse);
                const saved = new Saved_1.Saved(this.session, pushResponse);
                return saved;
            });
        });
    }
    invoke(methodOrService, args) {
        return this.database
            .invoke(methodOrService, args)
            .map((invokeResponse) => new Invoked_1.Invoked(this.session, invokeResponse));
    }
}
exports.Scope = Scope;
