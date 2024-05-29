import knex from "./../database/db";
import { makeSelectQuery } from "./converter";
import { fieldsMap } from "./fields";

class UserBuilder {
    private table: string = "users"
    private fieldMapObj: any = fieldsMap[this.table];
    public limit: number = 20;
    public offset: number = 0;
    public fields: any = {
        firstName: 1,
        lastName: 1,
        sex: 1
    };
    public condition: any = {
        type: "OR",
        items: [
            {
                field: "firstName",
                operation: "EQ",
                value: "ivann"
            },
            {
                field: "sex",
                operation: "EQ",
                value: "male"
            }
        ]
    };
    public id: any = null;

    public buildQuery(): any {
        let query = knex("users")
                                .join("user_specs", "users.id", "user_specs.user_id");
        query = makeSelectQuery(query, this.fields, this.fieldMapObj, this.table);

        return query;
        /* return knex("users")
                   .join("user_specs", "users.id", "user_specs.user_id")
                   .select("users.id", "first_name", "user_specs.sex")
                   .select("last_name")
                   .where("first_name", "mario").orWhere("user_specs.sex", "female") */
                   
    }
}

export default UserBuilder;