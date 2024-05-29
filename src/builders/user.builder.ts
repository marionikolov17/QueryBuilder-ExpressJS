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
        return knex.select("users.first_name", "users.last_name")
    }
}

export default UserBuilder;