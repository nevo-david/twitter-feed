// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "@twitterfeed/helper/db";
import {
  addToTopic,
  registerAndCreateANewTweet,
  sendNotification,
} from "@twitterfeed/helper/novu";

type Data = {
  send: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  db.push(req.body);
  await addToTopic({ ...req.body, id: req.body.parentId });
  await sendNotification({ ...req.body, id: req.body.parentId });

  res.send({ send: true });
}
