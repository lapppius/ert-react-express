import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function PageDescription({ description }) {
  const location = useLocation();

  useEffect(() => {
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", description ? description : "ERT Radios");
  }, [location, description]);

  return null;
}
