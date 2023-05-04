import { FC, useState } from "react";
import { DB } from "@twitterfeed/helper/db.interface";
import { makeid } from "@twitterfeed/helper/makeid";
import { axiosInstance } from "@twitterfeed/helper/axios";

const TweetComponent: FC<{
  item: DB;
  depth: number;
  addComment: (id: string, comment: string) => void;
}> = (props) => {
  const { item, addComment: addCommentFromTop, depth } = props;
  const [comment, setComment] = useState("");

  const addComment = () => {
    alert(comment);
    addCommentFromTop(item.id, comment);
    setComment("");
  };

  return (
    <>
      {depth === 0 ? (
        <div className="h-4 flex justify-center" />
      ) : (
        <div className="h-4 flex justify-center">
          <div className="h-full w-[1px] bg-white" />
        </div>
      )}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {item.username}
            </h2>
          </div>
        </div>
        <p className="text-gray-800 leading-tight mb-4">{item.comment}</p>
        <div className="flex items-center text-gray-600 text-sm">
          <div className="text-gray-600 hover:text-gray-800 mr-4 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M16.285 4.716a4.75 4.75 0 0 0-6.716 0L4.716 9.57a4.75 4.75 0 1 0 6.716 6.716l2.829 2.829a1.25 1.25 0 0 0 1.768 0l2.828-2.828a4.75 4.75 0 0 0 0-6.717l-4.854-4.854zm-1.768 4.95a2.25 2.25 0 0 1 0 3.182l-2.829 2.829a.25.25 0 0 1-.354 0l-2.828-2.828a2.25 2.25 0 0 1 0-3.182 2.25 2.25 0 0 1 3.182 0L10 12.817l1.464-1.464a2.25 2.25 0 0 1 3.182 0z" />
            </svg>
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
          </div>
        </div>
      </div>
      {item.children.map((innerItem) => (
        <TweetComponent
          depth={depth + 1}
          item={innerItem}
          addComment={addComment}
        />
      ))}
    </>
  );
};

export default TweetComponent;
