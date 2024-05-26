import { Op } from "sequelize";

const operationsObj: any = {
  AND: Op.and,
  OR: Op.or,
  EQ: Op.eq,
  NE: Op.ne,
  LT: Op.lt,
  GT: Op.gt,
};

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

export const convertCondition = (condition: any) => {
  let resultConditions: any;

  if (condition.type === "AND") {
    resultConditions = [];

    for (let item of condition.items) {
      let logicalObj: any = {};
      logicalObj[item.field] = {
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
    logicalObj[item.field] = {
      [operationsObj[item.operation]]: [item.value],
    };
    logicalArr.push(logicalObj);
  }

  resultConditions[operationsObj[condition.type]] = logicalArr;
  return resultConditions;
};
