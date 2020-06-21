import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export default function AddComment(props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [commentBody, setCommentBody] = useState('');

  const handleChangeInput = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'bodyComment':
        setCommentBody(event.target.value);
        break;
      default:
        console.log('unrecognized type');
        break;
    }
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    addCommentFetch(props.postId);
  };

  const addCommentFetch = (postId) => {
    fetch(`https://jsonplaceholder.typicode.com/comments`, {
      method: 'POST',
      body: JSON.stringify({
        postId: postId,
        id: uuidv4(),
        name: name,
        email: email,
        body: commentBody,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  return (
    <section className="posts">
      <form>
        <label>
          Name:{' '}
          <input
            type="text"
            name="name"
            value={name}
            required
            onChange={handleChangeInput}
          />
        </label>
        <br />
        <label>
          Email:{' '}
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChangeInput}
          />
        </label>
        <br />
        <textarea
          name="bodyComment"
          value={commentBody}
          onChange={handleChangeInput}
        >
          Write comment...
        </textarea>
        <button type="submit" onClick={handleAddComment}>
          Add comment
        </button>
      </form>
    </section>
  );
}
