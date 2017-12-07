"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = {
    domains: [
        'Custom',
        'Base',
        'Core'
    ],
    interfaces: [
        {
            id: 'a6a3c79e150b458696ea5ac0e2e638c6',
            name: 'Version',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: 'b38c700c7ad949629f5335b8aef22e09',
                    name: 'DerivationTimeStamp',
                    objectType: 'DateTime',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                }
            ],
        }, {
            id: '9279e337c6584086946d03c75cdb1ad3',
            name: 'Deletable',
            interfaces: [],
            exclusiveMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f',
                    name: 'Delete',
                }
            ]
        }, {
            id: 'b7bcc22f03f046fdb7384e035921d445',
            name: 'Enumeration',
            interfaces: [
                'UniquelyIdentifiable',
            ],
            exclusiveRoleTypes: [
                {
                    id: '919fdad7830e4b12b23cf433951236af',
                    name: 'LocalisedNames',
                    objectType: 'LocalisedText',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                },
                {
                    id: '5850860dc772402f815b7634c9a1e697',
                    name: 'Name',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: '0c6faf5aeac9454cbd533b8409e56d34',
                    name: 'IsActive',
                    objectType: 'Boolean',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                }
            ],
        }, {
            id: '7979a17c082946dfa0d41b01775cfaac',
            name: 'Localised',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: 'd43b92ac9e6f423896251e889be054cf',
                    name: 'Locale',
                    objectType: 'Locale',
                    isUnit: false,
                    isOne: true,
                    isRequired: true
                }
            ],
        }, {
            id: 'f991813f3146443196d0554aa2186887',
            name: 'ObjectState',
            interfaces: [
                'UniquelyIdentifiable',
            ],
            exclusiveRoleTypes: [
                {
                    id: '945cbba64b094b87931e861b147c3823',
                    name: 'Name',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                }
            ],
        }, {
            id: '122ccfe1f90244c19d6c6f6a0afa9469',
            name: 'UniquelyIdentifiable',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    name: 'UniqueId',
                    objectType: 'Unique',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                }
            ],
        }, {
            id: 'a0309c3b6f804777983e6e69800df5be',
            name: 'User',
            interfaces: [
                'Localised',
            ],
            exclusiveRoleTypes: [
                {
                    id: '3b7d40a018ea4018b7976417723e1890',
                    name: 'UserName',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'faf89920880f4600baf1a27a5268444a',
                    name: 'NormalizedUserName',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '58e3575491a94956aa66ca48d05c7042',
                    name: 'UserEmail',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '1b1409b8add7494ca895002fc969ac7b',
                    name: 'UserEmailConfirmed',
                    objectType: 'Boolean',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '484ecaae3f39451ba689a55601df6778',
                    name: 'TaskList',
                    objectType: 'TaskList',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '79e9a90792374aab9340277d593748f5',
                    name: 'NotificationList',
                    objectType: 'NotificationList',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: 'c92466b555ba496a88802821f32f8f8e',
                    name: 'SingletonWhereGuest',
                },
                {
                    id: '6e08b1d8f7fa452d907a668bf32702c1',
                    name: 'TaskAssignmentsWhereUser',
                }
            ],
        }, {
            id: '84eb0e6e68e1478ca35f6036d45792be',
            name: 'Task',
            interfaces: [
                'UniquelyIdentifiable',
                'Deletable',
            ],
            exclusiveRoleTypes: [
                {
                    id: '4ca8997f92324c848f37e977071eb316',
                    name: 'WorkItem',
                    objectType: 'WorkItem',
                    isUnit: false,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: 'ceba28882a6e4822881b1101b48f80f3',
                    name: 'DateCreated',
                    objectType: 'DateTime',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: 'eacac26bfea749f8abb657d63accd548',
                    name: 'DateClosed',
                    objectType: 'DateTime',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'a7c8f58f358a4ae992990ef560190541',
                    name: 'Participants',
                    objectType: 'Person',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                },
                {
                    id: '34320d76680346158444cc3ea8bb0315',
                    name: 'Performer',
                    objectType: 'Person',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: 'e5e52776c94642b099f4596ffc1c298f',
                    name: 'TaskAssignmentsWhereTask',
                }
            ],
        }, {
            id: 'fbea29c661094163a0889f0b4deac896',
            name: 'WorkItem',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: 'cf456f4d8c764bfe999689b660c9b153',
                    name: 'WorkItemDescription',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: '2e1ebe9752d346fc94c23203a13856c7',
                    name: 'TasksWhereWorkItem',
                }
            ],
        }, {
            id: 'fefcf1b6ac8f47b0bed5939207a2833e',
            name: 'I1',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: 'fec573a75ab34f309b507d720b4af4b4',
                    name: 'I1AllorsString',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                }
            ],
        },
    ],
    classes: [
        {
            id: '020f5d4d4a594d7b865ad72fc70e4d97',
            name: 'LocalisedText',
            interfaces: [
                'Localised',
            ],
            exclusiveRoleTypes: [
                {
                    id: '8d3f68e1fa6e414faa4d25fcc2c975d6',
                    name: 'Text',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                }
            ],
            concreteRoleTypes: [
                {
                    id: '8d3f68e1fa6e414faa4d25fcc2c975d6',
                    isRequired: true
                },
                {
                    id: 'd43b92ac9e6f423896251e889be054cf',
                    isRequired: true
                }
            ],
            associationTypes: [
                {
                    id: '9b68261250f943f3abde4d0cb5156f0d',
                    name: 'CountryWhereLocalisedName',
                },
                {
                    id: '06b8f2b291f04b89ae19b47de4524556',
                    name: 'CurrencyWhereLocalisedName',
                },
                {
                    id: '6650af3bf5374c2fafff6773552315cd',
                    name: 'LanguageWhereLocalisedName',
                },
                {
                    id: 'bcf428fd0263488cb9ac963ceca1c972',
                    name: 'EnumerationWhereLocalisedName',
                }
            ],
        }, {
            id: 'c4d93d5e34c347319d3747a8e801d9a8',
            name: 'AccessControl',
            interfaces: [
                'Deletable',
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: '0568354fe3d9439ebaacb7dce31b956a',
            name: 'Counter',
            interfaces: [
                'UniquelyIdentifiable',
            ],
            concreteRoleTypes: [
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    isRequired: true
                }
            ],
        }, {
            id: 'c22bf60e64284d10819494f7be396f28',
            name: 'Country',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: '4ca5a6405d9e491095ed6872c7ea13d2',
                    name: 'Currency',
                    objectType: 'Currency',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '4fe997d6d221432b9f094f77735c109b',
                    name: 'IsoCode',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: '60f1f9a313d1485fbc77fda1f9ef1815',
                    name: 'Name',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: '99c52c13ef504f68a32ffef660aa3044',
                    name: 'LocalisedNames',
                    objectType: 'LocalisedText',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: '4ca5a6405d9e491095ed6872c7ea13d2',
                    isRequired: false
                },
                {
                    id: '4fe997d6d221432b9f094f77735c109b',
                    isRequired: true
                },
                {
                    id: '60f1f9a313d1485fbc77fda1f9ef1815',
                    isRequired: true
                },
                {
                    id: '99c52c13ef504f68a32ffef660aa3044',
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: 'bb5904f5feb047eb903a0351d55f0d8c',
                    name: 'LocalesWhereCountry',
                }
            ],
        }, {
            id: 'fd397adf40b44ef8b449dd5a24273df3',
            name: 'Currency',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: '09d7402744574788803c24b857245565',
                    name: 'IsoCode',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: 'e7c93764d634418797ed9248ea56bab2',
                    name: 'Name',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: 'e1301b8f25cc4ace884e79af1d303f53',
                    name: 'LocalisedNames',
                    objectType: 'LocalisedText',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: '09d7402744574788803c24b857245565',
                    isRequired: true
                },
                {
                    id: 'e7c93764d634418797ed9248ea56bab2',
                    isRequired: true
                },
                {
                    id: 'e1301b8f25cc4ace884e79af1d303f53',
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: '323173ee385c4f748b78ff05735460f8',
                    name: 'CountriesWhereCurrency',
                }
            ],
        }, {
            id: '4a0eca4b281f488d9c7e497de882c044',
            name: 'Language',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: '84f904a68dcc4089bda634325ade6367',
                    name: 'IsoCode',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: '308d73b01b6540a988f1288848849c51',
                    name: 'Name',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: 'c78e173674b44574a365421dcadf4d4c',
                    name: 'NativeName',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: '5e9fcced727d42a295e6a0f9d8be4ec7',
                    name: 'LocalisedNames',
                    objectType: 'LocalisedText',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: '84f904a68dcc4089bda634325ade6367',
                    isRequired: true
                },
                {
                    id: '308d73b01b6540a988f1288848849c51',
                    isRequired: true
                },
                {
                    id: 'c78e173674b44574a365421dcadf4d4c',
                    isRequired: true
                },
                {
                    id: '5e9fcced727d42a295e6a0f9d8be4ec7',
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: 'af5018923c8341d1826bf5c4cb1de7fe',
                    name: 'LocalesWhereLanguage',
                }
            ],
        }, {
            id: '45033ae685b54ced87ce02518e6c27fd',
            name: 'Locale',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: '647db2b3997b4c3a9ae2d49b410933c1',
                    name: 'Name',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'ed32b12a00ad420b9dfaf1c6ce773fcd',
                    name: 'Language',
                    objectType: 'Language',
                    isUnit: false,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: 'b2fc6e063881427eb4cc8457a65f8076',
                    name: 'Country',
                    objectType: 'Country',
                    isUnit: false,
                    isOne: true,
                    isRequired: true
                }
            ],
            concreteRoleTypes: [
                {
                    id: '647db2b3997b4c3a9ae2d49b410933c1',
                    isRequired: false
                },
                {
                    id: 'ed32b12a00ad420b9dfaf1c6ce773fcd',
                    isRequired: true
                },
                {
                    id: 'b2fc6e063881427eb4cc8457a65f8076',
                    isRequired: true
                }
            ],
            associationTypes: [
                {
                    id: '45a4205d7c0240d48d976d7d59e05def',
                    name: 'SingletonsWhereDefaultLocale',
                },
                {
                    id: '33d5d8b9347248d8ab1a83d00d9cb691',
                    name: 'SingletonWhereLocale',
                },
                {
                    id: '6684d98bcd434612bf9dafefe02a0d43',
                    name: 'LocalisedsWhereLocale',
                }
            ],
        }, {
            id: 'ad7277a8eda44128a990b47fe43d120a',
            name: 'Login',
            interfaces: [
                'Deletable',
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: 'da5b86a34f334c0d965df4fbc1179374',
            name: 'Media',
            interfaces: [
                'UniquelyIdentifiable',
                'Deletable',
            ],
            exclusiveRoleTypes: [
                {
                    id: 'de0fe224c40d469cbdc5849a7412efec',
                    name: 'Revision',
                    objectType: 'Unique',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '02fe1ce8c0194a40bd6fb38d2f47a288',
                    name: 'MediaContent',
                    objectType: 'MediaContent',
                    isUnit: false,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: '877abdc88915464088718cef7ef69072',
                    name: 'InData',
                    objectType: 'Binary',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'ce17bfc75a4e415a9ae0fae429cee69c',
                    name: 'InDataUri',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '4c4ec21ca3c0472092e0cf6532000265',
                    name: 'FileName',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '7cfc8b4051994457bbbd27a786721465',
                    name: 'Type',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: 'de0fe224c40d469cbdc5849a7412efec',
                    isRequired: false
                },
                {
                    id: '02fe1ce8c0194a40bd6fb38d2f47a288',
                    isRequired: true
                },
                {
                    id: '877abdc88915464088718cef7ef69072',
                    isRequired: false
                },
                {
                    id: 'ce17bfc75a4e415a9ae0fae429cee69c',
                    isRequired: false
                },
                {
                    id: '4c4ec21ca3c0472092e0cf6532000265',
                    isRequired: false
                },
                {
                    id: '7cfc8b4051994457bbbd27a786721465',
                    isRequired: false
                },
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    isRequired: true
                }
            ],
            associationTypes: [
                {
                    id: '912b48f5215e4cc0a83b56b74d986608',
                    name: 'PeopleWherePhoto',
                }
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: '6c20422ecb3e4402bb40dacaf584405e',
            name: 'MediaContent',
            interfaces: [
                'Deletable',
            ],
            exclusiveRoleTypes: [
                {
                    id: '70823e7d58294db799e0f6c5f2b0e87b',
                    name: 'Type',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: '85170945b020485bbb6fc4122992ebfd',
                    name: 'Data',
                    objectType: 'Binary',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                }
            ],
            concreteRoleTypes: [
                {
                    id: '70823e7d58294db799e0f6c5f2b0e87b',
                    isRequired: true
                },
                {
                    id: '85170945b020485bbb6fc4122992ebfd',
                    isRequired: true
                }
            ],
            associationTypes: [
                {
                    id: 'e8537dcf1bd746c4a37c077bee6a78a1',
                    name: 'MediaWhereMediaContent',
                }
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: '3587d2e1c3f64c55a96c016e0501d99c',
            name: 'AutomatedAgent',
            interfaces: [
                'User',
                'Localised',
            ],
            concreteRoleTypes: [
                {
                    id: '3b7d40a018ea4018b7976417723e1890',
                    isRequired: false
                },
                {
                    id: 'faf89920880f4600baf1a27a5268444a',
                    isRequired: false
                },
                {
                    id: '58e3575491a94956aa66ca48d05c7042',
                    isRequired: false
                },
                {
                    id: '1b1409b8add7494ca895002fc969ac7b',
                    isRequired: false
                },
                {
                    id: '484ecaae3f39451ba689a55601df6778',
                    isRequired: false
                },
                {
                    id: '79e9a90792374aab9340277d593748f5',
                    isRequired: false
                },
                {
                    id: 'd43b92ac9e6f423896251e889be054cf',
                    isRequired: true
                }
            ],
        }, {
            id: '7fded18333374196afb03266377944bc',
            name: 'Permission',
            interfaces: [
                'Deletable',
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: 'c799ca62a554467d9aa21663293bb37f',
            name: 'Person',
            interfaces: [
                'User',
                'Localised',
                'UniquelyIdentifiable',
                'Deletable',
            ],
            exclusiveRoleTypes: [
                {
                    id: 'f10ea0496d244ca28efa032fcf3000b3',
                    name: 'FirstName',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'ace04ad8bf644fc3821614a720d3105d',
                    name: 'LastName',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'a86fc7a6dedd4da9a25075c9ec730d22',
                    name: 'MiddleName',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '0ffd9c62efc64438aaa3755e4c637c21',
                    name: 'BirthDate',
                    objectType: 'DateTime',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'e431d53c37ed4fde86a9755f354c1d75',
                    name: 'FullName',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'abd2a4b34b1748d4b4650ffcb5a2664d',
                    name: 'IsStudent',
                    objectType: 'Boolean',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'f6624facdb8e4fb29e8618021b59d31d',
                    name: 'Photo',
                    objectType: 'Media',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '0aab73c3f9974dd9885a2c1c892adb0e',
                    name: 'Weight',
                    objectType: 'Decimal',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '79ffeed6e06a42f4b12fd7f7c98b6499',
                    name: 'CycleOne',
                    objectType: 'Organisation',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '7ceea11523c846e2ba761fdb1fa85381',
                    name: 'CycleMany',
                    objectType: 'Organisation',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: 'f10ea0496d244ca28efa032fcf3000b3',
                    isRequired: false
                },
                {
                    id: 'ace04ad8bf644fc3821614a720d3105d',
                    isRequired: false
                },
                {
                    id: 'a86fc7a6dedd4da9a25075c9ec730d22',
                    isRequired: false
                },
                {
                    id: '0ffd9c62efc64438aaa3755e4c637c21',
                    isRequired: false
                },
                {
                    id: 'e431d53c37ed4fde86a9755f354c1d75',
                    isRequired: false
                },
                {
                    id: 'abd2a4b34b1748d4b4650ffcb5a2664d',
                    isRequired: false
                },
                {
                    id: 'f6624facdb8e4fb29e8618021b59d31d',
                    isRequired: false
                },
                {
                    id: '0aab73c3f9974dd9885a2c1c892adb0e',
                    isRequired: false
                },
                {
                    id: '79ffeed6e06a42f4b12fd7f7c98b6499',
                    isRequired: false
                },
                {
                    id: '7ceea11523c846e2ba761fdb1fa85381',
                    isRequired: false
                },
                {
                    id: '3b7d40a018ea4018b7976417723e1890',
                    isRequired: false
                },
                {
                    id: 'faf89920880f4600baf1a27a5268444a',
                    isRequired: false
                },
                {
                    id: '58e3575491a94956aa66ca48d05c7042',
                    isRequired: false
                },
                {
                    id: '1b1409b8add7494ca895002fc969ac7b',
                    isRequired: false
                },
                {
                    id: '484ecaae3f39451ba689a55601df6778',
                    isRequired: false
                },
                {
                    id: '79e9a90792374aab9340277d593748f5',
                    isRequired: false
                },
                {
                    id: 'd43b92ac9e6f423896251e889be054cf',
                    isRequired: true
                },
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    isRequired: true
                }
            ],
            associationTypes: [
                {
                    id: 'b031ef1a01024b19b85daa9c404596c3',
                    name: 'OrganisationWhereEmployee',
                },
                {
                    id: 'ed76a63100c44753b3d4b3a53b9ecf4a',
                    name: 'OrganisationWhereManager',
                },
                {
                    id: '3820f65f0e794f30a9735d17dca6ad33',
                    name: 'OrganisationsWhereOwner',
                },
                {
                    id: '4fdd9abbf2e74f07860e27b4207224bd',
                    name: 'OrganisationsWhereShareholder',
                },
                {
                    id: '4955ac7ff8404f24b44cc2d3937d2d44',
                    name: 'OrganisationsWhereCycleOne',
                },
                {
                    id: '6abcd4e244a746b4bd98d052f38b7c50',
                    name: 'OrganisationsWhereCycleMany',
                },
                {
                    id: '0d42157835fc4309b8b6cda0c9cf948c',
                    name: 'TasksWhereParticipant',
                },
                {
                    id: '90150444fc1847fda6fd7740006e64ca',
                    name: 'TasksWherePerformer',
                }
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: 'af6fe5f4e5bc4099bcd197528af6505d',
            name: 'Role',
            interfaces: [
                'UniquelyIdentifiable',
            ],
            concreteRoleTypes: [
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    isRequired: true
                }
            ],
        }, {
            id: 'a53f1aed0e3f4c3c9600dc579cccf893',
            name: 'SecurityToken',
            interfaces: [
                'Deletable',
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: '313b97a5328c46009dd2b5bc146fb13b',
            name: 'Singleton',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: '1e051b37cf3043eda623dd2928d6d0a3',
                    name: 'DefaultLocale',
                    objectType: 'Locale',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'e75a89564d0249bab0cf747b7a9f350d',
                    name: 'Locales',
                    objectType: 'Locale',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                },
                {
                    id: '3a12d79840c340e0ba9f9d01b1e39e89',
                    name: 'Guest',
                    objectType: 'User',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: '1e051b37cf3043eda623dd2928d6d0a3',
                    isRequired: false
                },
                {
                    id: 'e75a89564d0249bab0cf747b7a9f350d',
                    isRequired: false
                },
                {
                    id: '3a12d79840c340e0ba9f9d01b1e39e89',
                    isRequired: false
                }
            ],
        }, {
            id: '60065f5da3c24418880d1026ab607319',
            name: 'UserGroup',
            interfaces: [
                'UniquelyIdentifiable',
            ],
            concreteRoleTypes: [
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    isRequired: true
                }
            ],
        }, {
            id: '73dcdc6875714ed186db77c914fe2f62',
            name: 'Notification',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: '3ee1975d50194043be5f65331ef58787',
                    name: 'Confirmed',
                    objectType: 'Boolean',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: '84813900abe04c24bd2e5b0d6be5ab6c',
                    name: 'Title',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: 'a6f6ed43b0ab462f9be9fad58d2e8398',
                    name: 'Description',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'd100a845df654f0696b8dcaeb9c3e205',
                    name: 'DateCreated',
                    objectType: 'DateTime',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                }
            ],
            concreteRoleTypes: [
                {
                    id: '3ee1975d50194043be5f65331ef58787',
                    isRequired: true
                },
                {
                    id: '84813900abe04c24bd2e5b0d6be5ab6c',
                    isRequired: true
                },
                {
                    id: 'a6f6ed43b0ab462f9be9fad58d2e8398',
                    isRequired: false
                },
                {
                    id: 'd100a845df654f0696b8dcaeb9c3e205',
                    isRequired: true
                }
            ],
            associationTypes: [
                {
                    id: '2d41d7efd107404fac9dfb81105d3ff7',
                    name: 'NotificationListWhereUnconfirmedNotification',
                }
            ],
        }, {
            id: 'b65799934ff14853b0481f8e67419c00',
            name: 'NotificationList',
            interfaces: [
                'Deletable',
            ],
            exclusiveRoleTypes: [
                {
                    id: 'fc089f2ea62540f9bbc0c9fc05e6e599',
                    name: 'UnconfirmedNotifications',
                    objectType: 'Notification',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: 'fc089f2ea62540f9bbc0c9fc05e6e599',
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: 'e678c2f85c664886ad212be98101f759',
                    name: 'UserWhereNotificationList',
                }
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: '4092d0b4c6f44b81b02366be3f4c90bd',
            name: 'TaskAssignment',
            interfaces: [
                'Deletable',
            ],
            exclusiveRoleTypes: [
                {
                    id: '407443f45afa484ebe9788ef19f00b32',
                    name: 'User',
                    objectType: 'User',
                    isUnit: false,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: '0be6c69a1d1c49d08247fa0ff9a8f223',
                    name: 'Task',
                    objectType: 'Task',
                    isUnit: false,
                    isOne: true,
                    isRequired: true
                }
            ],
            concreteRoleTypes: [
                {
                    id: '407443f45afa484ebe9788ef19f00b32',
                    isRequired: true
                },
                {
                    id: '0be6c69a1d1c49d08247fa0ff9a8f223',
                    isRequired: true
                }
            ],
            associationTypes: [
                {
                    id: '7976dbaa9b96401f900ddb76fd45f18f',
                    name: 'TaskListWhereTaskAssignment',
                },
                {
                    id: '63efedc311574ae0b2129169cd0ac418',
                    name: 'TaskListWhereOpenTaskAssignment',
                }
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: '1c2303a1f3ce4084a1adfc25156ac542',
            name: 'TaskList',
            interfaces: [
                'Deletable',
            ],
            exclusiveRoleTypes: [
                {
                    id: '3922d9e8e51844598b520723104456ab',
                    name: 'TaskAssignments',
                    objectType: 'TaskAssignment',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                },
                {
                    id: '4f83aaac7ba14fdc9ddf781559ff3983',
                    name: 'OpenTaskAssignments',
                    objectType: 'TaskAssignment',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                },
                {
                    id: 'ef37d700cfa6499895019d09bb9ac1d8',
                    name: 'Count',
                    objectType: 'Integer',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: '3922d9e8e51844598b520723104456ab',
                    isRequired: false
                },
                {
                    id: '4f83aaac7ba14fdc9ddf781559ff3983',
                    isRequired: false
                },
                {
                    id: 'ef37d700cfa6499895019d09bb9ac1d8',
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: '3d05bc18c205424aab26fec24eafbd78',
                    name: 'UserWhereTaskList',
                }
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: '7041c691d89646288f501c24f5d03414',
            name: 'C1',
            interfaces: [
                'I1',
            ],
            exclusiveRoleTypes: [
                {
                    id: 'e5cd692cab974cf89f8a1de733526e74',
                    name: 'C1AllorsBinary',
                    objectType: 'Binary',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '6dc9892587a74959809590eedef0e9a0',
                    name: 'C1AllorsString',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '3d121ffa0ff546279ec3879c2830ff04',
                    name: 'C1C1One2Manies',
                    objectType: 'C1',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                },
                {
                    id: '40ee290825564bdfa82f2ea33e181b91',
                    name: 'C1C1One2One',
                    objectType: 'C1',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: 'e5cd692cab974cf89f8a1de733526e74',
                    isRequired: false
                },
                {
                    id: '6dc9892587a74959809590eedef0e9a0',
                    isRequired: false
                },
                {
                    id: '3d121ffa0ff546279ec3879c2830ff04',
                    isRequired: false
                },
                {
                    id: '40ee290825564bdfa82f2ea33e181b91',
                    isRequired: false
                },
                {
                    id: 'fec573a75ab34f309b507d720b4af4b4',
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: 'd595765b5e6746f2b19cc58563dd1ae0',
                    name: 'C1WhereC1C1One2Many',
                },
                {
                    id: '2276c942dd9641a6b52fcd3862c4692f',
                    name: 'C1WhereC1C1One2One',
                }
            ],
            exclusiveMethodTypes: [
                {
                    id: '09a6a387a1b54038b0743a01c81cbda2',
                    name: 'ClassMethod',
                }
            ],
            concreteMethodTypes: [
                {
                    id: '09a6a387a1b54038b0743a01c81cbda2'
                }
            ]
        }, {
            id: '0cb8d2a74566432f9882893b05a77f44',
            name: 'Dependent',
            interfaces: [
                'Deletable',
            ],
            concreteMethodTypes: [
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: '270f0dc81bc24a42961745e93d5403c8',
            name: 'Gender',
            interfaces: [
                'Enumeration',
                'UniquelyIdentifiable',
            ],
            concreteRoleTypes: [
                {
                    id: '919fdad7830e4b12b23cf433951236af',
                    isRequired: false
                },
                {
                    id: '5850860dc772402f815b7634c9a1e697',
                    isRequired: true
                },
                {
                    id: '0c6faf5aeac9454cbd533b8409e56d34',
                    isRequired: true
                },
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    isRequired: true
                }
            ],
        }, {
            id: '94be493877c1488fb1166d4daeffcc8d',
            name: 'Order',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: 'dab0e0a8712b4278b63592d367f4d41a',
                    name: 'CurrentVersion',
                    objectType: 'OrderVersion',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'bf30924398e3457da3963e6bcb06de6a',
                    name: 'AllVersions',
                    objectType: 'OrderVersion',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: 'dab0e0a8712b4278b63592d367f4d41a',
                    isRequired: false
                },
                {
                    id: 'bf30924398e3457da3963e6bcb06de6a',
                    isRequired: false
                }
            ],
        }, {
            id: '721008c3c87c40ab966b094e1271ed5f',
            name: 'OrderLine',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: '7663b87df17d4822a358546124622073',
                    name: 'CurrentVersion',
                    objectType: 'OrderLineVersion',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '03585bb0e87e474f8a760644d5c858f4',
                    name: 'AllVersions',
                    objectType: 'OrderLineVersion',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: '7663b87df17d4822a358546124622073',
                    isRequired: false
                },
                {
                    id: '03585bb0e87e474f8a760644d5c858f4',
                    isRequired: false
                }
            ],
        }, {
            id: 'ba589be8049b41079e20fbfec19477c4',
            name: 'OrderLineVersion',
            interfaces: [
                'Version',
            ],
            concreteRoleTypes: [
                {
                    id: 'b38c700c7ad949629f5335b8aef22e09',
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: '8b5ce9919cc04419b5a7e2803f888a8e',
                    name: 'OrderLineWhereCurrentVersion',
                },
                {
                    id: '2ea46390f69f436dbccc84bef6cd5997',
                    name: 'OrderLineWhereAllVersion',
                }
            ],
        }, {
            id: '07e8f8455ecc4b4283efbb86e6b10a69',
            name: 'PaymentState',
            interfaces: [
                'ObjectState',
                'UniquelyIdentifiable',
            ],
            concreteRoleTypes: [
                {
                    id: '945cbba64b094b87931e861b147c3823',
                    isRequired: false
                },
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    isRequired: true
                }
            ],
        }, {
            id: 'ce56a6e98e4b4f408676180f4b0513e2',
            name: 'ShipmentState',
            interfaces: [
                'ObjectState',
                'UniquelyIdentifiable',
            ],
            concreteRoleTypes: [
                {
                    id: '945cbba64b094b87931e861b147c3823',
                    isRequired: false
                },
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    isRequired: true
                }
            ],
        }, {
            id: '849393edcff640da9b4d483f045f2e99',
            name: 'OrderState',
            interfaces: [
                'ObjectState',
                'UniquelyIdentifiable',
            ],
            concreteRoleTypes: [
                {
                    id: '945cbba64b094b87931e861b147c3823',
                    isRequired: false
                },
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    isRequired: true
                }
            ],
        }, {
            id: '6a3a91679a77491ea1c8ccfe4572afb4',
            name: 'OrderVersion',
            interfaces: [
                'Version',
            ],
            concreteRoleTypes: [
                {
                    id: 'b38c700c7ad949629f5335b8aef22e09',
                    isRequired: false
                }
            ],
            associationTypes: [
                {
                    id: '7fd5847365794269a4a1d1bfae6b3542',
                    name: 'OrderWhereCurrentVersion',
                },
                {
                    id: '08a5541157f64015858dbe9177328319',
                    name: 'OrderWhereAllVersion',
                }
            ],
        }, {
            id: '3a5dcec7308f48c7afee35d38415aa0b',
            name: 'Organisation',
            interfaces: [
                'Deletable',
                'UniquelyIdentifiable',
            ],
            exclusiveRoleTypes: [
                {
                    id: 'b95c7b34a295460082c8826cc2186a00',
                    name: 'Employees',
                    objectType: 'Person',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                },
                {
                    id: '19de0627fb1c4f559b6531d8008d0a48',
                    name: 'Manager',
                    objectType: 'Person',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'baa3055779ff406db3749d32519b2de7',
                    name: 'Name',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: true
                },
                {
                    id: '58d7df91fbc54bcb9398a9957949402b',
                    name: 'Owner',
                    objectType: 'Person',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '45bef644dfcf417a93563c1cfbcada1b',
                    name: 'Shareholders',
                    objectType: 'Person',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                },
                {
                    id: '9033ae7383f645299f8184fd9d35d597',
                    name: 'CycleOne',
                    objectType: 'Person',
                    isUnit: false,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'e01ace3c2314477c899714266d9711e0',
                    name: 'CycleMany',
                    objectType: 'Person',
                    isUnit: false,
                    isOne: false,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: 'b95c7b34a295460082c8826cc2186a00',
                    isRequired: false
                },
                {
                    id: '19de0627fb1c4f559b6531d8008d0a48',
                    isRequired: false
                },
                {
                    id: 'baa3055779ff406db3749d32519b2de7',
                    isRequired: true
                },
                {
                    id: '58d7df91fbc54bcb9398a9957949402b',
                    isRequired: false
                },
                {
                    id: '45bef644dfcf417a93563c1cfbcada1b',
                    isRequired: false
                },
                {
                    id: '9033ae7383f645299f8184fd9d35d597',
                    isRequired: false
                },
                {
                    id: 'e01ace3c2314477c899714266d9711e0',
                    isRequired: false
                },
                {
                    id: 'd73fd9a413ee4fa98925d93eca328bf6',
                    isRequired: true
                }
            ],
            associationTypes: [
                {
                    id: 'dec66a7b56f54010a2e737e25124bc77',
                    name: 'PeopleWhereCycleOne',
                },
                {
                    id: 'faa1e59e29ee4e10bfe194bfbcf238ea',
                    name: 'PeopleWhereCycleMany',
                }
            ],
            exclusiveMethodTypes: [
                {
                    id: '1869873ff2f04d03a0f97dc73491c117',
                    name: 'JustDoIt',
                }
            ],
            concreteMethodTypes: [
                {
                    id: '1869873ff2f04d03a0f97dc73491c117'
                },
                {
                    id: '430702d2e02b45ad9b22b8331dc75a3f'
                }
            ]
        }, {
            id: '4e501cd6807c4f10b60bacd1d80042cd',
            name: 'UnitSample',
            interfaces: [],
            exclusiveRoleTypes: [
                {
                    id: '4d4428fcbac047afab5e7c7b87880206',
                    name: 'AllorsBinary',
                    objectType: 'Binary',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'a462ce40588548c6b3277e4c096a99fa',
                    name: 'AllorsDateTime',
                    objectType: 'DateTime',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'b5dd13eb89234a6694dfaf5fadb42f1c',
                    name: 'AllorsBoolean',
                    objectType: 'Boolean',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '4a95fb0d6849499ea1406c942fb06f4d',
                    name: 'AllorsDouble',
                    objectType: 'Float',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '07070cb06e654a00875450cf594ed9e1',
                    name: 'AllorsInteger',
                    objectType: 'Integer',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: 'f27c150ace8d4ff39507ccb0b91aa0c2',
                    name: 'AllorsString',
                    objectType: 'String',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '25dd4abfc6da4739aed08528d1c00b8b',
                    name: 'AllorsUnique',
                    objectType: 'Unique',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                },
                {
                    id: '1408cd42312548c786d74a5f71e75e25',
                    name: 'AllorsDecimal',
                    objectType: 'Decimal',
                    isUnit: true,
                    isOne: true,
                    isRequired: false
                }
            ],
            concreteRoleTypes: [
                {
                    id: '4d4428fcbac047afab5e7c7b87880206',
                    isRequired: false
                },
                {
                    id: 'a462ce40588548c6b3277e4c096a99fa',
                    isRequired: false
                },
                {
                    id: 'b5dd13eb89234a6694dfaf5fadb42f1c',
                    isRequired: false
                },
                {
                    id: '4a95fb0d6849499ea1406c942fb06f4d',
                    isRequired: false
                },
                {
                    id: '07070cb06e654a00875450cf594ed9e1',
                    isRequired: false
                },
                {
                    id: 'f27c150ace8d4ff39507ccb0b91aa0c2',
                    isRequired: false
                },
                {
                    id: '25dd4abfc6da4739aed08528d1c00b8b',
                    isRequired: false
                },
                {
                    id: '1408cd42312548c786d74a5f71e75e25',
                    isRequired: false
                }
            ],
        },
    ]
};
//# sourceMappingURL=index.js.map