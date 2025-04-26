import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { checkIsLiked } from "../lib/utils";
import { Loader } from "lucide-react";

import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "../lib/appwrite/reac-query/queriesAndMutations";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

function CardStats({ post, userId }: PostStatsProps) {
  const likesList = post?.likes?.map((user: Models.Document) => user.$id) || [];
  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePosts } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.product?.$id === post?.$id
  );

  useEffect(() => {
    if (currentUser) {
      const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.product?.$id === post?.$id
      );
      setIsSaved(!!savedPostRecord);
    }
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();
    let newLikes = [...likes];
    const hasliked = newLikes.includes(userId);

    if (hasliked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);
    likePosts({
      postId: post?.$id || " ",
      likesArray: newLikes,
    });
  };

  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id, {
        onSuccess: () => {},
      });
      return;
    }

    savePost(
      { userId: userId, postId: post?.$id || " " },
      {
        onSuccess: () => {
          setIsSaved(true);
        },
      }
    );
  };

  return (
<div className="d-flex justify-content-between align-items-center z-20 py-1">
  <div className="d-flex align-items-center gap-1 me-3">
    <img
      src={
        checkIsLiked(likes, userId)
          ? "/assets/icons/liked.svg"
          : "/assets/icons/like.svg"
      }
      alt="like"
      width={20}
      height={20}
      onClick={handleLikePost}
      className="cursor-pointer"
      style={{ verticalAlign: "middle" }}
    />
    <p className="fw-medium small m-0">{likes.length}</p>
  </div>
  <div className="d-flex align-items-center gap-1">
    {isSavingPost ? (
      <Loader className="spinner-border text-primary" size={32} />
    ) : (
      <img
        src={
          isSaved
            ? "/assets/icons/saved.svg"
            : "/assets/icons/save.svg"
        }
        alt="save"
        width={20}
        height={20}
        onClick={handleSavePost}
        className="cursor-pointer"
        style={{ verticalAlign: "middle" }}
      />
    )}
  </div>
</div>

  );
}

export default CardStats;
