import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentCard from './CommentCard'

const ForumScreen = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState("");
  const { forumId } = useParams();

  const getData = () => {
    axios
      .get(`/api/getforum/${forumId}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReply = {
      forumId: forumId,
      comment: reply,
      userId: 1,
    };
    axios
      .post("/api/newComment", newReply)
      .then((res) => {
        console.log(res.data);
        let newData = {...data}
        newData.comments.push(res.data)
        setData({...newData})
      })
      .catch((err) => {
        console.error(err);
      });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  let commentDisplay = data.comments.map((comment) => <CommentCard comment={comment} />);

  return (
    <div>
      <h1>{data.title}</h1>
      <h5>{data.prompt}</h5>
      <form onSubmit={handleSubmit}>
        <textarea
          cols="30"
          rows="10"
          placeholder="Add a Reply"
          onChange={(e) => setReply(e.target.value)}
        ></textarea>
        <button>Reply</button>
      </form>
      <div className="forum-card-container">
        {commentDisplay}
      </div>
    </div>
  );
};

export default ForumScreen;
