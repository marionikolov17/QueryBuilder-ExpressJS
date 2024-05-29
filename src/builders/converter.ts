import { associationsObj, fieldsMap } from "./fields";

const mapAssociatedField = (field: any, model: any) => {
    let associationsTables = associationsObj[model];
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

export const makeSelectQuery = (query:any, fields: any, fieldMapObj: any, model: any) => {
    let fieldsInTables = [];

    // Find fields
    for (let [key, value] of Object.entries(fields)) {
        if (value !== 1) continue;

        let resultObj: any = {};

        if (!fieldMapObj.hasOwnProperty(key)) {
            // Field from another table
            resultObj = mapAssociatedField(key, model);
            fieldsInTables.push(resultObj);
            continue
        }

        resultObj[fieldMapObj[key]] = model;
        fieldsInTables.push(resultObj);
    }

    for (let fieldEntry of fieldsInTables) {
        let [fieldName, tableName] = Object.entries(fieldEntry)[0];
        let fieldString = `${tableName}.${fieldName}`;
        query = query.select(fieldString);
    }

    return query;
}