import http from "./httpService";

export const sendMedia = (data, payload) => {
  return http.post(`https://zero-right-api-l4ykvsnt5a-uw.a.run.app/file_validation/?${payload}`, data);
};


export const getHistory = (data) => {
   return http.post(`https://zero-right-api-l4ykvsnt5a-uw.a.run.app/historical_media/`, data);
 };