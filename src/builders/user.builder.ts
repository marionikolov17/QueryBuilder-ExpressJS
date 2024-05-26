import User from "./../database/models/user";
import { convertFields, convertCondition } from "./converter";

class UserBuilder {
  private fieldMapObj: any = {
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

  public buildQuery(): any {
    let queryObj: any = {
      limit: this.limit,
      offset: this.offset,
      attributes: [],
      where: {},
    };
    queryObj["attributes"] = convertFields(this.fields, this.fieldMapObj);
    queryObj["where"] = convertCondition(this.condition, this.fieldMapObj);
    return User.findAll(queryObj);
  }
}

export default UserBuilder;
