import http from "./http";

export const SearchByName = async (search: string) => {
  try {
    const response = await http.get(`/data/${search}`);
    return response;
  } catch (err: unknown) {
    console.log(err);
  }
};

export const GetHistory = async () => {
  try {
    const response = await http.get("history");
    return response;
  } catch (err: unknown) {
    console.log(err);
  }
};
