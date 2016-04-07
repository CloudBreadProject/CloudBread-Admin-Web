import {
  sortable,
  readonly,
  boolean,
  datetime,
  Resource,
} from '../types';

const AdminMember = new Resource({
  resourceId: 'AdminMember',
  title: 'AdminMember',
  description: 'Collection of AdminMember data',
  showFields: [
    'AdminMemberID',
    'AdminMemberEmail',
    'AdminGroup',
    'TimeZoneID',
    'Name1',
    'DeleteYN',
    // 'HideYN',
    'CreatedAt',
    // 'UpdatedAt'
  ],
  primaryKey: 'AdminMemberID',
  searchFields: [
    'AdminMemberID',
    'AdminMemberEmail',
    'Name1',

  ],
  fieldGroup: [

  ],
  schema: {
    AdminMemberID: {
      description: 'AdminMember identifier',
      readonly,
    },
    AdminMemberPWD: {
      description: 'AdminMember password',
    },
    AdminMemberEmail: {
      description: 'AdminMember email address',
    },
    IDCreateAdminMember: {},
    AdminGroup: {},
    TimeZoneID: {},
    PINumber: {},
    Name1: {},
    Name2: {},
    Name3: {},
    DOB: {},
    LastIPaddress: {},
    LastLoginDT: {},
    LastLogoutDT: {},
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
    DeleteYN: {
      boolean,
    },
    HideYN: {
      boolean,
    },
    CreatedAt: {
      readonly,
      sortable,
      datetime,
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

export default AdminMember;
