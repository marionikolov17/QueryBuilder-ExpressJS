import db from "./../database/db";
import UserBuilder from "./../builders/user.builder";

export const getUsers = async (payload: any) => {
    let builder = new UserBuilder;

    return builder.buildQuery();
};

export const getUser = async (payload: any) => {};

export const createUser = async (data: any) => db("users").insert(data);

export const createUserSpecs = async (data: any) => db("user_specs").insert(data);
