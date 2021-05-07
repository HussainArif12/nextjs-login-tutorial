import { getSession } from "next-auth/client";
import Note from "../../../models/Note";
import dbConnect from "../../../helpers/dbConnect";

export default async (req, res) => {
  const user = await getSession({ req });
  await dbConnect();
  if (!user) return res.json({ error: "Not logged in" });

  const note = await Note.findOne({ _id: req.query.id, user: user.id });

  return res.json({ note });
};
