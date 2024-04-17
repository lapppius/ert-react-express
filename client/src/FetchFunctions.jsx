const WIKIDATA_API = "https://www.wikidata.org/w/api.php";
const EL_WIKIPEDIA_API = "https://el.wikipedia.org/w/api.php";
const LANG = "el";
const MAX_CACHE_AGE = 86400;
const idsTest = JSON.parse(sessionStorage.getItem("idsTest"));

// Get the wikidata IDs for every radio station in an array of object
export function getRadiosIDPromise(source) {
  return new Promise((resolve, reject) => {
    fetch(source)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let IDs = "";
        for (let i = 0; i < data.length; i++) {
          IDs += data[i].wikiID;
          if (i + 1 !== data.length) {
            IDs += "|";
          }
        }
        resolve(IDs);
      });
  });
}

export function getWikidataEntitiesPromise() {
  return new Promise((resolve, reject) => {
    getRadiosIDPromise("wikisource.json").then((data) => {
      let apiBase = WIKIDATA_API;
      const params = {
        action: "wbgetentities",
        props: "claims|descriptions|labels|sitelinks",
        format: "json",
        languages: LANG,
        sitefilter: LANG + "wiki",
        ids: data,
        languagefallback: LANG,
        smaxage: MAX_CACHE_AGE,
        maxage: MAX_CACHE_AGE,
      };

      apiBase = apiBase + "?origin=*";
      Object.keys(params).forEach((key) => {
        apiBase += "&" + key + "=" + params[key];
      });
      fetch(apiBase)
        .then((response) => {
          return response.json();
        })
        .then((entries) => {
          resolve(entries);
        });
    });
  });
}

export function getWikidataItem(entityID) {
  let apiBase = WIKIDATA_API;
  const params = {
    action: "wbgetentities",
    props: "claims|descriptions|labels|sitelinks",
    format: "json",
    languages: LANG,
    sitefilter: LANG + "wiki",
    ids: entityID,
    languagefallback: LANG,
    smaxage: MAX_CACHE_AGE,
    maxage: MAX_CACHE_AGE,
  };

  apiBase = apiBase + "?origin=*";
  Object.keys(params).forEach((key) => {
    apiBase += "&" + key + "=" + params[key];
  });

  return fetch(apiBase)
    .then((response) => {
      return response.json();
    })
    .then((entries) => Object.entries(entries.entities)[0][1])
    .catch((error) => {
      console.error("Error fetching Wikidata entity:", error);
      throw error;
    });
}

export function fetchWikiSummary(title) {
  return new Promise((resolve, reject) => {
    if (title) {
      fetch(
        `https://el.wikipedia.org/api/rest_v1/page/summary/${encodeURI(title)}`
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          return error;
        });
    }
  });
}

export function setImagesListPromise(title) {
  return new Promise((resolve, reject) => {
    if (title) {
      try {
        fetch(
          "https://el.wikipedia.org/api/rest_v1/page/media-list/" +
            encodeURI(title)
        )
          .then((response) => {
            !response.ok ? reject(response.status) : undefined;
            return response.json();
          })
          .then((elwiki_media) => {
            let wikifileName = undefined;
            if (elwiki_media.items && elwiki_media.items.length > 0) {
              wikifileName = elwiki_media.items[0].title.replace(
                /Αρχείο:/g,
                ""
              );
            }
            fetch(
              EL_WIKIPEDIA_API +
                "?origin=*&action=query&format=json&smaxage=" +
                MAX_CACHE_AGE +
                "&maxage=" +
                MAX_CACHE_AGE +
                "&titles=File:" +
                encodeURI(wikifileName) +
                "&prop=imageinfo&iiprop=url|mime&iiurlwidth=120"
            )
              .then((response) => response.json())
              .then((res) => {
                for (let p in res.query.pages) {
                  if (
                    res &&
                    res.query &&
                    res.query.pages &&
                    res.query.pages[p] &&
                    res.query.pages[p].imageinfo &&
                    res.query.pages[p].imageinfo[0]
                  ) {
                    // if (
                    //   res.query.pages[p].imageinfo[0].mime == "image/svg+xml"
                    // ) {
                    //   return res.query.pages[p].imageinfo[0].url;
                    // } else {
                    return res.query.pages[p].imageinfo[0].thumburl;
                    // }
                  } else {
                    // Handle the case where one of the properties or elements is undefined
                    return undefined; // or some other default value or error handling logic
                  }
                }
              })
              .then((url) => {
                resolve(url);
              })
              .catch((err) => {
                return null;
              });
          });
      } catch (err) {
        return null;
      }
    }
  });
}
