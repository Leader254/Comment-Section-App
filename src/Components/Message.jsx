/* eslint-disable react/prop-types */
import { useState } from "react";

const Message = ({ message, onReply, onDelete, onEdit }) => {
  // State variables
  const [reply, setReply] = useState(""); // Holds the value of the reply input field
  const [showModal, setShowModal] = useState(false); // Controls the visibility of the delete confirmation modal
  const [deletionID, setDeletionID] = useState(undefined); // Stores the ID of the message to be deleted
  const [editMode, setEditMode] = useState(false); // Tracks whether the message is in edit mode
  const [commentValue, setCommentValue] = useState(""); // Holds the value of the comment input field in edit mode
  const [replyingToReply, setReplyingToReply] = useState(""); // Tracks the ID of the message being replied to

  // Reply handling
  const handleReply = () => {
    const repliedTimestamp = new Date().toLocaleString();
    const updatedMessage = {
      ...message,
      replies: [
        ...(message.replies || []),
        {
          id: Math.random().toString(),
          content: reply,
          timestamp: repliedTimestamp
        },
      ],
    };

    onReply(updatedMessage, repliedTimestamp); // Call the onReply function with the updated message
    setReply(""); // Clear the reply input field
  };

  // Delete handling
  const handleDelete = (id) => {
    setShowModal(true); // Show the delete confirmation modal
    setDeletionID(id); // Set the ID of the message to be deleted
  };

  const handleConfirmDelete = () => {
    onDelete(deletionID); // Call the onDelete function with the deletion ID
    setShowModal(false); // Hide the delete confirmation modal
  };

  const handleCancelDelete = () => {
    setShowModal(false); // Hide the delete confirmation modal without deleting the message
  };

  // Edit handling
  const handleEdit = () => {
    setEditMode(true); // Enter edit mode
    setCommentValue(message.content); // Set the comment input field value to the current message content
  };

  const submitEditHandler = (e) => {
    e.preventDefault();
    onEdit(message.id, commentValue); // Call the onEdit function with the message ID and updated comment value
    setEditMode(false); // Exit edit mode
    setCommentValue(""); // Clear the comment input field
  };

  return (
    <div className="message">
      <div className="message-content">
        {editMode ? (
          // Edit mode
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
          // View mode
          <div className="main2">
            <div className="icons-and-time">
              <div className="timestamp">
                <p style={{ color: "#888" }} className="time">
                  {message.timestamp}
                </p>
              </div>
              <div className="message-actions">
                <button className="reply-btn btns" onClick={() => setReplyingToReply(message.id)}>
                  Reply
                </button>
                <button className="edit-btn btns" onClick={handleEdit}>
                  Edit
                </button>
                <button className="delete-btn2 btns" onClick={() => handleDelete(message.id)}>
                  Delete
                </button>
              </div>
            </div>

            <p>{message.content}</p>

            {message.replies &&
              message.replies.map((reply) => (
                <div key={reply.id} className="replied-message">
                  <p className="reply">
                    Reply: {reply.content} <span className="timestamp">{reply.timestamp}</span>
                  </p>
                  {reply.nestedReplies &&
                    reply.nestedReplies.map((nestedReply) => (
                      <p key={nestedReply.id} className="nested-reply">
                        Reply: {nestedReply.content}
                        <span className="timestamp">{nestedReply.timestamp}</span>
                      </p>
                    ))}
                </div>
              ))}

            <div className="replying">
              {replyingToReply === message.id && (
                // Reply input field for replying to a message
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="reply-container">
                  <input
                    style={{ border: "none", outline: "none", width: "100%", borderRadius: "5px" }}
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Enter your reply..."
                  />
                  <div className="send-btn">
                    <button
                      style={{ borderRadius: "5px", marginBottom: "0", backgroundColor: "black", color: "white", fontWeight: "400" }}
                      onClick={handleReply}
                    >
                      Send Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showModal && deletionID !== undefined && (
        // Delete confirmation modal
        <div className="delete-confirmation-wrapper">
          <div className="delete-container">
            <div className="title">Delete comment</div>
            <div className="confirmation-message">
              Are you sure you want to delete this comment? This will remove the
              comment and cannot be undone.
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
