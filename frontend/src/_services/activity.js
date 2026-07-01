import { API } from "../api";

export const getActivityLogs =
  async () => {
    try {
      const { data } =
        await API.get("/logs");

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };