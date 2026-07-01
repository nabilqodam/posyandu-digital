import { API } from "../api";

export const getSchedules =
  async () => {
    try {
      const { data } =
        await API.get(
          "/schedules"
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const getScheduleById =
  async (id) => {
    try {
      const { data } =
        await API.get(
          `/schedules/${id}`
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const createSchedule =
  async (payload) => {
    try {
      const { data } =
        await API.post(
          "/schedules",
          payload
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const updateSchedule =
  async (id, payload) => {
    try {
      const { data } =
        await API.put(
          `/schedules/${id}`,
          payload
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const deleteSchedule =
  async (id) => {
    try {
      const { data } =
        await API.delete(
          `/schedules/${id}`
        );

      return data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };