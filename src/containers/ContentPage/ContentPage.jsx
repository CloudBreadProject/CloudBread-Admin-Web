import React, { Component } from 'react';
import styles from './ContentPage.scss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadPage, unloadPage } from 'modules/page';
import { canUseDOM } from 'lib/env';
import { setTitle } from 'lib/context';
import Loading from 'components/Loading';

function mapStateToProps(state) {
  return {
    content: state.page.content,
    title: state.page.title,
    isLoading: state.page.isLoading,
    error: state.page.error,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadPage,
    unloadPage,
  }, dispatch);
}

class ContentPage extends Component {
  static needs = [
    loadPage,
  ];

  componentWillMount() {
    if (!this.props.content && !this.props.error) {
      this.props.loadPage(this.props.params);
    }
  }

  async componentWillUpdate(nextProps) {
    const newPageId = nextProps.params.pageId;
    const oldPageId = this.props.params.pageId;

    if ((oldPageId !== newPageId)) {
      await this.props.loadPage(nextProps.params);
    }
  }

  componentWillUnmount() {
    this.props.unloadPage();
  }

  render() {
    const { content, title, isLoading, error } = this.props;
    setTitle(title);

    return (
      <div>
        <div className={styles.ContentPage} dangerouslySetInnerHTML={{__html: content || error}} />
        <Loading show={isLoading} />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPage);
