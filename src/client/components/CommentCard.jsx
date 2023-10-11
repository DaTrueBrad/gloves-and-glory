import React from 'react'

const CommentCard = ({comment}) => {
  return (
    <div className='comment-card'>
      <small>@{comment.user.username}</small>
      <p>{comment.comment}</p>
    </div>
  )
}

export default CommentCard