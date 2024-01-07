"use client";
import styles from "./page.module.css";
import { io } from "socket.io-client";
import { useState } from "react";
import ChatPage from "@/components/chatPage";
import { useSearchParams } from "next/navigation";

export default function Chat() {
    const searchParams = useSearchParams();

    const [showChat, setShowChat] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);

    const orderId = searchParams.get("orderId") ?? "0001";
    const userId = searchParams.get("userName") ?? "User";
    const [roomId] = useState(orderId);
    const [userName] = useState(userId);

    var socket: any;
    socket = io("https://olivessocketserver.xoanon.uk/");

    const handleJoin = () => {
        if (userName !== "" && roomId !== "") {
            socket.emit("join_room", roomId);
            setShowSpinner(true);
            setTimeout(() => {
                setShowChat(true);
                setShowSpinner(false);
            }, 4000);
        } else {
            alert("Please fill in Username and Room Id");
        }
    };

    return (
        <div data-theme="mytheme">
            <div
                className={styles.main_div}
                style={{ display: showChat ? "none" : "" }}
            >
                <input
                    className="hidden"
                    type="text"
                    placeholder="Username"
                    value={userName}
                    disabled={showSpinner}
                    readOnly
                />
                <input
                    className="hidden"
                    type="text"
                    placeholder="Room Id"
                    disabled={showSpinner}
                    value={orderId}
                    readOnly
                />
                <button
                    className="btn btn-primary w-full max-w-xs"
                    onClick={() => handleJoin()}
                >
                    {!showSpinner ? (
                        "Join"
                    ) : (
                        <div className={styles.loading_spinner}></div>
                    )}
                </button>
            </div>
            <div style={{ display: !showChat ? "none" : "" }}>
                <ChatPage socket={socket} roomId={roomId} username={userName} />
            </div>
        </div>
    );
}
