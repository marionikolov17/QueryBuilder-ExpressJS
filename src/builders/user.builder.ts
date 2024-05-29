import knex from "./../database/db";
import { buildQuery } from "./converter";
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
                value: "ivan"
            },
            {
                field: "sex",
                operation: "EQ",
                value: "male"
            }
        ]
    };
    public id: any = null;

    public build(): any {
        let query = knex("users")
                                .join("user_specs", "users.id", "user_specs.user_id");
        return buildQuery(query, this.fields, this.fieldMapObj, this.condition, this.table, this.id, this.limit, this.offset);
    }
}

export default UserBuilder;