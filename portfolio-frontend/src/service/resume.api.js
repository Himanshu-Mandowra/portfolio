import authClient from "../api/authClient";

export const getSummary = async () => {

  try {

    const res = await authClient.get("/resume/get/summary");

    console.log("this is data from service", res.data);
    return res.data;

  } catch (error) {

    console.log(error);

  }

};