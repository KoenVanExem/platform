// Allors generated file.
// Do not edit this file, changes will be overwritten.
/* tslint:disable */
import { SessionObject, Method } from "@allors/framework";

import { Commentable } from './Commentable.g';
import { Auditable } from './Auditable.g';
import { Printable } from './Printable.g';
import { RequestState } from './RequestState.g';
import { RequestItem } from './RequestItem.g';
import { RespondingParty } from './RespondingParty.g';
import { Party } from './Party.g';
import { Currency } from './Currency.g';
import { ContactMechanism } from './ContactMechanism.g';
import { Person } from './Person.g';
import { User } from './User.g';
import { QuoteVersion } from './QuoteVersion.g';
import { Quote } from './Quote.g';

export interface Request extends SessionObject , Commentable, Auditable, Printable {
        RequestState : RequestState;


        InternalComment : string;


        Description : string;


        RequestDate : Date;


        RequiredResponseDate : Date;


        RequestItems : RequestItem[];
        AddRequestItem(value: RequestItem);
        RemoveRequestItem(value: RequestItem);


        RequestNumber : string;


        RespondingParties : RespondingParty[];
        AddRespondingParty(value: RespondingParty);
        RemoveRespondingParty(value: RespondingParty);


        Originator : Party;


        Currency : Currency;


        FullfillContactMechanism : ContactMechanism;


        EmailAddress : string;


        TelephoneNumber : string;


        TelephoneCountryCode : string;


        ContactPerson : Person;


    CanExecuteCancel: boolean;
    Cancel: Method;

    CanExecuteReject: boolean;
    Reject: Method;

    CanExecuteSubmit: boolean;
    Submit: Method;

    CanExecuteHold: boolean;
    Hold: Method;

}