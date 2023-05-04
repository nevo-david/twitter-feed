import {useState} from "react";
import LoginComponent from "@twitterfeed/components/login.component";
import FeedComponent from "@twitterfeed/components/feed.component";
import {db} from "@twitterfeed/helper/db";

export default function Home({db}) {
  const [login, setLogin] = useState('');

  return (
    <>
      {login ? <FeedComponent db={db} login={login} /> : <LoginComponent setLogin={setLogin} />}
    </>
  )
}

export const getServerSideProps = () => {
  return {
    props: {
      db
    }
  }
}