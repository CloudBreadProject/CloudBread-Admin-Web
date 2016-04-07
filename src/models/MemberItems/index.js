import {
  sortable,
  readonly,
  boolean,
  datetime,
  Resource,
} from '../types';

const MemberItems = new Resource({
  resourceId: 'MemberItems',
  title: 'MemberItems',
  description: 'Collection of MemberItems data',
  showFields: [
    'MemberItemID',
    'MemberID',
    'ItemListID',
    'ItemCount',
    'ItemStatus',
  // 'HideYN',
  // 'DeleteYN',
    'CreatedAt',
  // 'UpdatedAt',
  ],
  primaryKey: 'MemberItemID',
  searchFields: [
    'MemberItemID',
    'MemberID',
    'ItemListID',
  ],
  fieldGroup: [

  ],
  schema: {
    MemberItemID: {
      readonly,
    },
    MemberID: {},
    ItemListID: {},
    ItemCount: {},
    ItemStatus: {},
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
});

export default MemberItems;
