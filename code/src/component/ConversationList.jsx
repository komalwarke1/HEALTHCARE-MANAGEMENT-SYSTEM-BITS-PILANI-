import React from 'react';
import PropTypes from 'prop-types';
import { ChevronRight, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const ConversationList = ({ conversations = [], activeId, onSelect }) => {
  // Format the last message timestamp
  const formatTime = (timestamp) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <div className="space-y-2 p-4">
      {/* Active Conversations Section */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-500 mb-3 px-2">Active Consultations</h3>
        {conversations
          .filter(conv => conv.status === 'active')
          .map((conversation) => (
            <ConversationCard 
              key={conversation.id}
              conversation={conversation}
              isActive={activeId === conversation.id}
              onSelect={onSelect}
              formatTime={formatTime}
            />
          ))}
      </div>

      {/* Past Conversations Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-3 px-2">Past Consultations</h3>
        {conversations
          .filter(conv => conv.status === 'past')
          .map((conversation) => (
            <ConversationCard 
              key={conversation.id}
              conversation={conversation}
              isActive={activeId === conversation.id}
              onSelect={onSelect}
              formatTime={formatTime}
            />
          ))}
      </div>
    </div>
  );
};

// Separate card component for better organization
const ConversationCard = ({ conversation, isActive, onSelect, formatTime }) => {
  const {
    doctor,
    lastMessage,
    timestamp,
    unreadCount,
    status,
    priority
  } = conversation;

  return (
    <div
      onClick={() => onSelect(conversation)}
      className={`
        relative p-4 mb-2 rounded-xl cursor-pointer
        transition-all duration-200 ease-in-out
        hover:bg-gray-50 group
        ${isActive ?'bg-blue-50 hover:bg-blue-50 border-blue-200' : 'bg-white'}
        border shadow-sm
      `}
    >
      <div className="flex items-start space-x-4">
        {/* Avatar Section */}
        <div className="relative">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
          />
          {status === 'active' && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-medium text-gray-900 truncate">
              Dr. {doctor.name}
            </h4>
            <span className="text-xs text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {formatTime(timestamp)}
            </span>
          </div>

          {/* Department & Priority Tags */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
              {doctor.department}
            </span>
            {priority === 'high' && (
              <span className="px-2 py-1 text-xs font-medium text-red-600 bg-red-100 rounded-full">
                Urgent
              </span>
            )}
          </div>

          {/* Last Message Preview */}
          <p className="text-sm text-gray-600 truncate mb-2">
            {lastMessage}
          </p>

          {/* Footer Section */}
          <div className="flex items-center justify-between">
            {unreadCount > 0 && (
              <span className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-full">
                {unreadCount} new
              </span>
            )}
            <ChevronRight className={`
              w-5 h-5 text-gray-400 
              transition-transform duration-200
              ${isActive ? 'rotate-90' : 'group-hover:translate-x-1'}
            `} />
          </div>
        </div>
      </div>
    </div>
  );
};

ConversationList.propTypes = {
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      doctor: PropTypes.shape({
        name: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
      }).isRequired,
      lastMessage: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired,
      unreadCount: PropTypes.number.isRequired,
      status: PropTypes.oneOf(['active', 'past']).isRequired,
      priority: PropTypes.oneOf(['normal', 'high']).isRequired,
    })
  ).isRequired,
  activeId: PropTypes.number,
  onSelect: PropTypes.func.isRequired,
};

export default ConversationList;

