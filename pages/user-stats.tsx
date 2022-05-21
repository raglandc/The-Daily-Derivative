import { NextPage } from "next";
import { useSession } from "next-auth/react";

const UserStatsPage: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return <div>Hey {session.user?.name}, your statistics are: </div>;
  } else {
    return <div>Please sign in to see your scores</div>;
  }
};
export default UserStatsPage;
