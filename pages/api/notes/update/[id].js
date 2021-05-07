import { getSession } from "next-auth/client";
import Note from "../../../../models/Note";
import dbConnect from "../../../../helpers/dbConnect";

export default async (req, res) => {
  const user = await getSession({ req });

  if (!user) return res.json({ error: "user not logged in" });
  await dbConnect();

  if (req.method === "GET") {
    let note = await Note.findOne({ user: user.id, _id: req.query.id }).lean();
    return res.json({ note });
  }

  if (req.method === "PUT") {
    let note = await Note.findOneAndUpdate(
      {
        user: user.id,
        _id: req.query.id,
      },
      { title: req.body.title, body: req.body.body },
      (err, doc) => console.log(doc)
    );
  }
  res.end();
};
