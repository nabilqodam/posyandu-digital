import { API } from "../api";

export const getUsers = async () => {

    const { data } =
        await API.get("/users");

    return data;

};

export const updateUser = async (
    id,
    payload
) => {

    const { data } =
        await API.put(
            `/users/${id}`,
            payload
        );

    return data;

};

export const deleteUser = async (
    id
) => {

    const { data } =
        await API.delete(
            `/users/${id}`
        );

    return data;

};

export const getParents =
async () => {

    const { data } =
        await API.get(
            "/users/parents"
        );

    return data;

};