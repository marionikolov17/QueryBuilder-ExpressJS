import User from "./../database/models/user";
import { convertFields, convertCondition } from "./converter";
import fieldsMap from "./fields";

class UserBuilder {
  private fieldMapObj: any = fieldsMap["user"];
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
        field: "firstName",
        operation: "NE",
        value: "mario",
      },
      {
        field: "firstName",
        operation: "EQ",
        value: "ivan",
      },
    ],
  };
  public id: any = null;

  public buildQuery(): any {
    let queryObj: any = {
      limit: this.limit,
      offset: this.offset,
      attributes: [],
      where: {},
    };
    if(this.id !== null) {
      delete queryObj["limit"];
      delete queryObj["offset"];
    }
    queryObj["attributes"] = convertFields(this.fields, this.fieldMapObj);
    queryObj["where"] = convertCondition(this.condition, this.fieldMapObj, this.id);
    return User.findAll(queryObj);
  }
}

export default UserBuilder;
