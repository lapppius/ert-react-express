import { useEffect, useState, useMemo } from "react";
import RadiosList from "../../components/Admin/RadiosList";
import CreateRadio from "../../components/Admin/CreateRadio";

export default function AdminRadios() {
  const [adminRadios, setAdminRadios] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch("/api/radios")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setIsLoading(false);
        setAdminRadios(res);
      });
  }, [refresh]);

  const adminRadiosList = useMemo(() => adminRadios, [adminRadios]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  return (
    <>
      <p>Admin Radios console</p>
      <CreateRadio handleRefresh={handleRefresh} />
      {!isLoading ? (
        <RadiosList
          adminRadios={adminRadiosList}
          handleRefresh={handleRefresh}
        />
      ) : null}
    </>
  );
}
