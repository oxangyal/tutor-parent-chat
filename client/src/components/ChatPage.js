import React, { useEffect, useState } from "react";

import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";

const ChatPage = ({ socket }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Define a function to handle new messages
        const handleNewMessage = (data) => {
            // Update the messages state by spreading the previous messages and adding the new one
            setMessages((prevMessages) => [...prevMessages, data]);
        };

        // Listen for "messageResponse" events from the server and call the handler function
        socket.on("messageResponse", handleNewMessage);

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off("messageResponse", handleNewMessage);
        };
    }, [socket]); // Re-run this effect whenever the "socket" prop changes

    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody messages={messages} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    );
};

export default ChatPage;
