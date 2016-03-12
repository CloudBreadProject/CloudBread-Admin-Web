import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadResources } from 'reducers/resource';

import Table from 'material-ui/lib/table/table';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableHeader from 'material-ui/lib/table/table-header';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import TableBody from 'material-ui/lib/table/table-body';

function mapStateToProps({ resource }) {
  return {
    ...resource,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadResources,
  }, dispatch);
}

class ResourceFindPage extends Component {
  static needs = [
    loadResources,
  ];

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
    params: PropTypes.object,
  };

  componentDidMount() {
    this.props.loadResources(this.props.params);
  }

  render() {
    const { title, description } = this.props;
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <Table
          selectable={false}
        >
          <TableHeader displaySelectAll={false}>
            <TableRow selectable={false}>
              {this.renderHeaderCells()}
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.renderBodyCells()}
          </TableBody>
        </Table>
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
    const { resources, showFields } = this.props;
    return resources.map((resource, key) => {
      function renderColumn(field, key2) {
        return (
          <TableRowColumn
            key={key2}
            children={resource[field.name]}
          />
        );
      }
      return (
        <TableRow key={key} selectable={false}>
          {showFields.map(renderColumn)}
        </TableRow>
      );
    });
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceFindPage);
