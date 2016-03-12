export const sortable = true;
export const readonly = true;

export class Resource {
  constructor(resource) {
    this.tag = resource.tag;
    this.resourceId = resource.resourceId;
    this.showFields = resource.showFields;
    this.schema = resource.schema;
    this.title = resource.title;
    this.description = resource.description;

    for (const key in this.schema) {
      if (typeof(this.schema[key]) === 'object') {
        const field = this.schema[key];
        field.name = key;
      }
    }
  }
}
