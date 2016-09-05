import {
  sortable,
  readonly,
  boolean,
  datetime,
  Resource,
} from '../types';

const MemberAccountBlockLog = new Resource({
  resourceId: 'MemberAccountBlockLog',
  title: 'MemberAccountBlockLog',
  description: 'Collection of MemberAccountBlockLog data',
  showFields: [
    'MemberAccountBlockID',
    'MemberID',
    'MemberAccountBlockReasonCategory1',
    'MemberAccountBlockProcess',
    'CreateAdminID',
    // 'HideYN',
    // 'DeleteYN',
    'CreatedAt',
    // 'UpdatedAt',
  ],
  primaryKey: 'MemberAccountBlockID',
  searchFields: [
    'MemberAccountBlockID',
    'MemberID',
    'CreateAdminID',
  ],
  fieldGroup: [],
  createFieldGroup: [],
  schema: {
    MemberAccountBlockID: {
      readonly,
    },
    MemberID: {
      readonly,
    },
    MemberAccountBlockReasonCategory1: {},
    MemberAccountBlockReasonCategory2: {},
    MemberAccountBlockReasonCategory3: {},
    MemberAccountBlockReason: {},
    MemberAccountBlockProcess: {},
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
    CreateAdminID: {
      readonly,
    },
    HideYN: {
      boolean,
    },
    DeleteYN: {
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
  createSchema: {
    MemberAccountBlockID: {},
    MemberID: {},
    MemberAccountBlockReasonCategory1: {},
    MemberAccountBlockReasonCategory2: {},
    MemberAccountBlockReasonCategory3: {},
    MemberAccountBlockReason: {},
    MemberAccountBlockProcess: {},
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
    CreateAdminID: {
      readonly,
    },
    HideYN: {
      boolean,
    },
    DeleteYN: {
      boolean,
    },
    DataFromRegion: {
      readonly,
    },
  }
});

export default MemberAccountBlockLog;
