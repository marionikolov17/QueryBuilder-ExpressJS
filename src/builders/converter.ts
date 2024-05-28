import { Op } from "sequelize";
import {fieldsMap, associationsObj} from "./fields";

const operationsObj: any = {
  AND: Op.and,
  OR: Op.or,
  EQ: Op.eq,
  NE: Op.ne,
  LT: Op.lt,
  GT: Op.gt,
};

export const findAssociatedFiels = (fields: any, fieldMapObj: any) => {
  let associatedFields = [];
  for (let [key, value] of Object.entries(fields)) {
    if (value !== 1) continue;

    if (!fieldMapObj.hasOwnProperty(key)) {
      // Field from another table
      associatedFields.push(key)
      continue;
    }
  }
  return associatedFields;
}

export const convertAssociatedFields = (fields: any, model: any) => {
  const associatiedTables = associationsObj[model];
  let associationsResultArr: any = [];
  let includeArr: any = [];

  // Find from which table are coming the associations fields
  for (let associationTable of associatiedTables) {
    let fieldsMapObj = fieldsMap[associationTable];

    for (let [key, value] of Object.entries(fieldsMapObj)) {
      // Find the associatedField in associatedTable
      if (fields.includes(key)) {
        let resultObj: any = {};
        resultObj[fieldsMapObj[key]] = associationTable;
        associationsResultArr.push(resultObj)
      }
    }
  }

  for (let association of associationsResultArr) {
    let [field, table] = Object.entries(association)[0];
    let includeObj: any = {
      association: table,
      attributes: [field]
    }
    includeArr.push(includeObj);
  }

  return includeArr;
}

export const convertFields = (fields: any, fieldMapObj: any) => {
  let resultFields = [];
  for (let [key, value] of Object.entries(fields)) {
    if (value !== 1) continue;

    if (!fieldMapObj.hasOwnProperty(key)) {
      // Field from another table
      continue;
    }

    resultFields.push(fieldMapObj[key]);
  }

  return resultFields;
};

export const convertCondition = (condition: any, fieldMapObj: any, id: any) => {
  let resultConditions: any;

  if (id !== null) {
    resultConditions = { id }
    return resultConditions;
  }

  if (condition.type === "AND") {
    resultConditions = [];

    for (let item of condition.items) {
      let logicalObj: any = {};
      logicalObj[fieldMapObj[item.field]] = {
        [operationsObj[item.operation]]: [item.value],
      };
      resultConditions.push(logicalObj);
    }

    return resultConditions;
  }

  resultConditions = {
    [operationsObj[condition.type]]: [],
  };
  let logicalArr = [];

  for (let item of condition.items) {
    let logicalObj: any = {};
    logicalObj[fieldMapObj[item.field]] = {
      [operationsObj[item.operation]]: [item.value],
    };
    logicalArr.push(logicalObj);
  }

  resultConditions[operationsObj[condition.type]] = logicalArr;
  return resultConditions;
};
