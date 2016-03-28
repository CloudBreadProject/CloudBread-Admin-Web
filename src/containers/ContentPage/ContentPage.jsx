import React, { Component, PropTypes } from 'react';
import styles from './ContentPage.scss';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadPage, unloadPage } from 'actions/page';
import { showLoading, hideLoading } from 'actions/display';

import Helmet from 'react-helmet';

function mapStateToProps(state) {
  return {
    content: state.page.content,
    title: state.page.title,
    error: state.page.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPage,
    unloadPage,
    showLoading,
    hideLoading,
  }, dispatch);
}

class ContentPage extends Component {
  static needs = [
    loadPage,
  ];

  static propTypes = {
    content: PropTypes.string,
    title: PropTypes.string,
    error: PropTypes.string,
    loadPage: PropTypes.func,
    params: PropTypes.object,
    unloadPage: PropTypes.func,

    // display loading
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
  };

  componentDidMount() {
    if (!this.props.content && !this.props.error) {
      this.props.loadPage(this.props.params);
    }
  }

  async componentWillUpdate(nextProps) {
    const newPageId = nextProps.params.pageId;
    const oldPageId = this.props.params.pageId;

    if ((oldPageId !== newPageId)) {
      this.props.showLoading();
      await this.props.loadPage(nextProps.params);
      this.props.hideLoading();
    }
  }

  componentWillUnmount() {
    this.props.unloadPage();
  }

  render() {
    const { content, title, error } = this.props;

    if (error) {
      return (
        <div className={styles.ContentPage}>
          <Helmet title="Failed to fetch content" />
          <p>Failed to fetch pages, checkout network status</p>
        </div>
      );
    }

    return (
      <div>
        <Helmet title={title} />
        <div
          className={styles.ContentPage}
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
