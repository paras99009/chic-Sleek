import { Models } from "appwrite";

type UserCardProps = {
  user: Models.Document;
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="card text-center shadow-sm p-3">
      <img
        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
        alt="creator"
        className="rounded-circle mx-auto mb-3"
        width="56"
        height="56"
      />

      <h5 className="mb-1 text-truncate">{user.name}</h5>
      <p className="text-muted small text-truncate mb-0">@{user.username}</p>
    </div>
  );
};

export default UserCard;
