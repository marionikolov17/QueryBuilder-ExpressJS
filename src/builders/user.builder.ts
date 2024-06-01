import AbstractBuilder from "./abstract.builder";
import { fieldsMap } from "./utils/fields";
import { AssociationItem, Condition } from "./types/types";

class UserBuilder extends AbstractBuilder {
  override table: string = "users";
  override fieldMapObj: any = fieldsMap[this.table];
  override limit: number = 20;
  override offset: number = 0;
  override fields: Record<string, number>; // Specify Default fields for selection here, Otherwise it will select all
  override condition: Condition; // Specify Default Condition for where clause here, otherwise there will be no condition
  override id: number | null = null;
  override associations: Array<AssociationItem> = [
    {
      mainField: "id",
      relatedTable: "user_specs",
      relatedField: "user_id"
    }
  ]
}

export default UserBuilder;
