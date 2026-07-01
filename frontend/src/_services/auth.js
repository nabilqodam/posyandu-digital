import { API } from "../api"

export const login = async ({phone, password}) => {
    try {
        const { data } = await API.post("/login", {phone, password})
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}

export const register = async (payload) => {
    try {
      const { data } = await API.post(
        "/register",
        payload
      );
  
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const getProfile = async () => {
    try {
      const { data } = await API.get("/profile");
  
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  
  export const logout = async () => {
    try {
      const { data } = await API.post("/logout");
  
      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };