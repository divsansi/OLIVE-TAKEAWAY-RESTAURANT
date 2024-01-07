"use client";
import React, { useEffect, useState } from "react";
import style from "./chat.module.css";

interface IMsgDataTypes {
    roomId: String | number;
    user: String;
    msg: String;
    time: String;
}

const ChatPage = ({ socket, username, roomId }: any) => {
    const [currentMsg, setCurrentMsg] = useState("");
    const [chat, setChat] = useState<IMsgDataTypes[]>([]);

    const sendData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (currentMsg !== "") {
            const msgData: IMsgDataTypes = {
                roomId,
                user: username,
                msg: currentMsg,
                time:
                    new Date(Date.now()).getHours() +
                    ":" +
                    new Date(Date.now()).getMinutes(),
            };
            await socket.emit("send_msg", msgData);
            setCurrentMsg("");
        }
    };

    useEffect(() => {
        socket.on("receive_msg", (data: IMsgDataTypes) => {
            setChat((pre) => [...pre, data]);
        });
    }, [socket]);

    return (
        <div data-theme="mytheme" className="my-8 h-full mx-auto max-w-3xl">
            <div className="p-4">
                <div>
                    <p>
                        Order Id: <b>{roomId}</b>
                    </p>
                </div>
                <div className="mt-8">
                    {chat.map(({ roomId, user, msg, time }, key) => (
                        <div
                            key={key}
                            className={
                                user == username
                                    ? "chat chat-end"
                                    : "chat chat-start"
                            }
                        >
                            <div className="chat-bubble">{msg}</div>
                        </div>
                    ))}
                </div>
                <div className="mt-8">
                    <form
                        onSubmit={(e) => sendData(e)}
                        className="flex flex-row w-full gap-4"
                    >
                        <input
                            className="input input-bordered w-full"
                            type="text"
                            value={currentMsg}
                            placeholder="Type your message.."
                            onChange={(e) => setCurrentMsg(e.target.value)}
                        />
                        <button className="btn btn-primary">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
