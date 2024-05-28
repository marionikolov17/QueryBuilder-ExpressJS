import { Op } from "sequelize";
import User from "./../database/models/user";
import { convertFields, convertCondition, findAssociatedFiels, convertAssociatedFields } from "./converter";
import {fieldsMap} from "./fields";

class UserBuilder {
  private fieldMapObj: any = fieldsMap["user"];
  public limit: number = 20;
  public offset: number = 0;
  public fields: any = {
    uid: 1,
    firstName: 1,
    lastName: 1,
  }; // Default fields for selection
  public condition: any; // You can pass default conditions here
  public id: any = null;

  public buildQuery(): any {
    let queryObj: any = {
      limit: this.limit,
      offset: this.offset,
      attributes: [],
      where: {},
      include: []
    };
    console.log(User.associations.user_specs)
    if(this.id !== null) {
      delete queryObj["limit"];
      delete queryObj["offset"];
    }

    queryObj["attributes"] = convertFields(this.fields, this.fieldMapObj);
    queryObj["where"] = convertCondition(this.condition, this.fieldMapObj, this.id);

    let associatedFields = findAssociatedFiels(this.fields, this.fieldMapObj);
    queryObj["include"] = convertAssociatedFields(associatedFields, "user");
    
    return User.findAll(queryObj);
    /* return User.findAll({
      limit: 20,
      offset: 0,
      attributes: ["first_name", "last_name", "id"],
      where: {
        [Op.or]: [{ first_name: "mario" }]
      },
      include: [
        {
          association: "user_specs",
          attributes: ["sex"],
          where: {
            sex: "male"
          }
        }
      ]
    }) */
  }
}

export default UserBuilder;
