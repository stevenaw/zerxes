const fetch = require('cross-fetch');
const compareUrls = require('compare-urls');

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

      if (compareUrls(resultUrl, expectedRedirect)) {
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

class ZerxesCore {
  verifyRedirect({ url, expectedRedirect, maxHops }) {
    return verifyRedirectInternal({
      url: url,
      expectedRedirect: expectedRedirect,
      hopCount: 0,
      maxHops: maxHops || 10
    });
  }
};

module.exports = ZerxesCore;