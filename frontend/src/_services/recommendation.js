import { API } from "../api";

export const getRecommendations =
  async () => {
    try {
      const { data } =
        await API.get(
          "/recommendations"
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const getRecommendationByChild =
  async (childId) => {
    try {
      const { data } =
        await API.get(
          `/recommendations/child/${childId}`
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const getLatestRecommendation =
  async (childId) => {
    try {
      const { data } =
        await API.get(
          `/recommendations/latest/${childId}`
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };