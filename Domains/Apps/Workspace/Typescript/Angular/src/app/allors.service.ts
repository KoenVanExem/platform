import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { MdSnackBar } from '@angular/material';

import { MetaDomain } from '../allors/meta/generated/meta.g';
import { Workspace } from '../allors/domain/base/Workspace';
import { workspace } from '../allors/domain';

import { Database } from '../allors/angular';
import { ENVIRONMENT, Environment, AuthenticationService } from '../allors/angular';

@Injectable()
export class AllorsService {

    workspace: Workspace;
    database: Database;
    meta: MetaDomain;

    constructor(
        public http: Http,
        public snackBar: MdSnackBar,
        private authService: AuthenticationService,
        @Inject(ENVIRONMENT) private environment: Environment) {

      this.database = new Database(http, environment.url, (requestOptions) => this.authService.postProcessRequestOptions(requestOptions));
      this.workspace = workspace;
      this.meta = workspace.metaPopulation.createMetaDomain();
    }

    onError(error) {
        this.snackBar.open(error, 'close', {duration: 3000});
    }
}
