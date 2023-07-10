module.exports.generateConfig = (requestType, accessToken) => {
  return {
    method: requestType,
    headers: {
      Authorization: `Bearer ${accessToken} `,
      "Content-type": "application/json",
    },
  };
};
