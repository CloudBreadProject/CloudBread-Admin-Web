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
