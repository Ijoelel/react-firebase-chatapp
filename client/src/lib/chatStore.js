class ChatStore {
    constructor() {
        this.chatId = null;
        this.user = null;
        this.isCurrentUserBlocked = false;
        this.isReceiverBlocked = false;
    }

    changeChat(chatId, user, currentUser) {
        if (!currentUser) {
            console.error("Current user is undefined.");
            return;
        }

        if (user.blocked.includes(currentUser.id)) {
            this.chatId = chatId;
            this.user = null;
            this.isCurrentUserBlocked = true;
            this.isReceiverBlocked = false;
        } else if (currentUser.blocked.includes(user.id)) {
            this.chatId = chatId;
            this.user = user;
            this.isCurrentUserBlocked = false;
            this.isReceiverBlocked = true;
        } else {
            this.chatId = chatId;
            this.user = user;
            this.isCurrentUserBlocked = false;
            this.isReceiverBlocked = false;
        }
    }

    changeBlock() {
        this.isReceiverBlocked = !this.isReceiverBlocked;
    }

    resetChat() {
        this.chatId = null;
        this.user = null;
        this.isCurrentUserBlocked = false;
        this.isReceiverBlocked = false;
    }

    getState() {
        return {
            chatId: this.chatId,
            user: this.user,
            isCurrentUserBlocked: this.isCurrentUserBlocked,
            isReceiverBlocked: this.isReceiverBlocked,
        };
    }
}

export const chatStoreInstance = new ChatStore();
export const useChatStore = () => chatStoreInstance;

// import { create } from "zustand";
// import { useUserStore } from "./userStore";

// export const useChatStore = create((set) => ({
//     chatId: null,
//     user: null,
//     isCurrentUserBlocked: false,
//     isReceiverBlocked: false,
//     changeChat: (chatId, user) => {
//         const currentUser = useUserStore.getState().currentUser;

//         // CHECK IF CURRENT USER IS BLOCKED
//         if (user.blocked.includes(currentUser.id)) {
//             return set({
//                 chatId,
//                 user: null,
//                 isCurrentUserBlocked: true,
//                 isReceiverBlocked: false,
//             });
//         }

//         // CHECK IF RECEIVER IS BLOCKED
//         else if (currentUser.blocked.includes(user.id)) {
//             return set({
//                 chatId,
//                 user: user,
//                 isCurrentUserBlocked: false,
//                 isReceiverBlocked: true,
//             });
//         } else {
//             return set({
//                 chatId,
//                 user,
//                 isCurrentUserBlocked: false,
//                 isReceiverBlocked: false,
//             });
//         }
//     },

//     changeBlock: () => {
//         set((state) => ({
//             ...state,
//             isReceiverBlocked: !state.isReceiverBlocked,
//         }));
//     },

//     resetChat: () => {
//         set({
//             chatId: null,
//             user: null,
//             isCurrentUserBlocked: false,
//             isReceiverBlocked: false,
//         });
//     },
// }));
