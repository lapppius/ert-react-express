import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageDescription({ description }) {
  const location = useLocation();

  useEffect(() => {
    if (!description) return;
    if (document.querySelector('meta[name="description"]')) {
      document
        .querySelector('meta[name="description"]')
        .setAttribute("content", description);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = description;
      document.head.appendChild(meta); // Append it to the head element
    }
  }, [location, description]);

  return null;
}
