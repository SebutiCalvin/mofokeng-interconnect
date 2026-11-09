import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Search,
    Filter,
    MessageCircle,
    User,
    Mail,
    Clock,
    CheckCircle,
    CheckCheck,
    Send,
    Paperclip,
    Smile,
    MoreVertical,
    Archive,
    Trash2,
    Pin,
    Star,
    Reply,
    Forward,
    Phone,
    Video,
    Info,
    X,
    ArrowLeft
} from 'lucide-react';

const ClientMessages = () => {
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [activeTab, setActiveTab] = useState('inbox');

    const conversations = [
        {
            id: 1,
            name: 'Mwangi Construction Ltd',
            avatar: 'MC',
            lastMessage: 'Thank you for your inquiry. We have prepared a quote for...',
            time: '2 hours ago',
            unread: 2,
            online: true,
            project: 'Modern Eco Villa'
        },
        {
            id: 2,
            name: 'Lesotho Building Co.',
            avatar: 'LB',
            lastMessage: 'We are available for the project starting next month...',
            time: '5 hours ago',
            unread: 1,
            online: false,
            project: 'Luxury Mansion'
        },
        {
            id: 3,
            name: 'EcoBuild Africa',
            avatar: 'EA',
            lastMessage: 'We have added new sustainable projects to our portfolio...',
            time: '1 day ago',
            unread: 0,
            online: true,
            project: 'Green Housing Project'
        },
    ];

    const messages = [
        {
            id: 1,
            sender: 'client',
            content: 'Hi, I saw your Modern Eco Villa project and I\'m very impressed.',
            time: '10:30 AM',
            read: true
        },
        {
            id: 2,
            sender: 'constructor',
            content: 'Thank you! We\'re glad you liked it. We can build something similar for you.',
            time: '10:32 AM',
            read: true
        },
        {
            id: 3,
            sender: 'client',
            content: 'Great! What would be the estimated timeline for a similar project?',
            time: '10:35 AM',
            read: true
        },
        {
            id: 4,
            sender: 'constructor',
            content: 'Typically 6-8 months depending on the scale. We can discuss more details.',
            time: '10:40 AM',
            read: true
        },
    ];

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.project.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (newMessage.trim()) {
            setNewMessage('');
        }
    };

    return (
        <div className="min-h-screen bg-[#FAF8F5] py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-['Playfair_Display'] font-bold text-[#0A1628]">
                            Messages
                        </h1>
                        <p className="text-gray-600 mt-1">View and manage your conversations</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="px-4 py-2.5 bg-white rounded-xl shadow-sm hover:shadow-card transition-all duration-300 flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Conversations List */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-card overflow-hidden">
                            <div className="p-4 border-b border-gray-100">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search messages..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                                {filteredConversations.map((conv) => (
                                    <button
                                        key={conv.id}
                                        onClick={() => setSelectedConversation(conv)}
                                        className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                                            selectedConversation?.id === conv.id ? 'bg-gold/5' : ''
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="relative">
                                                <div className="w-12 h-12 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold">
                                                    {conv.avatar}
                                                </div>
                                                {conv.online && (
                                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <p className="font-semibold text-[#0A1628]">{conv.name}</p>
                                                    <span className="text-xs text-gray-400">{conv.time}</span>
                                                </div>
                                                <p className="text-sm text-gray-500 truncate">{conv.lastMessage}</p>
                                                <p className="text-xs text-gray-400 mt-1">{conv.project}</p>
                                            </div>
                                            {conv.unread > 0 && (
                                                <span className="flex-shrink-0 w-5 h-5 bg-gold rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                    {conv.unread}
                                                </span>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Chat Area */}
                    <div className="lg:col-span-2">
                        {selectedConversation ? (
                            <div className="bg-white rounded-2xl shadow-card overflow-hidden h-full flex flex-col">
                                {/* Chat Header */}
                                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold">
                                                {selectedConversation.avatar}
                                            </div>
                                            {selectedConversation.online && (
                                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#0A1628]">{selectedConversation.name}</p>
                                            <p className="text-xs text-gray-400">{selectedConversation.project}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Phone className="w-5 h-5 text-gray-400" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Video className="w-5 h-5 text-gray-400" />
                                        </button>
                                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <MoreVertical className="w-5 h-5 text-gray-400" />
                                        </button>
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[400px]">
                                    {messages.map((msg) => (
                                        <div
                                            key={msg.id}
                                            className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div className={`max-w-[70%] rounded-2xl p-3 ${
                                                msg.sender === 'client'
                                                    ? 'bg-gold text-[#0A1628]'
                                                    : 'bg-gray-100 text-[#0A1628]'
                                            }`}>
                                                <p className="text-sm">{msg.content}</p>
                                                <p className={`text-xs mt-1 ${
                                                    msg.sender === 'client' ? 'text-[#0A1628]/60' : 'text-gray-400'
                                                }`}>
                                                    {msg.time}
                                                    {msg.sender === 'client' && (
                                                        <CheckCheck className="w-3 h-3 inline ml-1" />
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="p-4 border-t border-gray-100">
                                    <form onSubmit={handleSendMessage} className="flex gap-2">
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Paperclip className="w-5 h-5 text-gray-400" />
                                        </button>
                                        <button type="button" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                            <Smile className="w-5 h-5 text-gray-400" />
                                        </button>
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type a message..."
                                            className="flex-1 px-4 py-2 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-gold transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            disabled={!newMessage.trim()}
                                            className="p-2 bg-gold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-50"
                                        >
                                            <Send className="w-5 h-5 text-[#0A1628]" />
                                        </button>
                                    </form>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-card p-12 text-center">
                                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <MessageCircle className="w-10 h-10 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-bold text-[#0A1628]">No Conversation Selected</h3>
                                <p className="text-gray-500 mt-2">Select a conversation from the list to start messaging</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientMessages;
