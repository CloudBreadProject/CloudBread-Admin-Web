import {
  sortable,
  readonly,
  boolean,
  datetime,
  Resource,
} from '../types';

const CouponMember = new Resource({
  resourceId: 'CouponMember',
  title: 'CouponMember',
  description: 'Collection of CouponMember data',
  showFields: [
	'CouponMemberID',
	'CouponID',
	'MemberID',
	// 'HideYN',
	// 'DeleteYN',
	'CreatedAt',
	// 'UpdatedAt',
  ],
  primaryKey: 'CouponMemberID',
  searchFields: [
	'CouponMemberID',
	'CouponID',
	'MemberID',
  ],
  fieldGroup: [
    
  ],
  schema: {
	CouponMemberID: {
		readonly,
	},
	CouponID: {
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

export default CouponMember;
