import React, { useState, useEffect, useRef } from 'react';
import { Send, Clock, Check, CheckCheck, Paperclip, Smile, Mic, Image as ImageIcon, X, Search, Phone, Video, ChevronLeft, MoreVertical } from 'lucide-react';
import PropTypes from 'prop-types';

const Message = ({ message, isLastInGroup }) => {
  const isPatient = message.sender.type === 'patient';
  
  return (
    <div className={`flex ${isPatient ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`max-w-[80%] flex ${isPatient ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
        {!isPatient && message.sender.avatar && (
          <img src={message.sender.avatar} alt="Avatar" className="w-8 h-8 rounded-full" />
        )}
        <div className={`flex flex-col ${isPatient ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-2 rounded-2xl ${isPatient ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}>
            {message.content}
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
          {isLastInGroup && (
            <div className="flex items-center mt-1 space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              {message.status && (
                message.status === 'sent' ? <Check className="w-4 h-4 text-gray-400" /> :
                message.status === 'delivered' ? <CheckCheck className="w-4 h-4 text-gray-400" /> :
                message.status === 'read' ? <CheckCheck className="w-4 h-4 text-blue-500" /> : null
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmojiPicker = ({ onSelect }) => {
  const emojis = ['👍', '❤️', '😊', '🙏', '👋', '😷', '🏥', '💊'];
  return (
    <div className="absolute bottom-full mb-2 bg-white p-2 rounded-lg shadow-lg border flex gap-2">
      {emojis.map(emoji => (
        <button key={emoji} onClick={() => onSelect(emoji)} className="hover:bg-gray-100 p-1 rounded">
          {emoji}
        </button>
      ))}
    </div>
  );
};

const ChatWindow = ({ conversation, onBack }) => {
  const [messages, setMessages] = useState(conversation.messages || []);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (input.trim() || attachments.length > 0) {
      const newMessage = {
        id: Date.now(),
        content: input.trim(),
        sender: { type: 'patient' },
        timestamp: new Date().toISOString(),
        attachments: [...attachments],
        status: 'sent'
      };

      setMessages(prev => [...prev, newMessage]);
      setInput('');
      setAttachments([]);
      simulateResponse();
    }
  };

  const simulateResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      const response = {
        id: Date.now(),
        content: "Thank you for your message. Is there anything else I can help you with today?",
        sender: {
          type: 'doctor',
          name: conversation.doctor.name,
          avatar: conversation.doctor.avatar
        },
        timestamp: new Date().toISOString(),
        status: 'sent'
      };
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-slate-50/50 to-white">
      <div className="bg-white border-b backdrop-blur-sm bg-white/70 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={onBack} className="md:hidden p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ChevronLeft className="w-5 h-5 text-blue-600" />
              </button>
              <div className="relative">
                <img
                  src={conversation.doctor.avatar}
                  alt={conversation.doctor.name}
                  className="w-12 h-12 rounded-full ring-2 ring-blue-100"
                />
                {conversation.doctor.online && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <h2 className="font-bold text-lg">Dr. {conversation.doctor.name}</h2>
                <p className="text-sm text-gray-600">{conversation.doctor.department} • Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Phone className="w-5 h-5 text-blue-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Video className="w-5 h-5 text-blue-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search className="w-5 h-5 text-blue-600" />
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <MoreVertical className="w-5 h-5 text-blue-600" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg ring-1 ring-black/5 z-50">
                    <div className="py-2">
                      <button className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">
                        View Profile
                      </button>
                      <button className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50">
                        Mute Notifications
                      </button>
                      <hr className="my-2 border-slate-200" />
                      <button className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50">
                        End Consultation
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => (
            <Message
              key={message.id}
              message={message}
              isLastInGroup={
                index === messages.length - 1 ||
                messages[index + 1]?.sender.type !== message.sender.type
              }
            />
          ))}
          {isTyping && (
            <div className="flex items-center space-x-2">
              <div className="bg-gray-100 rounded-full px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {attachments.length > 0 && (
        <div className="bg-white border-t p-2">
          <div className="max-w-4xl mx-auto flex gap-2 flex-wrap">
            {attachments.map(att => (
              <div key={att.id} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                <Paperclip className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-600">{att.name}</span>
                <button onClick={() => setAttachments(prev => prev.filter(a => a.id !== att.id))}>
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border-t p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type your message..."
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="1"
              />
              <div className="absolute right-2 bottom-2 flex items-center space-x-2">
                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-1 hover:bg-gray-100 rounded">
                  <Smile className="w-5 h-5 text-gray-500" />
                </button>
                {showEmojiPicker && <EmojiPicker onSelect={(emoji) => setInput(prev => prev + emoji)} />}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    setAttachments(prev => [...prev, ...files.map(file => ({
                      id: Date.now(),
                      name: file.name,
                      type: file.type,
                      size: file.size
                    }))]);
                  }}
                  className="hidden"
                  multiple
                />
                <button onClick={() => fileInputRef.current?.click()} className="p-1 hover:bg-gray-100 rounded">
                  <Paperclip className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <ImageIcon className="w-5 h-5 text-gray-500" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Mic className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={!input.trim() && attachments.length === 0}
              className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ChatWindow.propTypes = {
  conversation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    doctor: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      department: PropTypes.string.isRequired,
      online: PropTypes.bool.isRequired,
    }).isRequired,
    messages: PropTypes.arrayOf(PropTypes.object).isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ChatWindow;