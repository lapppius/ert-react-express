import RadiosListItem from "./RadiosListItem";
import styles from "./RadiosList.module.css";

export default function RadiosList(props) {
  return (
    <ul className={styles.radiosList}>
    {Object.entries(props.radios).map(([key, radio]) => (
        <RadiosListItem
          key={key}
          id={radio.id}
          title={radio.name}
          streamUrl={radio.streamURL}
          logoURL={radio.logoURL}
          
          slug={radio.slug}
        />
      ))}
    </ul>
  );
}
