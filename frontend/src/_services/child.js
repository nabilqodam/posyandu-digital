import { API } from "../api";

export const getChildren = async () => {
  try {
    const { data } = await API.get("/children");
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getMyChildren = async () => {
  try {
    const { data } = await API.get("/children/my");

    return data.data; // <-- array langsung
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getChildById = async (id) => {
  try {
    const { data } = await API.get(
      `/children/${id}`
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createChild = async (
  payload
) => {

  const response =
    await API.post(
      "/children",
      payload
    );

  return response.data;

};

export const updateChild = async (
  id,
  payload
) => {
  try {
    const { data } = await API.put(
      `/children/${id}`,
      payload
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteChild = async (id) => {
  try {
    const { data } = await API.delete(
      `/children/${id}`
    );

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};