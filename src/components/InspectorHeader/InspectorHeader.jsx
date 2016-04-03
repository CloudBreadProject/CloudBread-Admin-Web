import React, { Component, PropTypes } from 'react';
import styles from './InspectorHeader.scss';
import cx from 'classnames';
import { queryToObject } from 'core/util';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { showSnackbarMessage } from 'actions/display';
import { loadResources } from 'actions/resource';

import Link from 'react-router/lib/Link';

import FlatButton from 'material-ui/lib/flat-button';
import IconButton from 'material-ui/lib/icon-button';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import Search from 'material-ui/lib/svg-icons/action/search';
import Clear from 'material-ui/lib/svg-icons/content/clear';

function mapStateToProps({ editor, finder, display }) {
  const {
    isFinding,
    searchFields,
    resourceId,

    search, field,
    toDate, fromDate,
    sort,
  } = finder;

  return {
    // finder
    searchFields,
    resourceId,
    isEditingResource: editor.isEditing,
    isFindingResource: isFinding,
    isFinderLoaded: finder.isLoaded,

    // finder search
    search, field,
    toDate, fromDate,
    sort,

    // loading display
    isLoading: display.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    showSnackbarMessage,
    loadResources,
  }, dispatch);
}

class InspectorHeader extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    // user's typing delay time
    typeDelay: PropTypes.number,
    showSnackbarMessage: PropTypes.func,

    // resource status
    isEditingResource: PropTypes.bool,
    isFindingResource: PropTypes.bool,
    isLoading: PropTypes.bool,
    searchFields: PropTypes.array,
    resourceId: PropTypes.string,
    loadResources: PropTypes.func,
    isFinderLoaded: PropTypes.bool,

    // search relate props
    search: PropTypes.string,
    field: PropTypes.string,
    sort: PropTypes.string,
    toDate: PropTypes.string,
    fromDate: PropTypes.string,
  };

  static defaultProps = {
    searchFields: [],
    typeDelay: 400,
  };

  constructor() {
    super();
    this.renderLeftNav = this.renderLeftNav.bind(this);
    this.renderRightNav = this.renderRightNav.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleChangeToDate = this.handleChangeToDate.bind(this);
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
    this.handleChangeSort = this.handleChangeSort.bind(this);
    this.handleChangeSearchField = this.handleChangeSearchField.bind(this);
    this.handleChangeSearchWord = this.handleChangeSearchWord.bind(this);
    this.handleDoneTypingSearchWord = this.handleDoneTypingSearchWord.bind(this);
    this.handleTapClearToDate = this.handleTapClearToDate.bind(this);
    this.handleTapClearFromDate = this.handleTapClearFromDate.bind(this);
  }

  async componentWillMount() {
    // sync search UI with props
    const {
      search, field,
      toDate, fromDate,
      sort,
      searchFields,
    } = this.props;
    await this.setState({
      search,
      searchField: field ? searchFields.indexOf(field) + 1 : 1,
      toDate: toDate ? new Date(toDate) : undefined,
      fromDate: fromDate ? new Date(fromDate) : undefined,
      sort: (sort || '').split('desc').length === 1 ? 1 : 2,
    });
  }

  async componentWillReceiveProps(nextProps) {
    const {
      isFindingResource,
      isEditingResource,
    } = nextProps;

    await this.setState({
      isActivated: isFindingResource || isEditingResource,
    });
  }

  render() {
    const {
      isActivated,
    } = this.state || {};
    return (
      <div
        className={cx({
          [styles.InspectorHeader]: true,
          [styles.Activated]: isActivated,
        })}
      >
        <div className={styles.Wrapper}>
          <div className={styles.Side}>
            {this.renderLeftNav()}
          </div>
          <div className={styles.Content}>
            {this.renderContent()}
          </div>
          <div className={cx(styles.Side, styles.Right)}>
            {this.renderRightNav()}
          </div>
        </div>
      </div>
    );
  }

  renderLeftNav() {
    const {
      isLoading,
      isEditingResource,
    } = this.props;
    if (isEditingResource) {
      return (
        <div>
          <FlatButton
            icon={<ArrowBack />}
            label="Back"
            labelStyle={{
              color: '#fff',
              fontSize: '24px',
              fontWeight: 400,
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
            style={{
              color: '#fff',
              fill: '#fff',
            }}
            disabled={isLoading}
            onClick={this.handleClickBack}
          />
        </div>
      );
    }
    return (
      <Link to="/" className={styles.Title}>
        Inspector
      </Link>
    );
  }

  renderRightNav() {
    return (
      <div />
    );
  }

  renderContent() {
    const { isFindingResource, isFinderLoaded } = this.props;

    const { searchFields } = this.props;
    const {
      searchField,
      sort,
      toDate, fromDate,
    } = this.state || {};
    const finderNode = (
      <div
        className={styles.Finder}
        style={{
          display: isFindingResource && isFinderLoaded ? 'flex' : 'none',
        }}
      >
        <div className={styles.FinderSearch}>
          <div className={styles.FinderSearchIcon}>
            <Search color="#ffffff" />
          </div>
          <div className={styles.FinderSearchField}>
            <SelectField
              value={searchField || 1}
              labelStyle={{
                color: '#fff',
              }}
              style={{
                width: '100%',
              }}
              autoWidth
              onChange={this.handleChangeSearchField}
            >
              {searchFields.map(this.renderSearchFields)}
            </SelectField>
          </div>
          <div className={styles.FinderSearchInput}>
            <TextField
              fullWidth
              hintText="Search"
              inputStyle={{
                color: '#ffffff',
              }}
              underlineFocusStyle={{
                borderColor: '#ffffff',
              }}
              hintStyle={{
                color: 'rgba(255, 255, 255, 0.4)',
              }}
              onChange={this.handleChangeSearchWord}
            />
          </div>
        </div>
        <div className={styles.FinderSort}>
          <SelectField
            value={sort || 1}
            labelStyle={{
              color: '#fff',
            }}
            style={{
              width: 'auto',
            }}
            autoWidth
            onChange={this.handleChangeSort}
          >
            <MenuItem value={1} primaryText="Ascending order" />
            <MenuItem value={2} primaryText="Descending order" />
          </SelectField>
        </div>
        <div className={styles.FinderDateFilter}>
          <div>
            <DatePicker
              hintText="From"
              inputStyle={{
                color: '#ffffff',
                width: 'auto',
              }}
              textFieldStyle={{
                width: '90px',
              }}
              onChange={this.handleChangeFromDate}
              value={fromDate}
              maxDate={toDate}
              className={styles.DatePicker}
              autoWidth
            />
            <IconButton
              style={{
                border: '0px',
                padding: '0px',
                width: '36px',
                height: '36px',
                margin: 'auto',
                opacity: !!fromDate ? 1 : 0,
              }}
              onTouchTap={this.handleTapClearFromDate}
            >
              <Clear color="#fff" />
            </IconButton>
          </div>
          <div>
            <DatePicker
              hintText="To"
              inputStyle={{
                color: '#ffffff',
              }}
              textFieldStyle={{
                width: '90px',
              }}
              onChange={this.handleChangeToDate}
              value={toDate}
              minDate={fromDate}
              className={styles.DatePicker}
            />
            <IconButton
              style={{
                border: '0px',
                padding: '0px',
                width: '36px',
                height: '36px',
                margin: 'auto',
                opacity: !!toDate ? 1 : 0,
              }}
              onTouchTap={this.handleTapClearToDate}
            >
              <Clear color="#fff" />
            </IconButton>
          </div>
        </div>
      </div>
    );

    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {finderNode}
      </div>
    );
  }

  renderSearchFields(field, key) {
    return <MenuItem key={key} value={key + 1} primaryText={field} />;
  }

  async handleChangeToDate(event, date) {
    const toDate = new Date(date);
    await this.setState({
      toDate,
    });
    this.changeLocation({
      toDate: toDate.toISOString(),
    });
    await this.reloadResources();
  }

  async handleChangeFromDate(event, date) {
    const fromDate = new Date(date);
    await this.setState({
      fromDate: new Date(date),
    });
    this.changeLocation({
      fromDate: fromDate.toISOString(),
    });
    await this.reloadResources();
  }

  async handleChangeSearchField(event, value) {
    const { searchFields } = this.props;
    await this.setState({
      searchField: value + 1,
    });
    this.changeLocation({
      field: searchFields[value],
    });
    const { search } = this.state || {};
    if (search) {
      await this.reloadResources();
    }
  }

  async handleChangeSearchWord(event) {
    const { typingSearchWord } = this.state || {};
    if (typingSearchWord) {
      clearTimeout(typingSearchWord);
    }
    const value = event.target.value;
    await this.setState({
      typingSearchWord: setTimeout(() => {
        this.handleDoneTypingSearchWord(value);
      }, this.props.typeDelay),
    });
  }

  async handleDoneTypingSearchWord(search) {
    await this.setState({
      search,
    });
    const { searchField } = this.state || {};
    if (!searchField) {
      await this.setState({
        searchField: 1,
      });
    }
    this.changeLocation({
      search,
    });
    await this.reloadResources();
  }

  async handleChangeSort(event, value) {
    await this.setState({
      sort: value + 1,
    });
    this.changeLocation({
      sort: value === 1 ? 'desc' : 'asc',
    });
    await this.reloadResources();
  }

  async handleTapClearToDate() {
    await this.setState({
      toDate: undefined,
    });
    this.changeLocation({
      toDate: null,
    });
    await this.reloadResources();
  }

  async handleTapClearFromDate() {
    await this.setState({
      fromDate: undefined,
    });
    this.changeLocation({
      fromDate: null,
    });
    await this.reloadResources();
  }

  handleClickBack() {
    this.context.router.goBack();
  }

  async reloadResources() {
    const { resourceId, searchFields } = this.props;
    const {
      searchField, search,
      toDate, fromDate,
      sort,
    } = this.state || {};
    await this.props.loadResources({
      resourceId,
      field: searchField ? searchFields[searchField - 1] : null, search,
      toDate: toDate ? toDate.toISOString() : null,
      fromDate: fromDate ? fromDate.toISOString() : null,
      sort: sort === 2 ? 'CreatedAt desc' : 'CreatedAt asc',
    });
  }

  // append query string to url
  changeLocation(query) {
    const _query = {
      ...queryToObject(window.location.search),
      ...query,
    };
    this.context.router.replace({
      pathname: window.location.pathname,
      query: _query,
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorHeader);
