import fetch from 'lib/fetch';
import {
  LOAD_PAGE_LOADING,
  LOAD_PAGE_ERROR,
  LOAD_PAGE_SUCCESS,
  UNLOAD_PAGE,
} from 'constants/page';

export function unloadPage() {
  return {
    type: UNLOAD_PAGE,
  };
}

export function loadPage({ pageId }) {
  return async (dispatch) => {
    try {
      dispatch({
        type: LOAD_PAGE_LOADING,
      });
      const query = `{ page (path: "${pageId}") { title, content } }`;
      const res = await fetch.get(`/graphql?query=${query}`);
      const { content, title } = res.body.data.page;
      return dispatch({
        type: LOAD_PAGE_SUCCESS,
        content,
        title,
      });
    } catch (error) {
      return dispatch({
        type: LOAD_PAGE_ERROR,
        error: 'Failed to load page',
      });
    }
  };
}
