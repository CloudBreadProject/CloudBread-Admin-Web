import React, { Component, PropTypes } from 'react';
import styles from './InspectorHeader.scss';
import cx from 'classnames';
import { queryToObject } from 'lib/util';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signout } from 'reducers/user';
import { showSnackbarMessage } from 'reducers/display';

import Link from 'react-router/lib/Link';

import IconButton from 'material-ui/lib/icon-button';
import FlatButton from 'material-ui/lib/flat-button';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/select-field';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DatePicker from 'material-ui/lib/date-picker/date-picker';
import ArrowBack from 'material-ui/lib/svg-icons/navigation/arrow-back';
import ExitToApp from 'material-ui/lib/svg-icons/action/exit-to-app';
import Search from 'material-ui/lib/svg-icons/action/search';

import Logo from 'public/logo.png';

function mapStateToProps({ editor, finder, display }) {
  return {
    isEditingResource: editor.isEditing,
    isFindingResource: finder.isFinding,
    isLoading: display.isLoading,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    signout,
    showSnackbarMessage,
  }, dispatch);
}

class InspectorHeader extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    signout: PropTypes.func,
    showSnackbarMessage: PropTypes.func,
    isEditingResource: PropTypes.bool,
    isFindingResource: PropTypes.bool,
    isLoading: PropTypes.bool,
  };

  constructor() {
    super();
    this.renderLeftNav = this.renderLeftNav.bind(this);
    this.renderRightNav = this.renderRightNav.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.handleClickSignOut = this.handleClickSignOut.bind(this);
    this.handleClickBack = this.handleClickBack.bind(this);
    this.handleChangeToDate = this.handleChangeToDate.bind(this);
    this.handleChangeFromDate = this.handleChangeFromDate.bind(this);
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    const {
      isFindingResource,
      isEditingResource,
    } = nextProps;

    this.setState({
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
        <img src={Logo} className={styles.Logo} />
        Inspector
      </Link>
    );
  }

  renderRightNav() {
    const iconProperty = {
      color: '#fff',
    };
    return (
      <IconButton
        tooltip="Sign out"
        onClick={this.handleClickSignOut}
      >
        <ExitToApp {...iconProperty} />
      </IconButton>
    );
  }

  renderContent() {
    const {
      isFindingResource,
    } = this.props;
    if (isFindingResource) {
      return (
        <div className={styles.Finder}>
          <div className={styles.FinderSearch}>
            <div className={styles.FinderSearchIcon}>
              <Search color="#ffffff" />
            </div>
            <div className={styles.FinderSearchField}>
              <SelectField
                value={1}
                labelStyle={{
                  color: '#fff',
                }}
                style={{
                  width: 'auto',
                }}
              >
                <MenuItem value={0} primaryText="MemberID" />
                <MenuItem value={1} primaryText="EmailAddress" />
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
              />
            </div>
          </div>
          <div className={styles.FinderSort}>
            <SelectField
              value={1}
              labelStyle={{
                color: '#fff',
              }}
              style={{
                width: 'auto',
              }}
            >
              <MenuItem value={0} primaryText="Ascending order" />
              <MenuItem value={1} primaryText="Descending order" />
            </SelectField>
          </div>
          <div className={styles.FinderDateFilter}>
            <DatePicker
              hintText="From"
              textFieldStyle={{
                color: '#ffffff',
              }}
              onChange={this.handleChangeFromDate}
            />
            <DatePicker
              hintText="To"
              textFieldStyle={{
                color: '#ffffff',
              }}
              onChange={this.handleChangeToDate}
            />
          </div>
        </div>
      );
    }
    return '';
  }

  changePath({ query }) {
    const _query = {
      ...queryToObject(window.location.search),
      ...query,
    };
    this.context.router.push({
      pathname: window.location.pathname,
      query: _query,
    });
  }

  handleChangeToDate(event, date) {
    this.changePath({
      query: {
        toDate: new Date(date).toISOString(),
      },
    });
  }

  handleChangeFromDate(event, date) {
    this.changePath({
      query: {
        fromDate: new Date(date).toISOString(),
      },
    });
  }

  handleClickSignOut() {
    this.props.signout();
    this.context.router.push('/auth');
    this.props.showSnackbarMessage({
      snackbarMessage: 'Successfully signed out',
    });
  }

  handleClickBack() {
    this.context.router.goBack();
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorHeader);
