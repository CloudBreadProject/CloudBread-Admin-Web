import React, { Component, PropTypes } from 'react';

import styles from './InspectorSearch.scss';

import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import SyncIcon from 'material-ui/lib/svg-icons/notification/sync';

class InspectorSearch extends Component {
  static propTypes = {
    isWorking: PropTypes.bool,
    value: PropTypes.string,
    typingWatchTime: PropTypes.number,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onDoneTyping: PropTypes.func,
  };

  static defaultProps = {
    typingWatchTime: 350,
  };

  constructor() {
    super();
    this.handleBlurInput = this.handleBlurInput.bind(this);
    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleDoneTyping = this.handleDoneTyping.bind(this);
    this.handleFocusInput = this.handleFocusInput.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    const { searchInput } = this.refs;

    if (value) {
      searchInput.value = value;
    }
  }

  render() {
    return (
      <div className={styles.InspectorSearch}>
        {this.renderSearchState()}
        <input
          type="text"
          className={styles.SearchInput}
          placeholder="Search"
          ref="searchInput"
          onFocus={this.handleFocusInput}
          onBlur={this.handleBlurInput}
          onChange={this.handleChangeInput}
        />
      </div>
    );
  }

  renderSearchState() {
    const isWorking = this.props.isWorking;
    return (
      <div className={styles.SearchState}>
        <div
          style={{
            display: isWorking ? 'block' : 'none',
          }}
        >
          <SyncIcon className={styles.SearchStateWorking} />
        </div>
        <div
          style={{
            display: isWorking ? 'none' : 'block',
          }}
        >
          <SearchIcon />
        </div>
        </div>
    );
  }

  handleBlurInput(event) {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }
  }

  handleChangeInput(event) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event);
    }

    const { watcherTyping } = this.state || {};
    if (watcherTyping) {
      clearTimeout(watcherTyping);
    }
    const { searchInput } = this.refs;
    if (searchInput.value) {
      this.setState({
        watcherTyping: setTimeout(this.handleDoneTyping, this.props.typingWatchTime),
      });
    }
  }

  handleDoneTyping() {
    const { onDoneTyping } = this.props;
    if (onDoneTyping) {
      onDoneTyping();
    }
    this.setState({
      watcherTyping: null,
    });
  }

  handleFocusInput(event) {
    const { onFocus } = this.props;
    if (onFocus) {
      onFocus(event);
    }
  }
}

export default InspectorSearch;
