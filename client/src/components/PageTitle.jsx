import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageTitle({ title }) {
  const location = useLocation();

  useEffect(() => {
    document.title = title
      ? title +
        " | " +
        "      ΕΡΤ Ραδιόφωνο - Όλοι οι ραδιοφωνικοί σταθμοί της ΕΡΤ. Ανεπίσημη Εφαρμογή"
      : "      ΕΡΤ Ραδιόφωνο - Όλοι οι ραδιοφωνικοί σταθμοί της ΕΡΤ. Ανεπίσημη Εφαρμογή";
  }, [location, title]);

  return null;
}
