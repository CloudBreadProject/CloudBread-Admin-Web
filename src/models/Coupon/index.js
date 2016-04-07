import {
  sortable,
  readonly,
  boolean,
  datetime,
  Resource,
} from '../types';

const Coupon = new Resource({
  resourceId: 'Coupon',
  title: 'Coupon',
  description: 'Collection of Coupon data',
  showFields: [
	'CouponID',
	'CouponCategory1',
	'ItemListID',
	'ItemCount',
	//'ItemStatus',
	'TargetGroup',
	'Title',
	// 'HideYN',
	// 'DeleteYN',
	'CreatedAt',
	// 'UpdatedAt',
  ],
  primaryKey: 'CouponID',
  searchFields: [
	'CouponID',
	'ItemListID',
	'Title',
  ],
  fieldGroup: [
    
  ],
  schema: {
	CouponID: {
		readonly,
	},
	CouponCategory1: {},
	CouponCategory2: {},
	CouponCategory3: {},
	ItemListID: {
		readonly,
	},
	ItemCount: {},
	ItemStatus: {},
	TargetGroup: {},
	TargetOS: {},
	TargetDevice: {},
	Title: {},
	Content: {},
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
	CouponDurationFrom: {},
	CouponDurationTo: {},
	OrderNumber: {},
	DupeYN: {
		boolean,
	},
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
});

export default Coupon;
