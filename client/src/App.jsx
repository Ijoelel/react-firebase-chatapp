import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { auth } from "./lib/firebase";
import { useChatStore } from "./lib/chatStore";
import { onAuthStateChanged } from "firebase/auth";
import { useUserStore } from "./lib/userStore";

const App = () => {
    const { currentUser, isLoading, fetchUserInfo } = useUserStore();
    const chatStore = useChatStore();

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            fetchUserInfo(user?.uid);
        });

        return () => {
            unSub();
        };
    }, [fetchUserInfo]);

    if (isLoading) return <div className="loading">Loading...</div>;

    return (
        <div className="container">
            {currentUser ? (
                <>
                    <List />
                    {chatStore.chatId && <Chat />}
                    {chatStore.chatId && <Detail />}
                </>
            ) : (
                <Login />
            )}
            <Notification />
        </div>
    );
};
export default App;
