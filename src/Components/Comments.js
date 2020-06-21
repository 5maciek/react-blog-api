import React, { useEffect, useState } from 'react';
import AddComment from './AddComment';

export default function Comments(props) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const { postId } = props;
    if (postId !== undefined && postId !== null) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => response.json())
        .then((response) => {
          setComments(response);
        })
        .catch((error) => console.log(error));
    }

    return () => {
      setComments(null);
    };
  }, [props.showComments]);

  return (
    <section className="comments">
      {props.showComments ? (
        <ul className="comments__list">
          <>
            {comments
              ? comments.map((comment) => (
                  <li key={comment.id}>
                    <h4 className="comment__name">{comment.name}</h4>
                    <h5 className="comment__email">{comment.email}</h5>
                    <p className="comment__body"> {comment.body}</p>
                  </li>
                ))
              : null}
            <AddComment postId={props.postId} />
          </>
        </ul>
      ) : null}
    </section>
  );
}
