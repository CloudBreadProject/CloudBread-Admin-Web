import React, { Component, PropTypes } from 'react';

import styles from './InspectorSearch.scss';
import cx from 'classnames';

import IconButton from 'material-ui/lib/icon-button';
import SearchIcon from 'material-ui/lib/svg-icons/action/search';
import CloseIcon from 'material-ui/lib/svg-icons/navigation/close';
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
    this.handleClickRemove = this.handleClickRemove.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    const { searchInput } = this.refs;

    if (value) {
      searchInput.value = value;
    }
  }

  render() {
    const { hasValue } = this.state || {};
    const { isWorking } = this.props;
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
        <IconButton
          className={styles.SearchUtil}
          onClick={this.handleClickRemove}
          style={{
            border: '0px',
            width: 'auto',
            height: 'auto',
            padding: '6px',
            opacity: hasValue && !isWorking ? 1 : 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </div>
    );
  }

  renderSearchState() {
    const isWorking = this.props.isWorking;
    if (isWorking) {
      return (
        <SyncIcon className={cx(styles.SearchState, styles.SearchStateWorking)} />
      );
    }
    return <SearchIcon className={styles.SearchState} />;
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
        hasValue: true,
        watcherTyping: setTimeout(this.handleDoneTyping, this.props.typingWatchTime),
      });
    } else {
      this.setState({
        hasValue: false,
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

  handleClickRemove() {
    const { searchInput } = this.refs;
    searchInput.value = '';
    this.setState({
      hasValue: false,
    });
  }
}

export default InspectorSearch;
