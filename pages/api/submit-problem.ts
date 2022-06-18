////////////////////////////////////////////////////////////////////
//imports
import connectMongo from "../../lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import {
  findUserCreateUserHandler,
  updateUserHandler,
} from "../../controllers/userController";
//////////////////////////////////////////////////////////////////////

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  try {
    //pull the important information from the request body
    const { userObject, attemptsRemaining, problemDate } = req.body;

    //find logged in user
    const user = await findUserCreateUserHandler(userObject);
    console.log(`submit problem : user`, user, "\n\n");

    //update the users stats
    await updateUserHandler(user, attemptsRemaining, problemDate);

    //set response code, send status message
    res.status(200).json({ message: "user profile has been updated" });
  } catch (error) {
    //if there was a problem log it to the console.

    console.error(error);
    res.status(500).json("something went wrong");
  }
};

export default handler;
