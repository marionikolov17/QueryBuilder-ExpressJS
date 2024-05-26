import UserBuilder from "./../builders/user.builder";
import User from "./../database/models/user";


export const getUsers = async (payload: any) => {
    let builder = new UserBuilder;

    return builder.buildQuery();
}

export const getUser = async (payload: any) => {
    let builder = new UserBuilder;
    builder.id = payload.id;

    return builder.buildQuery();
}

export const createUser = async (data: any) => User.create(data);