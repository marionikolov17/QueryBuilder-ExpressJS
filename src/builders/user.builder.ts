import User from "./../database/models/user";
import { convertFields, convertCondition } from "./converter";

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
    queryObj["attributes"] = convertFields(this.fields, fieldMapObj);
    console.log(convertCondition(this.condition));
    queryObj["where"] = convertCondition(this.condition);
    return User.findAll(queryObj);
  }
}

export default UserBuilder;
