import React, { Component, PropTypes } from 'react';
import styles from './ResourceCreatePage.scss';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  loadCreateResourceForm,
  insertResource,
  createResource,
  startCreatingResource,
  stopCreatingResource,
} from 'actions/resource';
import {
  showLoading,
  hideLoading,
  showSnackbarMessage,
} from 'actions/display';

import Helmet from 'react-helmet';
import Divider from 'material-ui/lib/divider';
import TextField from 'material-ui/lib/text-field';
import Toggle from 'material-ui/lib/toggle';
import Paper from 'material-ui/lib/paper';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

function mapStateToProps({ creator }) {
  return {
    ...creator,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadCreateResourceForm,
    insertResource,
    createResource,
    showLoading,
    hideLoading,
    showSnackbarMessage,
    startCreatingResource,
    stopCreatingResource,
  }, dispatch);
}

class ResourceCreateViewPage extends Component {
  static needs = [
    loadCreateResourceForm,
  ];

  static contextTypes = {
    router: PropTypes.object,
  };

  static propTypes = {
    resource: PropTypes.object,
    isRequesting: PropTypes.bool,
    isLoaded: PropTypes.bool,
    resourceId: PropTypes.string,
    loadCreateResourceForm: PropTypes.func,
    insertResource: PropTypes.func,
    createResource: PropTypes.func,
    params: PropTypes.object,
    createSchema: PropTypes.object,
    createSchemaArray: PropTypes.array,
    createFieldGroup: PropTypes.array,
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
    showSnackbarMessage: PropTypes.func,
    startCreatingResource: PropTypes.func,
    stopCreatingResource: PropTypes.func,
  };

  constructor() {
    super();
    this.renderField = this.renderField.bind(this);
    this.renderGroup = this.renderGroup.bind(this);
    this.handleClickContentAdd = this.handleClickContentAdd.bind(this);
    this.handleChangeInputBound = {};
    this.handleToggleSwitchBound = {};
  }

  async componentDidMount() {
    const {
      params
      } = this.props;
    // cache callback funcs for creating
    this.props.showLoading();
    await this.props.loadCreateResourceForm(params);
    this.props.hideLoading();
    // cache callback funcs for editing
    const { createSchema } = this.props;
    for (const key in createSchema) { // eslint-disable-line
      const field = createSchema[key];
      if (field.boolean) {
        this.handleToggleSwitchBound[field.name] = this.handleToggleSwitch(field.name);
      } else {
        this.handleChangeInputBound[field.name] = this.handleChangeInput(field.name);
      }
    }
    this.props.startCreatingResource();
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.props.stopCreatingResource();
  }

  render() {
    const {
      createFieldGroup,
      isLoaded,
      resourceId,
      createSchemaArray,
      } = this.props;
    if (!isLoaded) {
      return <p>Loading target resource...</p>;
    }
    let tableNode;
    if (createFieldGroup.length) {
      tableNode = createFieldGroup.map(this.renderGroup);
    } else {
      tableNode = createSchemaArray.map(this.renderField);
    }
    return (
      <div className={styles.ResourceCreatePage}>
        <Helmet title="Resource Creator" />
        <div
          style={{
            maxWidth: '640px',
          }}
        >
          <div
            style={{
              marginBottom: '20px',
            }}
          >
            <h1
              style={{
                fontSize: '36px',
                margin: '6px 0',
                fontWeight: 400,
              }}
            >
              Create {resourceId}
            </h1>
            <Divider />
          </div>
          {tableNode}
        </div>
        <FloatingActionButton
          backgroundColor="#673AB7"
          style={{
            position: 'fixed',
            right: '24px',
            bottom: '24px',
          }}
          onClick={this.handleClickContentAdd}
        >
          <ContentAdd />
        </FloatingActionButton>
      </div>
    );
  }

  renderGroup(group, key) {
    const { fields, name, description } = group;
    return (
      <Paper
        key={key}
        style={{
          padding: '20px',
          marginBottom: '20px',
        }}
      >
        <h1
          style={{
            margin: '10px 0px',
            marginTop: '0px',
            fontWeight: 400,
            fontSize: '24px',
            color: '#222',
          }}
        >
          {name}
          <span
            style={{
              margin: '5px 0',
              marginLeft: '5px',
              fontSize: '13px',
              color: '#444',
            }}
          >
            {description}
          </span>
        </h1>
        {fields.map(this.renderField)}
      </Paper>
    );
  }

  renderField(name, key) {
    const { resource, isRequesting, createSchema } = this.props;
    const field = typeof(name) === 'string' ? createSchema[name] : name;
    let result;
    if (field.boolean) {
      result = (
        <div>
          <div
            style={{
              maxWidth: '240px',
            }}
          >
            <Toggle
              defaultToggled={resource[field.name] === 'Y'}
              label={field.name}
              labelPosition="left"
              disabled={field.readonly || isRequesting}
              onToggle={this.handleToggleSwitchBound[field.name]}
            />
          </div>
        </div>
      );
    } else {
      result = (
        <TextField
          ref={field.name}
          floatingLabelText={field.name}
          hintText={field.description}
          defaultValue={resource[field.name]}
          disabled={field.readonly || isRequesting}
          onBlur={this.handleChangeInputBound[field.name]}
          fullWidth
        />
      );
    }
    return (
      <div
        key={key}
      >
        {result}
      </div>
    );
  }

  async handleClickContentAdd() {
    this.props.showLoading();
    try {
      const params = this.props.params;
      const resource = this.props.resource;
      const { resourceId } = params;
      await this.props.createResource({
        resource,
        resourceId,
      });
      this.props.showSnackbarMessage({
        snackbarMessage: 'Succeed to create',
      });
      //TODO list로 돌아갔을때 resource 업데이트되어야함.
      this.context.router.push(`/finder/${resourceId}`);
    } catch (error) {
      this.props.showSnackbarMessage({
        snackbarMessage: 'Failed to create',
      });
    }
    this.props.hideLoading();
  }

  handleChangeInput(field) {
    return (event) => {
      this.props.insertResource({
        field,
        value: event.target.value,
      });
    };
  }

  handleToggleSwitch(field) {
    return () => {
      const resource = this.props.resource;
      this.props.insertResource({
        field,
        value: resource[field] === 'Y' ? 'N' : 'Y',
      });
    };
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResourceCreateViewPage);
