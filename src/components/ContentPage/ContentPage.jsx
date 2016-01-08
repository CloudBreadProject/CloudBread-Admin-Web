import React, { Component } from 'react';
import styles from './ContentPage.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadPage, loadPageS } from '../../redux/modules/page';
import { canUseDOM } from '../../lib/env';

function mapStateToProps(state) {
  return {
    content: state.page.content,
    loading: state.page.loading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPage,
  }, dispatch);
}

class ContentPage extends Component {
  static needs = [
    loadPageS,
  ];

  componentDidMount() {
    this.loadPage(this.props.params);
  }

  componentWillUpdate(nextProps) {
    this.loadPage(nextProps.params);
  }

  loadPage(nextParams) {
    const newPageId = nextParams.pageId;
    const oldPageId = this.props.params.pageId;

    if (oldPageId !== newPageId) {
      this.props.loadPage(newPageId);
    }
  }

  render() {
    const { content, title } = this.props;

    return (
      <div className={styles.ContentPage} dangerouslySetInnerHTML={{__html: content}} />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
