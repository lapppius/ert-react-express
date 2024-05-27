import PageDescription from "../components/PageDescription";
import PageTitle from "../components/PageTitle";
import RadiosList from "../components/RadiosList";
import { useEffect, useState, useMemo } from "react";

export default function Radios({ title }) {
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
  return (
    <>
      {isLoading ? undefined : (
        <>
          <RadiosList radios={loadedRadios} />
          <PageTitle title={title} />
          <PageDescription
            description={
              "Όλοι οι ραδιοφωνικοί σταθμοί της ΕΡΤ σε μια εφαρμογή."
            }
          />
        </>
      )}
    </>
  );
}
