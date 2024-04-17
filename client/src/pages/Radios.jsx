import RadiosList from "../components/RadiosList";
import { useEffect, useState, useMemo } from "react";

export default function Radios() {
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState({});

  useEffect(() => {
    fetch("/api/radios")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setIsLoading(false);
        setLoaded(response);
      });
  }, []);

  const loadedRadios = useMemo(() => loaded, [loaded]);
  return <>{isLoading ? undefined : <RadiosList radios={loadedRadios} />}</>;
}
