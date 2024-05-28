import { convertFields, convertCondition, findAssociatedFiels, convertAssociatedFields } from "./converter";
import {fieldsMap} from "./fields";
import connection from "./../database/connection";

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

  public async buildQuery(): Promise<any> {
    let queryObj: any = {
      limit: this.limit,
      offset: this.offset,
      attributes: [],
      where: {},
      include: []
    };

    if(this.id !== null) {
      delete queryObj["limit"];
      delete queryObj["offset"];
    }

    queryObj["attributes"] = convertFields(this.fields, this.fieldMapObj);
    queryObj["where"] = convertCondition(this.condition, this.fieldMapObj, this.id);

    let associatedFields = findAssociatedFiels(this.fields, this.fieldMapObj);
    queryObj["include"] = convertAssociatedFields(associatedFields, "user");
    
    //return User.findAll(queryObj);

    return connection.query(`
      SELECT first_name, last_name, users.id FROM users LEFT JOIN user_specs ON users.id = user_specs.id WHERE user_specs.sex = 'female' OR users.first_name = 'mario'
    `)
  }
}

/* 
SELECT * FROM query_builder.users LEFT JOIN query_builder.user_specs ON query_builder.users.id = query_builder.user_specs.user_id WHERE query_builder.user_specs.sex = 'female' OR query_builder.users.first_name = 'mario';
*/

export default UserBuilder;
