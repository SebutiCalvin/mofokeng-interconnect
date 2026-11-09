import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatList = ({ onSelectUser }) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/messages/conversations')
            .then(res => {
                setConversations(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, []);

    if (loading) return <div className="text-gray-500 p-4">Loading conversations...</div>;

    return (
        <div className="bg-white rounded-xl p-4 h-full">
            <h3 className="text-gray-900 font-semibold mb-3">Messages</h3>
            {conversations.length === 0 && (
                <p className="text-gray-500 text-sm">No conversations yet.</p>
            )}
            {conversations.map(conv => (
                <div
                    key={conv.user.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition"
                    onClick={() => onSelectUser(conv.user)}
                >
                    <div className="min-w-0">
                        <p className="text-gray-900 font-medium truncate">{conv.user.name}</p>
                        <p className="text-gray-500 text-sm truncate max-w-[150px]">
                            {conv.last_message?.content || 'No messages'}
                        </p>
                    </div>
                    {conv.unread_count > 0 && (
                        <span className="bg-gold text-white text-xs font-bold px-2 py-1 rounded-full flex-shrink-0">
                            {conv.unread_count}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ChatList;
