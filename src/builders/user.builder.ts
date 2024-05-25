import User from "./../database/models/user";

const operationsObj = {
    "EQ": "",
    "NE": "",
    "LT": "",
    "GT": ""
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