import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatWindow = ({ selectedUser, currentUser }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!selectedUser) return;
        setLoading(true);
        axios.get(`/api/messages/${selectedUser.id}`)
            .then(res => {
                setMessages(res.data);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        axios.post('/api/messages', {
            receiver_id: selectedUser.id,
            content: newMessage,
        }).then(res => {
            setMessages(prev => [...prev, res.data]);
            setNewMessage('');
        }).catch(err => console.error(err));
    };

    if (!selectedUser) {
        return (
            <div className="bg-white rounded-xl p-4 h-full flex items-center justify-center">
                <p className="text-gray-500">Select a conversation</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl flex flex-col h-full min-h-[400px] border border-gray-100">
            <div className="p-4 border-b border-gray-100">
                <h3 className="text-gray-900 font-semibold">{selectedUser.name}</h3>
                <p className="text-gray-500 text-sm capitalize">{selectedUser.role || 'User'}</p>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[400px]">
                {loading && <p className="text-gray-500">Loading...</p>}
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender_id === currentUser?.id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] px-4 py-2 rounded-xl ${msg.sender_id === currentUser?.id ? 'bg-gold text-white' : 'bg-gray-100 text-gray-900'}`}>
                            <p className="text-sm break-words">{msg.content}</p>
                            <p className="text-xs opacity-70 mt-1">{new Date(msg.created_at).toLocaleTimeString()}</p>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-50 text-gray-900 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gold/50 border border-gray-200"
                />
                <button type="submit" className="bg-gold text-white font-semibold px-6 py-2 rounded-xl hover:bg-gold-light transition">
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
