import { associationsObj, fieldsMap } from "./fields";

const mapAssociatedField = (field: any, table: any) => {
    let associationsTables = associationsObj[table];
    let resultObj: any = {};

    for (let associationTable of associationsTables) {
        let fieldsMapObj = fieldsMap[associationTable];

        for (let [key, value] of Object.entries(fieldsMapObj)) {
            if (field === key) {
                resultObj[fieldsMapObj[key]] = associationTable;
            }
        }
    }

    return resultObj;
}

export const makeSelectQuery = (query:any, fields: any, fieldMapObj: any, table: any) => {
    let fieldsInTables = [];

    // Find fields
    for (let [key, value] of Object.entries(fields)) {
        if (value !== 1) continue;

        let resultObj: any = {};

        if (!fieldMapObj.hasOwnProperty(key)) {
            // Field from another table
            resultObj = mapAssociatedField(key, table);
            fieldsInTables.push(resultObj);
            continue
        }

        resultObj[fieldMapObj[key]] = table;
        fieldsInTables.push(resultObj);
    }

    for (let fieldEntry of fieldsInTables) {
        let [fieldName, tableName] = Object.entries(fieldEntry)[0];
        let fieldString = `${tableName}.${fieldName}`;
        query = query.select(fieldString);
    }

    return query;
}

export const makeWhereClause = (query: any, condition: any, fieldMapObj: any, table: any) => {

}