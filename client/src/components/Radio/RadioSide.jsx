import Contact from "./Contact";
import Frequencies from "./Frequencies";
import styles from "./RadioSide.module.css";
import SocialMedia from "./SocialMedia";

export default function RadioSide(props) {
  return (
    <>
      {Object.entries(props).length != 0 ? (
        <aside className={styles.radioSideContainer}>
          <SocialMedia social={props.social} title={props.title} />
          <Contact
            website={props.website}
            email={props.email}
            phone={props.phone}
            location={props.location}
            title={props.title}
          />
          <Frequencies frequencies={props.frequencies} />
        </aside>
      ) : null}
    </>
  );
}
