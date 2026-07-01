import { API } from "../api";

export const getNotifications =
  async () => {
    try {
      const { data } =
        await API.get(
          "/notifications"
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };