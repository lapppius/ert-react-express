import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageDescription({ description }) {
  const location = useLocation();

  useEffect(() => {
    if (!description) return;
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", description);
  }, [location, description]);

  return null;
}
