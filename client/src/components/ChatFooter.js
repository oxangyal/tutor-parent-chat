import React, { useState } from "react";

const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState("");

    // Function to handle sending messages
    const handleSendMessage = (e) => {
        e.preventDefault();
        // Check if the message is not empty and user is signed in
        if (message.trim() && localStorage.getItem("userName")) {
            // Emit a "message" event to the server with message data
            socket.emit("message", {
                text: message,
                name: localStorage.getItem("userName"),
                id: `${socket.id}${Math.random()}`, // Unique message ID
                socketID: socket.id,
            });
            // Clear the input field after sending the message
            setMessage("");
        }
    };

    return (
        <div className="chat__footer">
            {/* Form for typing and sending messages */}
            <form className="form" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Write message"
                    className="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                {/* Button to submit the message */}
                <button className="sendBtn">SEND</button>
            </form>
        </div>
    );
};

export default ChatFooter;
