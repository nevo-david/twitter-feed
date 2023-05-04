// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from "@twitterfeed/helper/db";
import {registerAndCreateANewTweet} from "@twitterfeed/helper/novu";

type Data = {
  send: boolean;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  db.push(req.body);
  registerAndCreateANewTweet(req.body);

  res.send({send: true});
}
