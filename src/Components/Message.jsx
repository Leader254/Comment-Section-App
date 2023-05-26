/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";

const Message = ({ message, onReply, onDelete, onEdit }) => {
  // State variables
  const [reply, setReply] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deletionID, setDeletionID] = useState(undefined);
  const [editMode, setEditMode] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [replyingToReply, setReplyingToReply] = useState("");

  // Reply handler
  const handleReply = () => {
    const repliedTimestamp = new Date().toLocaleString(); // Get the current timestamp
    const updatedMessage = {
      ...message,
      replies: [
        ...(message.replies || []),
        {
          id: Math.random().toString(),
          content: reply,
          timestamp: repliedTimestamp // Include the timestamp in the replied message
        },
      ],
    };

    onReply(updatedMessage, repliedTimestamp); // Pass the timestamp when calling onReply
    setReply("");
  };



  // Delete message handler
  const handleDelete = (id) => {
    setShowModal(true);
    setDeletionID(id);
  };

  // Confirm delete handler
  const handleConfirmDelete = () => {
    onDelete(deletionID);
    setShowModal(false);
    // setDeletionID(undefined);
  };

  // Cancel delete handler
  const handleCancelDelete = () => {
    setShowModal(false);
    // setDeletionID(undefined);
  };

  // Edit mode handler
  const handleEdit = () => {
    setEditMode(true);
    setCommentValue(message.content);
  };

  // Submit edited message handler
  const submitEditHandler = (e) => {
    e.preventDefault();
    onEdit(message.id, commentValue);
    setEditMode(false);
    setCommentValue("");
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
          <div className="main2">
            <div className="icons-and-time">
              <div className="timestamp">
                <p style={{ color: " #888" }} className="time">
                  {message.timestamp}
                </p>
              </div>
              <div className="message-actions">
                {/* Reply button */}
                <button className="reply-btn btns " onClick={() => setReplyingToReply(message.id)}>
                  <svg width="14" height="13" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z"
                      fill="#5357B6"
                    />
                  </svg>
                  Reply
                </button>
                {/* Edit button */}
                <button className="edit-btn btns" onClick={handleEdit}>
                  <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z"
                      fill="#5357B6"
                    />
                  </svg>
                  Edit
                </button>
                {/* Delete button */}
                <button className="delete-btn2 btns" onClick={() => handleDelete(message.id)}>
                  <svg width="12" height="14" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z"
                      fill="#ED6368"
                    />
                  </svg>
                  Delete
                </button>
              </div>
            </div>

            <p>{message.content}</p>
            {/* Display replies */}
            {message.replies &&
              message.replies.map((reply) => (
                <div key={reply.id} className="replied-message">
                  <p className="reply">
                    Reply: {reply.content} <span className="timestamp">{reply.timestamp}</span>
                  </p>
                  {/* Display nested replies */}
                  {reply.nestedReplies &&
                    reply.nestedReplies.map((nestedReply) => (
                      <p key={nestedReply.id} className="nested-reply">
                        Reply: {nestedReply.content}
                        <span className="timestamp">{nestedReply.timestamp}</span>
                      </p>
                    ))}
                    
                </div>
              ))}

            {/* Reply input */}
            <div className="replying">
              {replyingToReply === message.id && (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }} className="reply-container">
                  <input style={{ border: "none", outline: "none", width: "100%", borderRadius: "5px" }}
                    type="text"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Enter your reply..."
                  />
                  <div className="send-btn">
                    <button style={{ borderRadius: "5px", marginBottom: "0", backgroundColor: "black", color: "white", fontWeight: "400" }} onClick={handleReply}>Send Reply</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {showModal && deletionID !== undefined && (
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
