import {
  sortable,
  readonly,
  boolean,
  datetime,
  Resource,
} from '../types';

const GameEventMember = new Resource({
  resourceId: 'GameEventMember',
  title: 'GameEventMember',
  description: 'Collection of GameEventMember data',
  showFields: [
	'GameEventMemberID',
	'eventID',
	'MemberID',
	// 'HideYN',
	// 'DeleteYN',
	'CreatedAt',
	// 'UpdatedAt',
  ],
  primaryKey: 'GameEventMemberID',
  searchFields: [
	'GameEventMemberID',
	'eventID',
	'MemberID',
  ],
  fieldGroup: [
  ],
  schema: {
	GameEventMemberID: {
		readonly,
	},
	eventID: {
		readonly,
	},
	MemberID: {
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

export default GameEventMember;
