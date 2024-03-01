import React from "react";
import { useNavigate } from "react-router-dom";

const ChatBody = ({ messages }) => {
    const navigate = useNavigate();

    const handleLeaveChat = () => {
        localStorage.removeItem("userName");
        navigate("/");
        window.location.reload();
    };

    return (
        <>
            <header className="chat__mainHeader">
                <p>Parent and Tutor Chat</p>
                <button className="leaveChat__btn" onClick={handleLeaveChat}>
                    LEAVE CHAT
                </button>
            </header>

            <div className="message__container">
                {messages.map((message) => (
                    <div className="message__chats" key={message.id}>
                        {message.name === localStorage.getItem("userName") ? (
                            <>
                                <p className="sender__name">You</p>
                                <div className="message__sender">
                                    <p>{message.text}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <p>{message.name}</p>
                                <div className="message__recipient">
                                    <p>{message.text}</p>
                                </div>
                            </>
                        )}
                    </div>
                ))}

                {/* This shows messages sent from you */}
                {/* <div className="message__container">
                    <div className="message__chats">
                        <p className="sender__name">You</p>
                        <div className="message__sender">
                            <p>Hello there</p>
                        </div>
                    </div>
                </div> */}

                {/* This shows messages received by you */}
                {/* <div className="message__chats">
                    <p>Other</p>
                    <div className="message__recipient">
                        <p>Hey, I'm good, you?</p>
                    </div>
                </div> */}

                {/* This is triggered when a user is typing */}
                <div className="message__status">
                    <p>Someone is typing...</p>
                </div>
            </div>
        </>
    );
};

export default ChatBody;
