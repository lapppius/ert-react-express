import styles from "./RadiosList.module.css";
import RadiosListItem from "./RadiosListItem";

export default function RadiosList(props) {
  return (
    <div className={styles.listContainer}>
      <h4>
        {props?.adminRadios
          ? `${Object.keys(props.adminRadios).length} Ραδιοφωνικοί Σταθμοί`
          : undefined}
      </h4>
      <ul className={styles.adminRadiosList}>
        {Object.entries(props.adminRadios).map(([key, value]) => (
          <RadiosListItem
            key={key}
            radio={value}
            handleRefresh={props.handleRefresh}
          />
        ))}
      </ul>
    </div>
  );
}
