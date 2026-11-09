import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    Phone,
    Video,
    Loader2
} from 'lucide-react';
import api from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

const ConstructorMessages = () => {
    const { user } = useAuth();
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [messages, setMessages] = useState([]);
    const [conversations, setConversations] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const messagesEndRef = useRef(null);

    // Mock conversations data
    useEffect(() => {
        const mockConversations = [
            {
                id: 1,
                name: 'John Mwangi',
                avatar: 'JM',
                lastMessage: 'Hi, I have some questions about the Modern Eco Villa project...',
                time: '2 hours ago',
                unread: 2,
                online: true,
                project: 'Modern Eco Villa'
            },
            {
                id: 2,
                name: 'Mary Lebeko',
                avatar: 'ML',
                lastMessage: 'We\'re looking for a contractor for a new commercial building...',
                time: '5 hours ago',
                unread: 1,
                online: false,
                project: 'Commercial Complex'
            },
            {
                id: 3,
                name: 'David Maloi',
                avatar: 'DM',
                lastMessage: 'Can you provide an update on the Office Complex project?',
                time: '1 day ago',
                unread: 0,
                online: true,
                project: 'Office Complex'
            },
        ];
        setConversations(mockConversations);
        setIsLoading(false);
    }, []);

    // Mock messages when conversation is selected
    useEffect(() => {
        if (!selectedConversation) return;

        const mockMessages = [
            {
                id: 1,
                sender_id: 2, // client
                content: 'Hi there! I saw your Modern Eco Villa project and I\'m very impressed.',
                created_at: '2026-08-07T10:30:00',
                is_read: true
            },
            {
                id: 2,
                sender_id: user?.id || 1, // constructor
                content: 'Thank you! I\'m glad you liked it. It\'s one of our favorite projects.',
                created_at: '2026-08-07T10:32:00',
                is_read: true
            },
            {
                id: 3,
                sender_id: 2, // client
                content: 'I have a similar project in mind. Can you tell me more about your process?',
                created_at: '2026-08-07T10:35:00',
                is_read: true
            },
            {
                id: 4,
                sender_id: user?.id || 1, // constructor
                content: 'Of course! We typically start with a consultation to understand your vision...',
                created_at: '2026-08-07T10:40:00',
                is_read: true
            },
        ];
        setMessages(mockMessages);
    }, [selectedConversation, user]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        setIsSending(true);
        const newMsg = {
            id: Date.now(),
            sender_id: user?.id || 1,
            content: newMessage.trim(),
            created_at: new Date().toISOString(),
            is_read: false
        };
        setMessages(prev => [...prev, newMsg]);
        setNewMessage('');

        // Simulate reply
        setTimeout(() => {
            const reply = {
                id: Date.now() + 1,
                sender_id: 2,
                content: 'Thanks for the quick response! I\'ll get back to you soon.',
                created_at: new Date().toISOString(),
                is_read: false
            };
            setMessages(prev => [...prev, reply]);
            toast.success('New message received');
        }, 2000);

        setIsSending(false);
    };

    const filteredConversations = conversations.filter(conv =>
        conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        conv.project.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#0A1628] py-6 md:py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-white">
                            Messages
                        </h1>
                        <p className="text-gray-400 text-sm mt-1">View and manage your conversations</p>
                    </div>
                    <button className="px-3 py-2 bg-[#111C2E] border border-white/10 rounded-xl hover:border-gold/30 transition-all duration-300 flex items-center gap-2 text-gray-400 hover:text-white text-sm">
                        <Filter className="w-4 h-4" />
                        Filter
                    </button>
                </div>

                {isLoading ? (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="flex flex-col items-center">
                            <Loader2 className="w-10 h-10 text-gold animate-spin" />
                            <p className="text-gray-400 mt-4 text-sm">Loading conversations...</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
                        {/* Conversations List */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl overflow-hidden">
                                <div className="p-4 border-b border-white/5">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <input
                                            type="text"
                                            placeholder="Search messages..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-9 pr-4 py-2.5 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="divide-y divide-white/5 max-h-[600px] overflow-y-auto">
                                    {filteredConversations.length === 0 ? (
                                        <div className="p-6 text-center text-gray-400 text-sm">
                                            <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                                            No conversations found
                                        </div>
                                    ) : (
                                        filteredConversations.map((conv) => (
                                            <button
                                                key={conv.id}
                                                onClick={() => setSelectedConversation(conv)}
                                                className={`w-full p-3 md:p-4 text-left hover:bg-white/5 transition-colors ${
                                                    selectedConversation?.id === conv.id ? 'bg-gold/10 border-l-2 border-gold' : ''
                                                }`}
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="relative">
                                                        <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold text-sm">
                                                            {conv.avatar}
                                                        </div>
                                                        {conv.online && (
                                                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#111C2E]" />
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center justify-between">
                                                            <p className="font-semibold text-white text-sm truncate">{conv.name}</p>
                                                            <span className="text-xs text-gray-400 flex-shrink-0">{conv.time}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-400 truncate">{conv.lastMessage}</p>
                                                        <p className="text-xs text-gray-500 mt-1 truncate">{conv.project}</p>
                                                    </div>
                                                    {conv.unread > 0 && (
                                                        <span className="flex-shrink-0 w-5 h-5 bg-gold rounded-full flex items-center justify-center text-[#0A1628] text-xs font-bold">
                                                            {conv.unread}
                                                        </span>
                                                    )}
                                                </div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Chat Area */}
                        <div className="lg:col-span-2">
                            {selectedConversation ? (
                                <div className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl overflow-hidden h-full flex flex-col">
                                    {/* Chat Header */}
                                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center text-gold font-bold text-sm">
                                                    {selectedConversation.avatar}
                                                </div>
                                                {selectedConversation.online && (
                                                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#111C2E]" />
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-white text-sm">{selectedConversation.name}</p>
                                                <p className="text-xs text-gray-400">{selectedConversation.project}</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-1">
                                            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                                <Phone className="w-4 h-4 text-gray-400" />
                                            </button>
                                            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                                <Video className="w-4 h-4 text-gray-400" />
                                            </button>
                                            <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                                <MoreVertical className="w-4 h-4 text-gray-400" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Messages */}
                                    <div className="flex-1 p-4 overflow-y-auto space-y-3 max-h-[400px]">
                                        {messages.map((msg) => (
                                            <motion.div
                                                key={msg.id}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className={`flex ${msg.sender_id === user?.id ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[70%] rounded-2xl p-3 ${
                                                    msg.sender_id === user?.id
                                                        ? 'bg-gold text-[#0A1628]'
                                                        : 'bg-[#1A2A4A] text-white'
                                                }`}>
                                                    <p className="text-sm leading-relaxed">{msg.content}</p>
                                                    <div className={`text-xs mt-1 flex items-center justify-end gap-1 ${
                                                        msg.sender_id === user?.id ? 'text-[#0A1628]/60' : 'text-gray-400'
                                                    }`}>
                                                        {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        {msg.sender_id === user?.id && (
                                                            msg.is_read ? <CheckCheck className="w-3 h-3" /> : <CheckCheck className="w-3 h-3 opacity-50" />
                                                        )}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>

                                    {/* Message Input */}
                                    <div className="p-4 border-t border-white/5">
                                        <form onSubmit={handleSendMessage} className="flex gap-2">
                                            <button type="button" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                                <Paperclip className="w-4 h-4 text-gray-400" />
                                            </button>
                                            <button type="button" className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                                <Smile className="w-4 h-4 text-gray-400" />
                                            </button>
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Type a message..."
                                                className="flex-1 px-4 py-2 bg-[#1A2A4A] border border-white/10 rounded-xl text-white placeholder-gray-400 text-sm focus:outline-none focus:border-gold/50 transition-colors"
                                                disabled={isSending}
                                            />
                                            <button
                                                type="submit"
                                                disabled={!newMessage.trim() || isSending}
                                                className="p-2 bg-gold rounded-xl hover:bg-gold-light transition-colors disabled:opacity-50 flex items-center justify-center"
                                            >
                                                {isSending ? (
                                                    <Loader2 className="w-5 h-5 text-[#0A1628] animate-spin" />
                                                ) : (
                                                    <Send className="w-5 h-5 text-[#0A1628]" />
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-[#111C2E] border border-white/5 rounded-xl md:rounded-2xl p-12 text-center">
                                    <div className="w-20 h-20 bg-[#1A2A4A] rounded-full flex items-center justify-center mx-auto mb-4">
                                        <MessageCircle className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">No Conversation Selected</h3>
                                    <p className="text-gray-400 mt-2 text-sm">Select a conversation from the list to start messaging</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ConstructorMessages;
