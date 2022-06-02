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
    console.log(`request body`, req.body);

    const { session, attemptsRemaining } = req.body;

    //find logged in user
    const user = await findUserCreateUserHandler(session);
    //update the users stats
    await updateUserStatsHandler(user, attemptsRemaining);

    //set response code, send status message
    res.status(200).json({ message: "user profile has been updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json("something went wrong");
  }
};

export default handler;
