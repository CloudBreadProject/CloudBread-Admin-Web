export const sortable = true;
export const readonly = true;
export const boolean = true;
export const datetime = true;

export class Resource {
  constructor(resource) {
    this.tag = resource.tag;
    this.resourceId = resource.resourceId;
    this.showFields = resource.showFields;
    this.schema = resource.schema;
    this.title = resource.title;
    this.description = resource.description;
    this.primaryKey = resource.primaryKey;
    this.fieldGroup = resource.fieldGroup;
    this.schemaArray = [];

    for (const key in this.schema) {
      if (typeof(this.schema[key]) === 'object') {
        const field = this.schema[key];
        field.name = key;
        this.schemaArray.push(field);
      }
    }
  }
}
