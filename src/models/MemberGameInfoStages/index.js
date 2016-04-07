import {
  sortable,
  readonly,
  boolean,
  datetime,
  Resource,
} from '../types';

const MemberGameInfoStages = new Resource({
  resourceId: 'MemberGameInfoStages',
  title: 'MemberGameInfoStages',
  description: 'Collection of MemberGameInfoStages data',
  showFields: [
	'MemberGameInfoStageID',
	'MemberID',
	'StageName',
	'StageStatus',
	'Category1',
	'Category2',
	'Category3',
	'Points',
	// 'HideYN',
	// 'DeleteYN',
	'CreatedAt',
	// 'UpdatedAt',
  ],
  primaryKey: 'MemberGameInfoStageID',
  searchFields: [
	'MemberGameInfoStageID',
	'MemberID',
	'StageName',
	'Category1',
  ],
  fieldGroup: [
    
  ],
  schema: {
	MemberGameInfoStageID: {
		readonly,
	},
	MemberID: {
		readonly,
	},
	StageName: {},
	StageStatus: {},
	Category1: {},
	Category2: {},
	Category3: {},
	Mission1: {},
	Mission2: {},
	Mission3: {},
	Mission4: {},
	Mission5: {},
	Points: {},
	StageStat1: {},
	StageStat2: {},
	StageStat3: {},
	StageStat4: {},
	StageStat5: {},
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

export default MemberGameInfoStages;
