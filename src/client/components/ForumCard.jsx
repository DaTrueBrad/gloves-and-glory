import React from "react";
import { useNavigate } from "react-router-dom";

const ForumCard = ({forum}) => {
  const navigate = useNavigate()
  const handleNav = () => navigate(`/forum/${forum.id}`)

  return (
    <div className="forum-card" onClick={handleNav}>
      <div className="card-upper">
        <h3>{forum.title}</h3>
        <p>{forum.comments.length} replies</p>
      </div>
      <div className="card-lower">
        <p className="card-prompt">
          {forum.prompt}
        </p>
        <h5>@{forum.user.username}</h5>
      </div>
    </div>
  );
};

export default ForumCard;
