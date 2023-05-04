import { FC, useState } from "react";
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from "@novu/notification-center";
import { DB } from "@twitterfeed/helper/db.interface";
import TweetComponent from "@twitterfeed/components/tweet.component";
import { makeid } from "@twitterfeed/helper/makeid";
import { axiosInstance } from "@twitterfeed/helper/axios";

const FeedComponent: FC<{ login: string; db: DB[] }> = (props) => {
  const { login, db } = props;
  const [localDb, setLocalDb] = useState(db);

  const [comment, setComment] = useState("");

  const addComment = () => {
    const id = makeid(5);
    setLocalDb([
      ...localDb,
      {
        id,
        comment,
        username: login,
        children: [],
      },
    ]);

    axiosInstance.post("/api/add-comment", {
      id,
      comment,
      username: login,
      children: [],
    });

    setComment("");
  };

  const addCommentToComment = (commentId: string, comment: string) => {
    const id = makeid(5);

    axiosInstance.post("/api/add-comment-to-comment", {
      parentId: commentId,
      id,
      comment,
      username: login,
      children: [],
    });

    setLocalDb([
      ...localDb.map((item) => {
        if (item.id !== commentId) {
          return item;
        }

        return {
          ...item,
          children: [
            ...item.children,
            {
              id,
              comment,
              username: login,
              children: [],
            },
          ],
        };
      }),
    ]);
  };

  return (
    <NovuProvider subscriberId={login} applicationIdentifier="z-uqto-7iALL">
      <div className="max-w-lg mx-auto text-white">
        <div className="flex">
          <h1 className="flex-1 text-2xl font-bold my-8 text-white">
            Twitter Feed
          </h1>
          <div className="flex items-center">
            <PopoverNotificationCenter onNotificationClick={() => {}}>
              {({ unseenCount }) => (
                <NotificationBell unseenCount={unseenCount || 0} />
              )}
            </PopoverNotificationCenter>
          </div>
        </div>
        <div className="mb-5 text-black flex">
          <input
            name="tweet"
            placeholder="comment"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <button
            className="bg-violet-950 ml-2 text-white pl-4 pr-4"
            onClick={addComment}
          >
            Add
          </button>
        </div>
        {localDb.map((item) => (
          <TweetComponent
            depth={0}
            addComment={addCommentToComment}
            item={item}
            key={item.id}
          />
        ))}
      </div>
    </NovuProvider>
  );
};

export default FeedComponent;
