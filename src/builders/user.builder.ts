import { Op } from "sequelize";
import User from "./../database/models/user";

const operationsObj = {
    "EQ": Op.eq,
    "NE": Op.ne,
    "LT": Op.lt,
    "GT": Op.gt
}

const fieldMapObj = {
    "uid": "id",
    "firstName": "first_name",
    "lastName": "last_name",
    "userName": "username",
    "email": "email",
    "password": "password",
    "profilePicture": "profile_picture_url",
    "country": "country",
    "userLanguages": "languages",
    "phoneNumber": "phone_number",
    "userRole": "user_role",
    "visible": "visible",
    "dateCreated": "date_created",
}

const convertCondition = () => {

}

class UserBuilder {
    public limit: number = 20;
    public offset: number = 0;
    public fields: any = ["first_name", "last_name"];
    public condition: any = {
        type: "AND",
        items: [
            {
                field: "first_name",
                operation: "EQ",
                value: "mario"
            },
            {
                field: "last_name",
                operation: "EQ",
                value: "nikolov"
            }
        ]
    };

    buildQuery(): any {
        let queryObj: any = { limit: this.limit, offset: this.offset, attributes: [...this.fields] };

    }
}