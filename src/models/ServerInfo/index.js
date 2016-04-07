import {
  sortable,
  readonly,
  datetime,
  Resource,
} from '../types';

const ServerInfo = new Resource({
  resourceId: 'ServerInfo',
  title: 'ServerInfo',
  description: 'Collection of ServerInfo data',
  showFields: [
    'InfoID',
    'FEServerLists',
    'SocketServerLists',
    'Version',

    // 'HideYN',
    // 'DeleteYN',
    'CreatedAt',
    // 'UpdatedAt',
  ],
  primaryKey: 'InfoID',
  searchFields: [
    'InfoID',
  ],
  fieldGroup: [
  ],
  schema: {
    InfoID: {
      readonly,
    },
    FEServerLists: {},
    SocketServerLists: {},
    Version: {},
    ResourceLink: {},
    EULAText: {},
    sCol1: {},
    sCol2: {},
    sCol3: {},
    sCol4: {},
    sCol5: {},
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

export default ServerInfo;
