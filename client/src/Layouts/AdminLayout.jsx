import AdminNav from "../components/Admin/Nav";
import styles from "./AdminLayout.module.css";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <AdminNav />
      <main className={styles.adminMain}>
        <Outlet />
      </main>
    </>
  );
}
