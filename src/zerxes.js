const fetch = require('cross-fetch');
const URI = require("uri-js");

const verifyRedirectInternal = ({ url, expectedRedirect, hopCount, maxHops }) => {
  if (hopCount >= maxHops) {
    return Promise.reject({ maxHops });
  }

  return fetch(
    url,
    {
      method: 'GET',
      redirect: 'manual'
    })
  .then(res => {
    hopCount++;

    if (res.status >= 300 && res.status < 400) {
      const resultUrl = res.headers.get('location');

      if (resultUrl === expectedRedirect) {
        return Promise.resolve({ hopCount });
      } else {
        return verifyRedirectInternal({
          url: resultUrl,
          expectedRedirect,
          maxHops,
          hopCount
        });
      }
    }

    return Promise.reject({ maxHops });
  });
};

class Zerxes {
  verifyRedirect({ url, expectedRedirect, maxHops }) {
    const normalizedUri = URI.normalize(url);
    const normalizedRedirect = URI.normalize(expectedRedirect);

    return verifyRedirectInternal({
      url: normalizedUri,
      expectedRedirect: normalizedRedirect,
      hopCount: 0,
      maxHops: maxHops || 10
    });
  }
};

module.exports = Zerxes;