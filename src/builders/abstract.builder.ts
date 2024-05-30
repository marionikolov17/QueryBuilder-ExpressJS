import { associationsObj, fieldsMap } from "./fields";

const OPERATIONS: any = {
  EQ: "=",
  NE: "!=",
  LT: "<",
  GT: ">",
};

abstract class AbstractBuilder {
  // Class properties for overriding
  

  // Helper functions
  private mapAssociatedField(field: any, table: any) {
    let associationsTables = associationsObj[table];
    let resultObj: any = {};

    for (let associationTable of associationsTables) {
      let fieldsMapObj = fieldsMap[associationTable];

      for (let [key, value] of Object.entries(fieldsMapObj)) {
        if (field === key) {
          resultObj[fieldsMapObj[key]] = associationTable;
        }
      }
    }

    return resultObj;
  }

  private generateFieldString(field: any, fieldMapObj: any, table: any) {
    let resultObj: any = {};

    if (!fieldMapObj.hasOwnProperty(field)) {
      resultObj = this.mapAssociatedField(field, table);

      let [fieldName, tableName] = Object.entries(resultObj)[0];

      return `${tableName}.${fieldName}`;
    }

    resultObj[fieldMapObj[field]] = table;

    let [fieldName, tableName] = Object.entries(resultObj)[0];

    return `${tableName}.${fieldName}`;
  }

  // Statement functions
  private makeSelectQuery(
    query: any,
    fields: any,
    fieldMapObj: any,
    table: any
  ) {
    let fieldsInTables = [];

    // Find fields
    for (let [key, value] of Object.entries(fields)) {
      if (value !== 1) continue;

      let resultObj: any = {};

      if (!fieldMapObj.hasOwnProperty(key)) {
        // Field from another table
        resultObj = this.mapAssociatedField(key, table);
        fieldsInTables.push(resultObj);
        continue;
      }

      resultObj[fieldMapObj[key]] = table;
      fieldsInTables.push(resultObj);
    }

    for (let fieldEntry of fieldsInTables) {
      let [fieldName, tableName] = Object.entries(fieldEntry)[0];
      let fieldString = `${tableName}.${fieldName}`;
      query = query.select(fieldString);
    }

    return query;
  }

  private makeWhereClause(
    query: any,
    condition: any,
    fieldMapObj: any,
    table: any
  ) {
    const conditionType = condition.type;

    // Make where clause for first field
    query = query.where(
      this.generateFieldString(condition.items[0].field, fieldMapObj, table),
      OPERATIONS[condition.items[0].operation],
      condition.items[0].value
    );

    // Loop through every left item with the correct operation
    for (let i = 1; i < condition.items.length; i++) {
      let conditionItem = condition.items[i];
      let itemField = conditionItem["field"];
      let itemOperation = conditionItem["operation"];
      let itemValue = conditionItem["value"];

      if (conditionType === "AND") {
        query = query.andWhere(
          this.generateFieldString(itemField, fieldMapObj, table),
          OPERATIONS[itemOperation],
          itemValue
        );
      } else if (conditionType === "OR") {
        query = query.orWhere(
          this.generateFieldString(itemField, fieldMapObj, table),
          OPERATIONS[itemOperation],
          itemValue
        );
      }
    }

    return query;
  }
}

export default AbstractBuilder;
