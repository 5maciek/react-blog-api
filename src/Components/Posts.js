import React, { useEffect, useState } from 'react';
import Comments from './Comments';

export default function Posts(props) {
  const [posts, setPosts] = useState([]);
  const [indexPost, setIndexPost] = useState(null);
  const [showComments, setShowComments] = useState([]);

  useEffect(() => {
    const { currentUser } = props;
    if (
      currentUser !== undefined &&
      currentUser !== null &&
      currentUser.length > 0
    ) {
      fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${props.currentUser[0].id}`
      )
        .then((response) => response.json())
        .then((response) => {
          const isShowComments = response.map((item) => false);
          setPosts(response);
          setShowComments(isShowComments);
        })
        .catch((error) => console.log(error));
    } else {
      setPosts(null);
    }

    return () => {
      setPosts(null);
      setIndexPost(null);
    };
  }, [props.currentUser]);

  const handleLoadNewPost = () => {
    setIndexPost(indexPost + 1);
  };

  const handleShowComments = (indexComment) => {
    const isShowComments = showComments.map((comment, index) => {
      if (index === indexComment) return !comment;
      else {
        return comment;
      }
    });
    setShowComments(isShowComments);
  };

  return (
    <section className="posts">
      <ul className="posts__list">
        {posts !== null
          ? posts.map((post, index) =>
              index <= indexPost ? (
                <li key={post.id} className="post">
                  <h4>{post.title}</h4>
                  <p>{post.body}</p>
                  <Comments
                    postId={post.id}
                    showComments={showComments[index]}
                  />
                  <button onClick={() => handleShowComments(index)}>
                    {showComments[index] === true
                      ? 'Hide comments'
                      : 'Show comments'}
                  </button>
                </li>
              ) : null
            )
          : null}
      </ul>
      {posts !== null ? (
        <button className="loadMorePosts" onClick={handleLoadNewPost}>
          Load more posts
        </button>
      ) : null}
    </section>
  );
}
