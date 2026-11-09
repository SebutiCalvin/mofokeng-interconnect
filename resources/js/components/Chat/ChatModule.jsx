import React, { useState } from 'react';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';

const ChatModule = ({ currentUser }) => {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
            <div className="md:col-span-1 h-full">
                <ChatList onSelectUser={setSelectedUser} />
            </div>
            <div className="md:col-span-2 h-full">
                <ChatWindow selectedUser={selectedUser} currentUser={currentUser} />
            </div>
        </div>
    );
};

export default ChatModule;
