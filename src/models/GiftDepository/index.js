import {
  sortable,
  readonly,
  boolean,
  datetime,
  Resource,
} from '../types';

const GiftDepository = new Resource({
  resourceId: 'GiftDepository',
  title: 'GiftDepository',
  description: 'Collection of GiftDepository data',
  showFields: [
    'GiftDepositoryID',
    'ItemListID',
    'ItemCount',
    'FromMemberID',
    'ToMemberID',
    // 'HideYN',
    // 'DeleteYN',
    'CreatedAt',
    // 'UpdatedAt',
  ],
  primaryKey: 'GiftDepositoryID',
  searchFields: [
    'GiftDepositoryID',
    'ItemListID',
    'FromMemberID',
    'ToMemberID',
  ],
  fieldGroup: [],
  createFieldGroup: [],
  schema: {
    GiftDepositoryID: {
      readonly,
    },
    ItemListID: {
      readonly,
    },
    ItemCount: {},
    FromMemberID: {
      readonly,
    },
    ToMemberID: {
      readonly,
    },
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
    SentMemberYN: {
      boolean,
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
    GiftDepositoryID: {},
    ItemListID: {},
    ItemCount: {},
    FromMemberID: {},
    ToMemberID: {},
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
    SentMemberYN: {
      boolean,
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
  },
});

export default GiftDepository;
