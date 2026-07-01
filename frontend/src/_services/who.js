import { API } from "../api";

export const getWhoCurve =
async (
    gender,
    type
) => {

    const { data } =
        await API.get(
            `/who/curve/${gender}?type=${type}`
        );

    return data;
};

export const getWhoReference =
async () => {

    const { data } =
        await API.get(
            "/who/reference"
        );

    return data;

};