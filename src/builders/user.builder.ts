import knex from "./../database/db";
import { makeSelectQuery, makeWhereClause } from "./converter";
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
        type: "AND",
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

    public buildQuery(): any {
        let query = knex("users")
                                .join("user_specs", "users.id", "user_specs.user_id");
        query = makeSelectQuery(query, this.fields, this.fieldMapObj, this.table);
        query = makeWhereClause(query, this.condition, this.fieldMapObj, this.table);

        return query;
    }
}

export default UserBuilder;