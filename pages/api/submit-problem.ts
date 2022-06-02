////////////////////////////////////////////////////////////////////
//imports
import { NextApiRequest, NextApiResponse } from "next";
import {
  findUserCreateUserHandler,
  updateUserStatsHandler,
} from "../../controllers/userController";
//////////////////////////////////////////////////////////////////////

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    //pull the important information from the request body
    const { session, attemptsRemaining } = req.body;

    //find logged in user
    const user = await findUserCreateUserHandler(session);
    //update the users stats
    await updateUserStatsHandler(user, attemptsRemaining);

    //set response code, send status message
    res.status(200).json({ message: "user profile has been updated" });
  } catch (error) {
    //if there was a problem log it to the console.

    console.log(error);
    res.status(500).json("something went wrong");
  }
};

export default handler;
