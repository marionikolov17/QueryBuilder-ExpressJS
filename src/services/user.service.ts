import UserBuilder from "./../builders/user.builder";
import User from "./../database/models/user";


export const getUsers = async () => {
    let builder = new UserBuilder;

    return builder.buildQuery();
}

export const getUser = async (id: any) => {
    let builder = new UserBuilder;
    builder.id = id;

    return builder.buildQuery();
}

export const createUser = async (data: any) => User.create(data);