import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function AdminUsers() {
  const authContext = useAuth();
  const [usersList, setUsersList] = useState([]);

  const fetchUsers = async () => {
    if (!authContext.currentUser) {
      console.log("not logged in");
      return;
    }

    fetch("/api/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authContext.currentUser.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setUsersList(res);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      {usersList?.map((user) => {
        return (
          <table>
            <tr key={user.uid}>
              <td style={{ borderRadius: "100%", overflow: "hidden" }}>
                <img src={user.photoURL} style={{ height: "40px" }} />
              </td>
              <td>{user.email}</td>
              <td>{user.displayName}</td>
            </tr>
          </table>
        );
      })}
    </>
  );
}
