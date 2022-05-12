/* eslint-disable import/prefer-default-export */

export const appendProtocolToUrlIfDoesntExist = (url) => {
  let completeUrl = url;
  if (!(/^(http|https):\/\//gm.test(completeUrl))) {
    completeUrl = `http://${completeUrl}`;
  }
  return completeUrl;
};
