// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Version } from './Version.g';
import { BudgetState } from './BudgetState.g';
import { BudgetRevision } from './BudgetRevision.g';
import { BudgetReview } from './BudgetReview.g';
import { BudgetItem } from './BudgetItem.g';

export interface BudgetVersion extends SessionObject , Version {
        BudgetState : BudgetState;


        FromDate : Date;


        ThroughDate : Date;


        Comment : string;


        Description : string;


        BudgetRevisions : BudgetRevision[];
        AddBudgetRevision(value: BudgetRevision);
        RemoveBudgetRevision(value: BudgetRevision);


        BudgetNumber : string;


        BudgetReviews : BudgetReview[];
        AddBudgetReview(value: BudgetReview);
        RemoveBudgetReview(value: BudgetReview);


        BudgetItems : BudgetItem[];
        AddBudgetItem(value: BudgetItem);
        RemoveBudgetItem(value: BudgetItem);


}