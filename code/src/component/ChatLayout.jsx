import React, { useState, useEffect } from 'react';
import { Menu, Bell, Settings, Search, X, MessageSquare } from 'lucide-react';
import ConversationList from './ConversationList';
import ChatWindow from './ChatWindow';
import { dummyConversations } from './dummydata';

const ChatLayout = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setConversations(dummyConversations);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showDropdown && !event.target.closest('[data-dropdown]')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showDropdown]);

  const filteredConversations = conversations.filter(conv =>
    conv.doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.doctor.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-slate-50">
      {/* Overlay for mobile */}
      {showSidebar && (
        <div 
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          w-80 bg-white border-r border-slate-200
          ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
          transition-transform duration-200 ease-in-out
          fixed md:relative z-30 h-screen
        `}
      >
        {/* Header */}
        <div className="h-16 border-b border-slate-200 flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-6 h-6 text-blue-600" />
            <h1 className="font-semibold text-xl text-slate-900">Consultations</h1>
          </div>
          <button
            onClick={() => setShowSidebar(false)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-slate-200">
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="overflow-y-auto h-[calc(100vh-8.5rem)]">
          <ConversationList
            conversations={filteredConversations}
            activeId={activeConversation?.id}
            onSelect={(conversation) => {
              setActiveConversation(conversation);
              if (window.innerWidth < 768) {
                setShowSidebar(false);
              }
            }}
          />
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <div className="h-16 border-b border-slate-200 flex md:hidden items-center px-4 bg-white">
          <button
            onClick={() => setShowSidebar(true)}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <Menu className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        {/* Chat Window or Welcome Screen */}
        {activeConversation ? (
          <ChatWindow
            conversation={activeConversation}
            onBack={() => setShowSidebar(true)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md mx-auto">
              <MessageSquare className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                Welcome to Hospital Chat
              </h2>
              <p className="text-slate-600">
                Select a consultation from the list to start your medical conversation. 
                Your privacy and security are our top priority.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ChatLayout;