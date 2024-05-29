import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import RadioSide from "../components/Radio/RadioSide";
import RadioHeader from "../components/Radio/RadioHeader";
import styles from "./Radio.module.css";
import { useState } from "react";
import { getWikidataItem } from "../FetchFunctions";
import { parseWikidataItem } from "../lib/wiki/utils";
import PageTitle from "../components/PageTitle";
import PageDescription from "../components/PageDescription";
import { fetchWikiSummary } from "../FetchFunctions";

export const Radio = () => {
  const { slug } = useParams();
  const [loadedRadio, setLoadedRadio] = useState({});
  const [loadedWikidataData, setLoadedWikidataData] = useState(null);

  const radioRef = useRef(null);

  const [wikiSummary, setWikiSummary] = useState({
    wikiSum: { sumContent: null, isWiki: null },
  });

  useEffect(() => {
    if (loadedRadio.wikidataId) {
      getWikidataItem(loadedRadio.wikidataId).then((wikidataItem) => {
        parseWikidataItem(wikidataItem).then((wikidataItem) => {
          setLoadedWikidataData(wikidataItem);
          console.log(loadedWikidataData);
        });
      });
    }
  }, [loadedRadio]);

  useEffect(() => {
    fetch(`/api/radios/slug/${slug}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setLoadedRadio(response);
      });
  }, []);

  useEffect(() => {
    if (!loadedWikidataData) return;
    fetchWikiSummary(loadedWikidataData.title).then((res) => {
      setWikiSummary({
        wikiSum: {
          sumContent: res.extract ? res.extract : loadedRadio.description,
          isWiki: res.extract ? true : false,
        },
      });
    });
  }, [loadedWikidataData]);
  return (
    <div className={styles.radioContent} ref={radioRef}>
      <PageTitle title={loadedRadio.name} />
      <PageDescription description={wikiSummary.wikiSum.sumContent} />
      <RadioHeader {...loadedRadio} {...wikiSummary} />
      <RadioSide {...loadedWikidataData} />
    </div>
  );
};
