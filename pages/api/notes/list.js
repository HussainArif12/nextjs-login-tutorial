import { getSession } from "next-auth/client";
import Note from "../../../models/Note";
import dbConnect from "../../../helpers/dbConnect";

export default async (req, res) => {
  const user = await getSession({ req });
  await dbConnect();

  if (user) {
    console.log("user id: " + user.id);
    const notes = await Note.find({ user: user.id }).lean();
    return res.json({ notes });
  } else res.json({ error: "Not logged in" });
};
