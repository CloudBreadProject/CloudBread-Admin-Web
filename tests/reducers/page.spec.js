import {
  LOAD_PAGE_LOADING,
  LOAD_PAGE_ERROR,
  LOAD_PAGE_SUCCESS,
  UNLOAD_PAGE,
} from 'constants/page';

import reducer, { initialState } from 'reducers/page';

describe('page reducer', () => {
  it('returns initial state', () => {
    expect(reducer()).to.equal(initialState);
  });

  it('handles LOAD_PAGE_LOADING', () => {
    const action = {
      type: LOAD_PAGE_LOADING,
    };
    expect(reducer(null, action)).to.eql({
      ...initialState,
      isLoading: true,
    });
  });

  it('handles LOAD_PAGE_SUCCESS', () => {
    const action = {
      type: LOAD_PAGE_SUCCESS,
      content: 'content',
      title: 'title',
    };
    const state = reducer(initialState, {
      type: LOAD_PAGE_LOADING,
    });
    expect(reducer(state, action)).to.eql({
      ...initialState,
      isLoading: false,
      content: 'content',
      title: 'title',
    });
  });

  it('handles LOAD_PAGE_ERROR', () => {
    const error = 'error reference';
    const action = {
      type: LOAD_PAGE_ERROR,
      error,
    };
    const state = reducer(initialState, {
      type: LOAD_PAGE_LOADING,
    });
    expect(reducer(state, action)).to.eql({
      ...initialState,
      isLoading: false,
      error,
    });
  });

  it('handles UNLOAD_PAGE', () => {
    const action = {
      type: UNLOAD_PAGE,
    };
    let state;
    state = reducer(initialState, {
      type: LOAD_PAGE_SUCCESS,
      title: 'some title',
      content: 'some content',
    });
    expect(reducer(state, action)).to.eql(initialState);
    state = reducer(initialState, {
      type: LOAD_PAGE_ERROR,
      error: 'some errors',
    });
    expect(reducer(state, action)).to.eql(initialState);
  });
});
