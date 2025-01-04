import React from 'react';
import PropTypes from 'prop-types';
import { Clock, CheckCheck, File, ImageIcon, AlertCircle } from 'lucide-react';

// Simple Alert component to replace shadcn/ui Alert
const SimpleAlert = ({ children, className = '' }) => (
  <div className={`flex items-center p-3 rounded-lg bg-gray-100 text-gray-800 ${className}`}>
    {children}
  </div>
);

SimpleAlert.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const Message = ({ message, isLastInGroup }) => {
  const {
    content,
    sender,
    timestamp,
    status,
    attachments = [],
    type = 'text',
    metadata = {},
    isUrgent,
    reactions = []
  } = message;

  const isPatient = sender.type === 'patient';
  const isSystem = type === 'system';

  // Format timestamp
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <SimpleAlert className="w-auto inline-flex max-w-[80%]">
          <AlertCircle className="h-4 w-4 mr-2" />
          <span className="text-sm text-gray-600">{content}</span>
        </SimpleAlert>
      </div>
    );
  }

  return (
    <div className={`flex ${isPatient ? 'justify-end' : 'justify-start'} ${isLastInGroup ? 'mb-4' : 'mb-1'}`}>
      <div className={`flex ${isPatient ? 'flex-row-reverse' : 'flex-row'} items-end max-w-[80%] group`}>
        {/* Avatar - only show for first message in group */}
        {!isPatient && isLastInGroup && (
          <div className="flex-shrink-0 mb-1">
            <img 
              src={sender.avatar || '/placeholder.svg?height=32&width=32'} 
              alt={sender.name}
              className="w-8 h-8 rounded-full mr-2"
            />
          </div>
        )}

        {/* Message Content */}
        <div className={`flex flex-col ${isPatient ? 'items-end' : 'items-start'}`}>
          {/* Message Bubble */}
          <div
            className={`
              relative px-4 py-2 rounded-2xl
              ${isUrgent ? 'border-2 border-red-400' : ''}
              ${isPatient 
                ? 'bg-blue-600 text-white rounded-br-sm' 
                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
              }
            `}
          >
            {/* Sender name for group messages */}
            {!isPatient && metadata.showSenderName && (
              <div className="text-xs font-medium text-gray-500 mb-1">
                {sender.name}
              </div>
            )}

            {/* Message text */}
            <div className="text-sm whitespace-pre-wrap break-words">
              {content}
            </div>

            {/* Attachments */}
            {attachments.length > 0 && (
              <div className="mt-2 space-y-1">
                {attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className={`
                      flex items-center gap-2 p-2 rounded-lg text-sm
                      ${isPatient ? 'bg-blue-700' : 'bg-gray-200'}
                    `}
                  >
                    {attachment.type.startsWith('image') ? (
                      <ImageIcon className="w-4 h-4" />
                    ) : (
                      <File className="w-4 h-4" />
                    )}
                    <span className="truncate">{attachment.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Reactions */}
            {reactions.length > 0 && (
              <div className={`
                absolute ${isPatient ? 'left-0' : 'right-0'} bottom-0 transform translate-y-full mt-1
                flex items-center gap-1 text-xs py-1
              `}>
                {reactions.map((reaction, index) => (
                  <span 
                    key={index}
                    className="bg-white shadow-sm rounded-full px-2 py-1"
                  >
                    {reaction.emoji} {reaction.count > 1 && reaction.count}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Message Meta - timestamp and status */}
          <div className={`
            flex items-center gap-1 mt-1 text-xs text-gray-500
            opacity-0 group-hover:opacity-100 transition-opacity
          `}>
            <Clock className="w-3 h-3" />
            <span>{formatTime(timestamp)}</span>
            {isPatient && status && (
              <CheckCheck className={`
                w-3 h-3
                ${status === 'read' ? 'text-blue-500' : 'text-gray-400'}
              `} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    sender: PropTypes.shape({
      type: PropTypes.oneOf(['patient', 'doctor', 'system']).isRequired,
      name: PropTypes.string,
      avatar: PropTypes.string,
    }).isRequired,
    timestamp: PropTypes.string.isRequired,
    status: PropTypes.oneOf(['sent', 'delivered', 'read']),
    attachments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
      })
    ),
    type: PropTypes.oneOf(['text', 'system']),
    metadata: PropTypes.shape({
      showSenderName: PropTypes.bool,
    }),
    isUrgent: PropTypes.bool,
    reactions: PropTypes.arrayOf(
      PropTypes.shape({
        emoji: PropTypes.string.isRequired,
        count: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
  isLastInGroup: PropTypes.bool.isRequired,
};

export default Message;

