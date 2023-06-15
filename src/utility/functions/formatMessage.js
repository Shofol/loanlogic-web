export const formatMessage = (error) => {
  return error.response.data.error.replaceAll("_", " ").toUpperCase();
};
