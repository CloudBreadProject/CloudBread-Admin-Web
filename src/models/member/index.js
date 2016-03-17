import {
  sortable,
  readonly,
  boolean,
  Resource,
} from '../types';

const Members = new Resource({
  resourceId: 'Members',
  title: 'Member',
  description: 'Collection of member data',
  showFields: [
    'MemberID',
    'EmailAddress',
    'Name1',
    'MemberGroup',
    'LastDeviceID',
    // '3rdAuthID',
    'PushNotificationID',
    // 'HideYN',
    // 'DeleteYN',
    'CreatedAt',
    // 'UpdatedAt',
  ],
  primaryKey: 'MemberID',
  fieldGroup: [
    {
      name: 'Credentials',
      description: 'can identifier user',
      fields: [
        'MemberID',
        'MemberPWD',
      ],
    }, {
      name: 'Email',
      description: 'can confirm user',
      fields: [
        'EmailAddress',
        'EmailConfirmedYN',
      ],
    }, {
      name: 'Privates',
      description: 'can save personal information',
      fields: [
        'PhoneNumber1',
        'PhoneNumber2',
        'Name1',
        'Name2',
        'Name3',
      ],
    }, {
      name: 'Access',
      fields: [
        'LastDeviceID',
        'LastIPaddress',
        'LastLoginDT',
        'LastLogoutDT',
        'LastMACAddress',
      ],
    }, {
      name: 'Block',
      fields: [
        'AccountBlockEndDT',
        'AccountBlockYN',
      ],
    }, {
      name: '3rd Party Authentication',
      fields: [
        '3rdAuthID',
        '3rdAuthProvider',
        '3rdAuthParam',
      ],
    }, {
      name: 'Push Notification',
      fields: [
        'PushNotificationID',
        'PushNotificationGroup',
        'PushNotificationProvider',
      ],
    }, {
      name: 'Extra Data',
      fields: [
        'sCol1', 'sCol2', 'sCol3',
        'sCol4', 'sCol5', 'sCol6',
        'sCol7', 'sCol8', 'sCol9',
        'sCol10',
      ],
    }, {
      name: 'Date and Time',
      fields: [
        'TimeZoneID',
        'CreatedAt',
        'UpdatedAt',
        'DataFromRegion',
        'DataFromRegionDT',
      ],
    }, {
      name: 'Current Status',
      fields: [
        'AnonymousYN',
        'HideYN',
        'DeleteYN',
      ],
    },
  ],
  schema: {
    MemberID: {
      description: 'User identifier',
      readonly,
    },
    MemberPWD: {
      description: 'User password',
    },
    EmailAddress: {
      description: 'User email address',
    },
    EmailConfirmedYN: {
      description: 'Is User confirmed via email?',
      boolean,
    },
    PhoneNumber1: {},
    PhoneNumber2: {},
    PINumber: {},
    Name1: {},
    Name2: {},
    Name3: {},
    DOB: {},
    RecommenderID: {},
    MemberGroup: {},
    LastDeviceID: {},
    LastIPaddress: {},
    LastLoginDT: {},
    LastLogoutDT: {},
    LastMACAddress: {},
    AccountBlockYN: {
      boolean,
    },
    AccountBlockEndDT: {},
    AnonymousYN: {
      boolean,
    },
    '3rdAuthProvider': {},
    '3rdAuthID': {},
    '3rdAuthParam': {},
    PushNotificationID: {},
    PushNotificationProvider: {},
    PushNotificationGroup: {},
    sCol1: {},
    sCol2: {},
    sCol3: {},
    sCol4: {},
    sCol5: {},
    sCol6: {},
    sCol7: {},
    sCol8: {},
    sCol9: {},
    sCol10: {},
    TimeZoneID: {},
    HideYN: {
      boolean,
    },
    DeleteYN: {
      boolean,
    },
    CreatedAt: {
      readonly,
      sortable,
    },
    UpdatedAt: {
      readonly,
    },
    DataFromRegion: {
      readonly,
    },
    DataFromRegionDT: {
      readonly,
    },
  },
});

export default Members;
