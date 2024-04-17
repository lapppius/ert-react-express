import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import EditRadio from "./EditRadio";
import DeleteRadio from "./DeleteRadio";
import styles from "./RadiosListItem.module.css";

export default function RadiosListItem(props) {
  const [showAll, setShowAll] = useState(false);
  const handleShowMore = () => {
    showAll ? setShowAll(false) : setShowAll(true);
  };

  return (
    <>
      <li key={props.radio.slug} className={styles.adminRadiosListItem}>
        <div className={styles.mainContent}>
          <div className={styles.imgContainer}>
            <img src={props.radio.logoURL} />
          </div>
          <Link to={`/${props.radio.slug}`}>{props.radio.name}</Link>
          <EditRadio radio={props.radio} handleRefresh={props.handleRefresh} />
          <DeleteRadio
            radio={props.radio}
            handleRefresh={props.handleRefresh}
          />
          <button onClick={handleShowMore}>
            show {showAll ? "less" : "more"}
          </button>
        </div>
        {showAll ? (
          <table className={styles.allFieldsList}>
            <tbody>
              {Object.entries(props.radio).map(([key, value]) => (
                <tr key={key + value}>
                  <th key={key}>{key}</th>
                  <td key={value}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : undefined}
      </li>
    </>
  );
}
