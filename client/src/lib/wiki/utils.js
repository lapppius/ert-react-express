export function parseWikidataItem(wikidataItem) {
  return new Promise((resolve, reject) => {
    const claims = [
      "P2002",
      "P2003",
      "P2013",
      "P968",
      "P856",
      "P159",
      "P963",
      "P1329",
      "P2144",
    ];

    const radio = {};
    const social = {};
    for (const claim of claims) {
      try {
        const claimData = wikidataItem.claims[claim];

        if (
          !claimData ||
          !claimData[0] ||
          !claimData[0].mainsnak ||
          !claimData[0].mainsnak.datavalue
        ) {
          continue;
        }

        const expression = claimData[0].mainsnak.datavalue.value;

        switch (claim) {
          case "P2002":
            social.twitter = expression;
            break;
          case "P2003":
            social.instagram = expression;
            break;
          case "P2013":
            social.facebook = expression;
            break;
          case "P963":
            radio.streamUrl = expression;
            break;
          case "P968":
            radio.email = expression;
            break;
          case "P856":
            radio.website = expression.replace(/\/+$/, "");
            break;
          case "P159":
            const location = parseLocation(wikidataItem.claims[claim][0]);
            radio.location = location;
            break;
          case "P1329":
            const phones = wikidataItem.claims[claim].map(
              (phone) => phone.mainsnak.datavalue.value
            );
            radio.phone = phones;
            break;
          case "P2144":
            const frequencies = parseFrequencies(wikidataItem.claims[claim]);
            radio.frequencies = frequencies;
            break;
          default:
            break;
        }
      } catch (error) {
        console.error("Error processing claim:", claim, error);
      }
    }

    radio.title =
      wikidataItem.sitelinks.elwiki?.title || wikidataItem.labels.el.value;
    radio.id = wikidataItem.id;
    radio.description = wikidataItem.descriptions?.el.value;
    radio.social = social;
    resolve(radio);
  });
}

function parseLocation(locationClaim) {
  let cityId, street, postcode, number, lat, lon;

  try {
    postcode = locationClaim.qualifiers.P281[0].datavalue.value;
  } catch {}

  try {
    number = locationClaim.qualifiers.P670[0].datavalue.value;
  } catch {}

  try {
    lat = locationClaim.qualifiers.P625[0].datavalue.value.latitude;
    lon = locationClaim.qualifiers.P625[0].datavalue.value.longitude;
  } catch {}

  try {
    for (const str of locationClaim.qualifiers.P6375) {
      if (str.datavalue.value.language === "el") {
        street = str.datavalue.value.text;
      }
    }
  } catch {}

  try {
    cityId = locationClaim.mainsnak.datavalue.value.id;
  } catch {}

  return {
    cityId,
    street,
    number,
    postcode,
    lat,
    lon,
  };
}

function parseFrequencies(frequenciesClaim) {
  const fm = [];
  const mw = [];
  const sw = [];

  for (const freq of frequenciesClaim) {
    const frequency = freq.mainsnak.datavalue.value.amount.replace("+", "");
    const unit = freq.mainsnak.datavalue.value.unit.replace(
      "http://www.wikidata.org/entity/",
      ""
    );

    if (
      Number(frequency) >= 87.5 &&
      Number(frequency) <= 108 &&
      unit === "Q732707"
    ) {
      fm.push(frequency);
    } else if (
      Number(frequency) >= 531 &&
      Number(frequency) <= 1602 &&
      unit === "Q2143992"
    ) {
      mw.push(frequency);
    } else if (unit === "Q2143992") {
      sw.push(frequency);
    }
  }

  return {
    fm,
    mw,
    sw,
  };
}
