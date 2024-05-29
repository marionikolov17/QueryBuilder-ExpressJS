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
}

export default UserBuilder;