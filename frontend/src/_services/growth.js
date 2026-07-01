import { API } from "../api";

export const getGrowthHistory =
  async (childId) => {
    try {
      const { data } =
        await API.get(
          `/growth/child/${childId}`
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const createGrowth =
  async (payload) => {
    try {
      const { data } =
        await API.post(
          "/growth",
          payload
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const updateGrowth =
  async (id, payload) => {
    try {
      const { data } =
        await API.put(
          `/growth/${id}`,
          payload
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const getGrowthByChild =
  async (childId) => {
    try {
      const { data } =
        await API.get(
          `/growth/child/${childId}`
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const getParentGrowth =
  async () => {
    try {
      const { data } =
        await API.get(
          "/growth/history"
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };