import { API } from "../api";

export const getDashboardStats =
    async (month, year) => {

        const res =
            await API.get(
                `/dashboard/stats?month=${month}&year=${year}`
            );

        return res.data;
};

  export const getGrowthTrend =
  async () => {

    try {

      const { data } =
        await API.get(
          "/dashboard/growth-trend"
        );

      return data;

    } catch (error) {

      console.log(error);
      throw error;

    }
};

export const getGrowthChart =
async (childId) => {

    const { data } =
        await API.get(
            `/growth-chart/${childId}`
        );

    return data;

};