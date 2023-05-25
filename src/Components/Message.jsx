import React, { useState } from 'react';

const Message = ({ message, onReply, onDelete, onEdit }) => {
  const [reply, setReply] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deletionID, setDeletionID] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState('');
  const [replyingToReply, setReplyingToReply] = useState('');

  const handleReply = () => {
    onReply(message.id, reply);
    setReply('');
    setReplyingToReply('');
  };

  const handleDelete = (id) => {
    setShowModal(true);
    setDeletionID(id);
  };

  const handleConfirmDelete = () => {
    onDelete(deletionID);
    setShowModal(false);
    setDeletionID(undefined);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setDeletionID(undefined);
  };

  const handleEdit = () => {
    setEditMode(true);
    setCommentValue(message.content);
  };

  const submitEditHandler = (e) => {
    e.preventDefault();
    onEdit(message.id, commentValue);
    setEditMode(false);
    setCommentValue('');
  };

  return (
    <div className="message">
      <div className="message-content">
        {editMode ? (
          <div className="edit-container">
            <form onSubmit={submitEditHandler}>
              <textarea
                type="text"
                name="reply-text"
                id="reply-text"
                value={commentValue}
                onChange={(e) => setCommentValue(e.target.value)}
                placeholder="Add a comment"
              />
              <button type="submit" className="btn update-comment__send-btn">
                UPDATE
              </button>
            </form>
          </div>
        ) : (
          <>
            <p>{message.content}</p>
            {message.replies &&
              message.replies.map((reply) => (
                <div key={reply.id} className="replied-message">
                  <p className="reply">Reply: {reply.content}</p>
                  {reply.nestedReplies &&
                    reply.nestedReplies.map((nestedReply) => (
                      <p key={nestedReply.id} className="nested-reply">
                        Reply: {nestedReply.content}
                      </p>
                    ))}
                </div>
              ))}
            <p className="time">{message.timestamp}</p>
            {replyingToReply === message.id && (
              <div className="reply-container">
                <textarea
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Enter your reply"
                />
                <button onClick={handleReply}>Send Reply</button>
              </div>
            )}
          </>
        )}
      </div>
      <div className="message-actions">
        <button onClick={() => setReplyingToReply(message.id)}>Reply</button>
        <button onClick={handleEdit}>Edit</button>
        <button onClick={() => handleDelete(message.id)}>Delete</button>
      </div>

      {showModal && deletionID !== undefined && (
        <div className="delete-confirmation-wrapper">
          <div className="delete-container">
            <div className="title">Delete comment</div>
            <div className="confirmation-message">
              Are you sure you want to delete this comment? This will remove the comment and cannot
              be undone.
            </div>
            <div className="btn-container">
              <button className="cancel-btn" onClick={handleCancelDelete}>
                No, cancel
              </button>
              <button className="delete-btn" onClick={handleConfirmDelete}>
                Yes, delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
