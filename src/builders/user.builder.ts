import knex from "./../database/db";
import { fieldsMap } from "./fields";

class UserBuilder {
    private fieldMapObj: any = fieldsMap["user"];
    public limit: number = 20;
    public offset: number = 0;
    public fields: any = {
        firstName: 1,
        lastName: 1
    };
    public condition: any;
    public id: any = null;

    public buildQuery(): any {
        return knex("users")
                   .join("user_specs", "users.id", "user_specs.user_id")
                   .select("users.id", "first_name", "last_name", "user_specs.sex")
                   .where("first_name", "mario").orWhere("user_specs.sex", "female")
                   
    }
}

export default UserBuilder;