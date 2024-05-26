import { Op } from "sequelize";
import User from "./../database/models/user";

const operationsObj: any = {
  AND: Op.and,
  OR: Op.or,
  EQ: Op.eq,
  NE: Op.ne,
  LT: Op.lt,
  GT: Op.gt,
};

const fieldMapObj: any = {
  uid: "id",
  firstName: "first_name",
  lastName: "last_name",
  userName: "username",
  email: "email",
  password: "password",
  profilePicture: "profile_picture_url",
  country: "country",
  userLanguages: "languages",
  phoneNumber: "phone_number",
  userRole: "user_role",
  visible: "visible",
  dateCreated: "date_created",
};

const convertFields = (fields: any) => {
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

const convertCondition = (condition: any) => {
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

class UserBuilder {
  public limit: number = 20;
  public offset: number = 0;
  public fields: any = {
    uid: 1,
    firstName: 1,
    lastName: 1,
  };
  public condition: any = {
    type: "OR",
    items: [
      {
        field: "first_name",
        operation: "NE",
        value: "mario",
      },
      {
        field: "first_name",
        operation: "EQ",
        value: "ivan",
      },
    ],
  };

  public buildQuery(): any {
    let queryObj: any = {
      limit: this.limit,
      offset: this.offset,
      attributes: [],
      where: {},
    };
    queryObj["attributes"] = convertFields(this.fields);
    console.log(convertCondition(this.condition));
    queryObj["where"] = convertCondition(this.condition);
    return User.findAll(queryObj);
  }
}

export default UserBuilder;
