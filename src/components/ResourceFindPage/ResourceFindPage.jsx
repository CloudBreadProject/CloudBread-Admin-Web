import React, { Component, PropTypes } from 'react';
import styles from './ResourceFindPage.scss';
import momentTZ from 'moment-timezone';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  loadResources,
  startFindingResource,
  stopFindingResource,
} from 'actions/resource';
import {
  showLoading,
  hideLoading,
} from 'actions/display';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';
import Divider from 'material-ui/lib/divider';

function mapStateToProps({ finder, display }) {
  return {
    ...finder,
    timezone: display.timezone,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadResources,
    showLoading,
    hideLoading,
    startFindingResource,
    stopFindingResource,
  }, dispatch);
}

class ResourceFindPage extends Component {
  static needs = [
    loadResources,
  ];

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    loadResources: PropTypes.func,
    resourceId: PropTypes.string,
    resources: PropTypes.array,
    showResources: PropTypes.number,
    isRequesting: PropTypes.bool,
    showFields: PropTypes.array,
    errorMessage: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    allArticles: PropTypes.number,
    params: PropTypes.object,
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
    primaryKey: PropTypes.string,
    isLoaded: PropTypes.bool,
    startFindingResource: PropTypes.func,
    stopFindingResource: PropTypes.func,
    timezone: PropTypes.string,
    failedToLoad: PropTypes.bool,
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
    search: PropTypes.string,
    field: PropTypes.string,
    sort: PropTypes.string,
  };

  constructor() {
    super();
    this.handleClickResourceItem = this.handleClickResourceItem.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleNeedMoreContent = this.handleNeedMoreContent.bind(this);
  }

  async componentDidMount() {
    const { params, resourceId, isLoaded } = this.props;
    if (!(params.resourceId === resourceId && isLoaded)) {
      this.props.showLoading();
      await this.props.loadResources(params);
      this.props.hideLoading();
    }
    this.props.startFindingResource();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    this.props.stopFindingResource();
  }

  handleScroll() {
    const { isRequesting } = this.props;
    if (
      window.scrollY + screen.height > document.body.offsetHeight
      &&
      window.scrollY >= this.lastScrollY
      &&
      !isRequesting
    ) {
      this.handleNeedMoreContent();
    }
    this.lastScrollY = window.scrollY;
  }

  async handleNeedMoreContent() {
    const {
      fromDate, toDate, // resource date range
      field, search, // field and word to search resource
      sort, // sorting
      resources,
      resourceId,
    } = this.props;
    this.props.showLoading();
    await this.props.loadResources({
      fromDate, toDate,
      field, search,
      sort,
      skip: resources.length,
      limit: 20,
      resourceId,
    });
    this.props.hideLoading();
  }

  render() {
    const {
      title,
      description,
      allArticles,
      isLoaded,
      failedToLoad,
      resources,
    } = this.props;
    if (failedToLoad) {
      return <div>Failed to load resources.</div>;
    }
    if (!isLoaded) {
      return <div>Loading resources ...</div>;
    }
    let tableNode = '';
    if (resources.length) {
      tableNode = (
        <div>
          <Divider />
          <Table
            selectable={false}
            onCellClick={this.handleClickResourceItem}
          >
            <TableHeader displaySelectAll={false} enableSelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                {this.renderHeaderCells()}
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.renderBodyCells()}
            </TableBody>
          </Table>
          <Divider />
        </div>
      );
    }
    return (
      <div className={styles.ResourceFindPage}>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>Total Articles: {allArticles}</p>
        {tableNode}
      </div>
    );
  }

  renderHeaderCells() {
    const { showFields } = this.props;
    return showFields.map((field, key) => (
      <TableHeaderColumn
        key={key}
        children={field.name}
        tooltip={field.description}
      />
    ));
  }

  renderBodyCells() {
    const { resources, showFields, timezone } = this.props;
    return resources.map((resource, key) => {
      function renderColumn(field, key2) {
        let value = resource[field.name];
        if (field.datetime) {
          value = momentTZ(value).tz(timezone).format();
        }
        return (
          <TableRowColumn
            key={key2}
            children={value}
          />
        );
      }
      return (
        <TableRow
          key={key}
          className={styles.ResourceItem}
        >
          {showFields.map(renderColumn)}
        </TableRow>
      );
    });
  }

  handleClickResourceItem(row) {
    const { resourceId, resources, primaryKey } = this.props;
    const resource = resources[row];
    const identifier = resource[primaryKey];
    this.context.router.push(`/editor/${resourceId}/${identifier}`);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceFindPage);
