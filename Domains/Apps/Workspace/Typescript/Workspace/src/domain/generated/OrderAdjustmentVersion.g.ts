// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Version } from './Version.g';
import { VatRate } from './VatRate.g';

export interface OrderAdjustmentVersion extends SessionObject , Version {
        Amount : number;


        VatRate : VatRate;


        Percentage : number;


}