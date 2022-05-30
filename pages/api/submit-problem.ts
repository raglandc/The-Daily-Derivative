//import request and response types
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

//controller imports
import {
  findUserCreateUserHandler,
  updateUserStatsHandler,
} from "../../controllers/userController";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    const session = await getSession({ req });

    // console.log("session: ", session);

    if (session) {
      //user logged in
      //find logged in user
      //   const user = await findUserCreateUserHandler();
      //update the users stats
      //   await updateUserStatsHandler(user, 1);

      //set response code, send status message
      res.status(200).json({ message: "user profile has been updated" });
    } else {
      //no user logged in
      res.status(200).json({
        message: "success, but you are not logged in to save anything",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

export default handler;
