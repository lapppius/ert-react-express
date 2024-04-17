import { useEffect, useState } from "react";
import styles from "./Frequencies.module.css";

export default function Frequencies({ frequencies }) {
  const [fmList, setFmList] = useState([]);
  const [mwList, setMwList] = useState([]);
  const [swList, setSwList] = useState([]);

  useEffect(() => {
    if (frequencies) {
      setFmList(frequencies.fm);
      setMwList(frequencies.mw);
      setSwList(frequencies.sw);
    }
  }, [frequencies]);

  return (
    <>
      {fmList.length !== 0 || mwList.length !== 0 || swList.length !== 0 ? (
        <div className={styles.frequenciesListContainer}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24px"
              height="24px"
            >
              <path d="M3.24 6.15C2.51 6.43 2 7.17 2 8v12c0 1.1.9 2 2 2h16c1.11 0 2-.9 2-2V8c0-1.1-.9-2-2-2H8.3l7.43-3c.46-.19.68-.71.49-1.17-.19-.46-.71-.68-1.17-.49L3.24 6.15zM7 20c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm13-8h-2v-1c0-.55-.45-1-1-1s-1 .45-1 1v1H4V9c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v3z" />
            </svg>
          </span>

          <div className={styles.frequencies}>
            {fmList != "" ? (
              <div className={styles.frequencyItem}>
                <span>FM:</span>
                <ul>
                  {fmList.map((fm) => (
                    <li key={fm}>
                      {fm}
                      <span>MHz</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
            {mwList != "" ? (
              <div className={styles.frequencyItem}>
                <span>
                  <abbr title="Μεσαία κύματα">MW:</abbr>
                </span>
                <ul>
                  {mwList.map((mw) => (
                    <li key={mw}>
                      {mw}
                      <span>KHz</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
            {swList != "" ? (
              <div className={styles.frequencyItem}>
                <span>
                  <abbr title="Βραχέα κύματα">SW:</abbr>
                </span>
                <ul>
                  {swList.map((sw) => (
                    <li key={sw}>
                      {sw} <span>KHz</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
