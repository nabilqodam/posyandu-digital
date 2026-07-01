import { API } from "../api";




export const downloadReport =
  async () => {
    try {

      const response =
        await API.get(
          "/reports/pdf",
          {
            responseType: "blob"
          }
        );

      return response.data;

    } catch (error) {

      console.log(error);
      throw error;

    }
  };

  export const getReportSummary =
  async () => {

    const res =
      await API.get(
        "/summary"
      );

    return res.data;
};