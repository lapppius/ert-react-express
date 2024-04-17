import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

export default function AdminNav() {
  return (
    <aside className={styles.adminNav}>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Αρχική</NavLink>
          </li>
          <li>
            <NavLink to="radios">Ραδιόφωνα</NavLink>
          </li>

          <li>
            <NavLink to="users">Users</NavLink>
          </li>
          <li>
            <NavLink to="images">Images</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
