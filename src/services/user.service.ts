import UserBuilder from "./../builders/user.builder";
import User from "./../database/models/user";


export const getUsers = async (payload: any) => {
    let builder = new UserBuilder;
    builder.fields = payload.what;
    builder.condition = payload.condition;

    return builder.buildQuery();
}

export const getUser = async (payload: any) => {
    let builder = new UserBuilder;
    builder.id = payload.id;
    builder.fields = payload.what;

    return builder.buildQuery();
}

export const createUser = async (data: any) => User.create(data);