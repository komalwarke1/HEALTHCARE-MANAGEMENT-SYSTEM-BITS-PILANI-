import React, { useState, useEffect, useRef } from 'react';
import { Send, Clock, Check, CheckCheck, Paperclip, Smile, Mic, Image, X, Search } from 'lucide-react';

// Custom components
const CustomAlert = ({ children, variant = 'info', onClose }) => {
  const alertStyles = {
    info: 'bg-blue-100 border-blue-500 text-blue-800',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    error: 'bg-red-100 border-red-500 text-red-800'
  };

  return (
    <div className={`border-l-4 p-4 ${alertStyles[variant]} relative`} role="alert">
      {onClose && (
        <button onClick={onClose} className="absolute top-2 right-2">
          <X className="w-4 h-4" />
        </button>
      )}
      {children}
    </div>
  );
};

const EmojiPicker = ({ onSelect }) => {
  const emojis = ['👍', '❤️', '😊', '🙏', '👋', '😷', '🏥', '💊'];
  return (
    <div className="absolute bottom-full mb-2 bg-white p-2 rounded-lg shadow-lg border flex gap-2">
      {emojis.map(emoji => (
        <button
          key={emoji}
          onClick={() => onSelect(emoji)}
          className="hover:bg-gray-100 p-1 rounded"
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

const ChatConsultation = () => {
    const [messages, setMessages] = useState([
        { 
            id: 1,
            sender: 'system',
            text: 'Welcome to the hospital chat consultation service. A healthcare professional will assist you shortly.',
            timestamp: new Date().toISOString(),
            type: 'system'
        },
        { 
            id: 2,
            sender: 'consultant',
            text: 'Hello! Im Dr. Smith. How can I assist you today?',
            timestamp: new Date().toISOString(),
            status: 'read',
            avatar: '/api/placeholder/32/32'
        },
        {
            id: 3,
            sender: 'patient',
            text: 'I have a question about my medication.',
            timestamp: new Date().toISOString(),
            status: 'read'
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [urgencyLevel, setUrgencyLevel] = useState('normal');
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [attachments, setAttachments] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const addNotification = (message, variant = 'info') => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, message, variant }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    };

    const simulateConsultantResponse = () => {
        setIsTyping(true);
        setTimeout(() => {
            const responses = [
                "Could you please provide more details about your medication?",
                "When did you last take your prescribed dose?",
                "Are you experiencing any side effects?",
                "I'll help you with your medication concerns. What specific questions do you have?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            
            setMessages(prev => [...prev, {
                id: Date.now(),
                sender: 'consultant',
                text: randomResponse,
                timestamp: new Date().toISOString(),
                status: 'sent',
                avatar: '/api/placeholder/32/32'
            }]);
            setIsTyping(false);
        }, 2000);
    };

    const handleFileUpload = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 0) {
            const newAttachments = files.map(file => ({
                id: Date.now(),
                name: file.name,
                size: file.size,
                type: file.type
            }));
            setAttachments(prev => [...prev, ...newAttachments]);
            addNotification(`${files.length} file(s) attached successfully`, 'info');
        }
    };

    const removeAttachment = (id) => {
        setAttachments(prev => prev.filter(att => att.id !== id));
    };

    const handleEmojiSelect = (emoji) => {
        setInput(prev => prev + emoji);
        setShowEmojiPicker(false);
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
        if (!isRecording) {
            addNotification('Voice recording started', 'info');
        } else {
            addNotification('Voice recording stopped', 'info');
        }
    };

    const sendMessage = () => {
        if (input.trim() !== '' || attachments.length > 0) {
            const newMessage = {
                id: Date.now(),
                sender: 'patient',
                text: input.trim(),
                timestamp: new Date().toISOString(),
                status: 'sent',
                urgency: urgencyLevel,
                attachments: [...attachments]
            };
            setMessages(prev => [...prev, newMessage]);
            setInput('');
            setAttachments([]);
            simulateConsultantResponse();
        }
    };

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const MessageStatus = ({ status }) => {
        switch (status) {
            case 'sent':
                return <Check className="w-4 h-4 text-gray-400" />;
            case 'delivered':
                return <CheckCheck className="w-4 h-4 text-gray-400" />;
            case 'read':
                return <CheckCheck className="w-4 h-4 text-blue-500" />;
            default:
                return null;
        }
    };

    const filteredMessages = searchTerm
        ? messages.filter(msg => 
            msg.text.toLowerCase().includes(searchTerm.toLowerCase()))
        : messages;

    return (
        <div className="flex flex-col h-screen bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 shadow-lg">
                <div className="max-w-4xl mx-auto">
                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-2xl font-bold">Hospital Chat Consultation</h1>
                        <button 
                            onClick={() => setShowSearch(!showSearch)}
                            className="p-2 hover:bg-white/10 rounded-full"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                    </div>
                    {showSearch && (
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search messages..."
                            className="w-full p-2 rounded-lg bg-white/10 text-white placeholder-white/70 mb-2"
                        />
                    )}
                    <CustomAlert variant="warning" onClose={() => addNotification('Emergency notice dismissed')}>
                        <p className="text-sm">
                            For emergencies, please call 911 or visit your nearest emergency room.
                        </p>
                    </CustomAlert>
                </div>
            </div>

            {/* Notifications */}
            <div className="fixed top-4 right-4 space-y-2 z-50">
                {notifications.map(({ id, message, variant }) => (
                    <CustomAlert key={id} variant={variant} onClose={() => setNotifications(prev => prev.filter(n => n.id !== id))}>
                        {message}
                    </CustomAlert>
                ))}
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 bg-white/80 backdrop-blur-sm">
                <div className="max-w-4xl mx-auto">
                    {filteredMessages.map((message) => (
                        <div 
                            key={message.id} 
                            className={`mb-4 flex ${message.sender === 'patient' ? 'justify-end' : message.sender === 'system' ? 'justify-center' : 'justify-start'}`}
                        >
                            {message.sender === 'system' ? (
                                <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-600">
                                    {message.text}
                                </div>
                            ) : (
                                <div 
                                    className={`flex flex-col max-w-[80%] md:max-w-[60%] ${
                                        message.sender === 'patient' 
                                            ? 'items-end' 
                                            : 'items-start'
                                    }`}
                                >
                                    <div className="flex items-end gap-2">
                                        {message.sender === 'consultant' && message.avatar && (
                                            <img 
                                                src={message.avatar} 
                                                alt="Doctor" 
                                                className="w-6 h-6 rounded-full"
                                            />
                                        )}
                                        <div 
                                            className={`px-4 py-2 rounded-2xl shadow-md ${
                                                message.sender === 'patient'
                                                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                                                    : 'bg-gray-100 text-gray-800'
                                            } ${
                                                message.urgency === 'urgent' 
                                                    ? 'border-2 border-red-400' 
                                                    : ''
                                            }`}
                                        >
                                            {message.text}
                                            {message.attachments?.length > 0 && (
                                                <div className="mt-2 space-y-1">
                                                    {message.attachments.map(att => (
                                                        <div key={att.id} className="flex items-center gap-2 text-sm bg-black/10 p-1 rounded">
                                                            <Paperclip className="w-4 h-4" />
                                                            {att.name}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center mt-1 space-x-1 text-xs text-gray-500">
                                        <Clock className="w-3 h-3" />
                                        <span>{formatTime(message.timestamp)}</span>
                                        {message.sender === 'patient' && (
                                            <MessageStatus status={message.status} />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex items-center text-gray-500 text-sm">
                            <div className="flex space-x-1 bg-gray-100 rounded-full px-4 py-2">
                                <span className="animate-bounce">•</span>
                                <span className="animate-bounce delay-100">•</span>
                                <span className="animate-bounce delay-200">•</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
                <div className="bg-gray-50 p-2 border-t">
                    <div className="max-w-4xl mx-auto flex gap-2 flex-wrap">
                        {attachments.map(att => (
                            <div key={att.id} className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
                                <Paperclip className="w-4 h-4 text-gray-500" />
                                <span className="text-sm text-gray-600">{att.name}</span>
                                <button onClick={() => removeAttachment(att.id)} className="text-gray-400 hover:text-gray-600">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-200">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <select
                            value={urgencyLevel}
                            onChange={(e) => setUrgencyLevel(e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        >
                            <option value="normal">Normal</option>
                            <option value="urgent">Urgent</option>
                        </select>
                        <div className="flex-1 relative">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Type your message here..."
                                rows="1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
                            />
                            <div className="absolute right-2 bottom-2 flex items-center gap-2">
                                <button 
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <Smile className="w-5 h-5" />
                                </button>
                                {showEmojiPicker && (<EmojiPicker onSelect={handleEmojiSelect} />
                                )}
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    multiple
                                />
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <Paperclip className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => toggleRecording()}
                                    className={`${isRecording ? 'text-red-500' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <Mic className="w-5 h-5" />
                                </button>
                                <button 
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-gray-400 hover:text-gray-600"
                                >
                                    <Image className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <button 
                            onClick={sendMessage}
                            disabled={!input.trim() && attachments.length === 0}
                            className="p-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg shadow-md hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    {isRecording && (
                        <div className="mt-2 flex items-center gap-2 text-red-500">
                            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                            Recording in progress...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatConsultation;