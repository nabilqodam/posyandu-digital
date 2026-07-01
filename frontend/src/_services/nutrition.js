import { API } from "../api";

export const getNutrition =
  async () => {
    try {
      const { data } =
        await API.get(
          "/nutrition"
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const getNutritionByChild =
  async (childId) => {
    try {
      const { data } =
        await API.get(
          `/nutrition/child/${childId}`
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const getParentNutrition =
  async () => {
    try {
      const { data } =
        await API.get(
          "/nutrition/history"
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };