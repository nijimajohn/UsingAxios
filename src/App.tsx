import "./styles.css";
import { UserCard } from "./components/UserCard";
import axios from "axios";
import { User } from "./types/api/user";
import { useState } from "react";

const user = {
  id: 1,
  name: "じゃけぇ",
  email: "1234@aaa.com",
  address: "ADDRESS"
};

export default function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const onClickFeatchUser = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}`
        }));
        setUserProfiles(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="App">
      <button onClick={onClickFeatchUser}>データ取得</button>
      <br />
      {error ? (
        <p>データの取得に失敗しました</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {userProfiles.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}

      <UserCard user={user} />
    </div>
  );
}
