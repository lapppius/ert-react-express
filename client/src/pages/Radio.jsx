import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import RadioSide from "../components/Radio/RadioSide";
import RadioHeader from "../components/Radio/RadioHeader";
import styles from "./Radio.module.css";
import { useState } from "react";
import { getWikidataItem } from "../FetchFunctions";
import { parseWikidataItem } from "../lib/wiki/utils";
import PageTitle from "../components/PageTitle";

export const Radio = () => {
  const { slug } = useParams();
  const [loadedRadio, setLoadedRadio] = useState({});
  const [loadedWikidataData, setLoadedWikidataData] = useState(null);
  const radioRef = useRef(null);

  useEffect(() => {
    if (loadedRadio.wikidataId) {
      getWikidataItem(loadedRadio.wikidataId).then((wikidataItem) => {
        parseWikidataItem(wikidataItem).then((wikidataItem) => {
          setLoadedWikidataData(wikidataItem);
          console.log(loadedWikidataData);
        });
      });
    }
    console.log(loadedRadio);
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

  return (
    <div className={styles.radioContent} ref={radioRef}>
      <PageTitle title={loadedRadio.name} />
      <RadioHeader {...loadedRadio} {...loadedWikidataData} />
      <RadioSide {...loadedWikidataData} />
      {/* <RadioEpg /> */}
    </div>
  );
};
