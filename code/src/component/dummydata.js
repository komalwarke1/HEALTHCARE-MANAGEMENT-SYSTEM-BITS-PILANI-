export const dummyConversations = [
    {
      id: 1,
      doctor: {
        name: "Emily Johnson",
        avatar: "/public/vite.svg?height=40&width=40",
        department: "General Practice",
        online: true,
      },
      lastMessage: "Thank you for your help!",
      timestamp: "2023-06-10T09:30:00Z",
      unreadCount: 0,
      status: 'active',
      priority: 'normal',
      messages: [
        {
          id: 1,
          content: "Hello! How can I help you today?",
          sender: {
            type: 'doctor',
            name: 'Dr. Emily Johnson',
            avatar: '/public/vite.svg?height=32&width=32'
          },
          timestamp: "2023-06-10T09:00:00Z",
          status: 'read'
        },
        {
          id: 2,
          content: "Hi Dr. Johnson, I've been experiencing frequent headaches lately.",
          sender: { type: 'patient' },
          timestamp: "2023-06-10T09:02:00Z",
          status: 'read'
        },
        {
          id: 3,
          content: "I'm sorry to hear that. Can you describe the headaches? How often do they occur and how long do they last?",
          sender: {
            type: 'doctor',
            name: 'Dr. Emily Johnson',
            avatar: '/public/vite.svg?height=32&width=32'
          },
          timestamp: "2023-06-10T09:05:00Z",
          status: 'read'
        },
        {
          id: 4,
          content: "They occur almost daily, usually in the afternoon. They last for a few hours and are quite intense.",
          sender: { type: 'patient' },
          timestamp: "2023-06-10T09:07:00Z",
          status: 'read'
        },
        {
          id: 5,
          content: "I see. Have you noticed any triggers or patterns? For example, do they worsen with certain foods, stress, or lack of sleep?",
          sender: {
            type: 'doctor',
            name: 'Dr. Emily Johnson',
            avatar: '/public/vite.svg?height=32&width=32'
          },
          timestamp: "2023-06-10T09:10:00Z",
          status: 'read'
        },
        {
          id: 6,
          content: "Now that you mention it, they do seem to be worse when I'm stressed or haven't slept well.",
          sender: { type: 'patient' },
          timestamp: "2023-06-10T09:12:00Z",
          status: 'read'
        },
        {
          id: 7,
          content: "Thank you for sharing that information. It's helpful for our diagnosis. I'd like you to keep a headache diary for the next week. Can you do that?",
          sender: {
            type: 'doctor',
            name: 'Dr. Emily Johnson',
            avatar: '/public/vite.svg?height=32&width=32'
          },
          timestamp: "2023-06-10T09:15:00Z",
          status: 'read'
        },
        {
          id: 8,
          content: "Sure, I can do that. What should I include in the diary?",
          sender: { type: 'patient' },
          timestamp: "2023-06-10T09:17:00Z",
          status: 'read'
        },
        {
          id: 9,
          content: "Great! Please note down the following for each headache: time it starts and ends, intensity on a scale of 1-10, any potential triggers, and what you ate that day. I'm sending you a template to use.",
          sender: {
            type: 'doctor',
            name: 'Dr. Emily Johnson',
            avatar: '/public/vite.svg?height=32&width=32'
          },
          timestamp: "2023-06-10T09:20:00Z",
          status: 'read'
        },
        {
          id: 10,
          content: "Headache Diary Template",
          sender: {
            type: 'doctor',
            name: 'Dr. Emily Johnson',
            avatar: '/public/vite.svg?height=32&width=32'
          },
          timestamp: "2023-06-10T09:21:00Z",
          status: 'read',
          attachments: [
            {
              id: 1,
              name: "headache_diary_template.pdf",
              type: "application/pdf"
            }
          ]
        },
        {
          id: 11,
          content: "Thank you, Dr. Johnson. I've received the template and will start tracking my headaches right away.",
          sender: { type: 'patient' },
          timestamp: "2023-06-10T09:23:00Z",
          status: 'read'
        },
        {
          id: 12,
          content: "Excellent. Let's schedule a follow-up appointment in a week to review your diary and discuss next steps. How does next Monday at 2 PM sound?",
          sender: {
            type: 'doctor',
            name: 'Dr. Emily Johnson',
            avatar: '/public/vite.svg?height=32&width=32'
          },
          timestamp: "2023-06-10T09:25:00Z",
          status: 'read'
        },
        {
          id: 13,
          content: "That works perfectly for me. Thank you for your help!",
          sender: { type: 'patient' },
          timestamp: "2023-06-10T09:27:00Z",
          status: 'read'
        },
        {
          id: 14,
          content: "You're welcome. Remember to stay hydrated and try to manage your stress levels. If your headaches worsen significantly before our next appointment, please don't hesitate to reach out. Take care!",
          sender: {
            type: 'doctor',
            name: 'Dr. Emily Johnson',
            avatar: '/public/vite.svg?height=32&width=32'
          },
          timestamp: "2023-06-10T09:30:00Z",
          status: 'read'
        },
      ]
    },
    // Add more conversation objects as needed
  ];
  
  // Keep the dummyMessages export if it's used elsewhere
  export const dummyMessages = [
    {
      id: 1,
      content: "Hello! How can I help you today?",
      sender: {
        type: 'doctor',
        name: 'Dr. Emily Johnson',
        avatar: '/public/vite.svg?height=32&width=32'
      },
      timestamp: "2023-06-10T09:00:00Z",
      status: 'read'
    },
    {
      id: 2,
      content: "Hi Dr. Johnson, I've been experiencing frequent headaches lately.",
      sender: { type: 'patient' },
      timestamp: "2023-06-10T09:02:00Z",
      status: 'read'
    },
    {
      id: 3,
      content: "I'm sorry to hear that. Can you describe the headaches? How often do they occur and how long do they last?",
      sender: {
        type: 'doctor',
        name: 'Dr. Emily Johnson',
        avatar: '/public/vite.svg?height=32&width=32'
      },
      timestamp: "2023-06-10T09:05:00Z",
      status: 'read'
    },
    {
      id: 4,
      content: "They occur almost daily, usually in the afternoon. They last for a few hours and are quite intense.",
      sender: { type: 'patient' },
      timestamp: "2023-06-10T09:07:00Z",
      status: 'read'
    },
    {
      id: 5,
      content: "I see. Have you noticed any triggers or patterns? For example, do they worsen with certain foods, stress, or lack of sleep?",
      sender: {
        type: 'doctor',
        name: 'Dr. Emily Johnson',
        avatar: '/public/vite.svg?height=32&width=32'
      },
      timestamp: "2023-06-10T09:10:00Z",
      status: 'read'
    },
    {
      id: 6,
      content: "Now that you mention it, they do seem to be worse when I'm stressed or haven't slept well.",
      sender: { type: 'patient' },
      timestamp: "2023-06-10T09:12:00Z",
      status: 'read'
    },
    {
      id: 7,
      content: "Thank you for sharing that information. It's helpful for our diagnosis. I'd like you to keep a headache diary for the next week. Can you do that?",
      sender: {
        type: 'doctor',
        name: 'Dr. Emily Johnson',
        avatar: '/public/vite.svg?height=32&width=32'
      },
      timestamp: "2023-06-10T09:15:00Z",
      status: 'read'
    },
    {
      id: 8,
      content: "Sure, I can do that. What should I include in the diary?",
      sender: { type: 'patient' },
      timestamp: "2023-06-10T09:17:00Z",
      status: 'read'
    },
    {
      id: 9,
      content: "Great! Please note down the following for each headache: time it starts and ends, intensity on a scale of 1-10, any potential triggers, and what you ate that day. I'm sending you a template to use.",
      sender: {
        type: 'doctor',
        name: 'Dr. Emily Johnson',
        avatar: '/public/vite.svg?height=32&width=32'
      },
      timestamp: "2023-06-10T09:20:00Z",
      status: 'read'
    },
    {
      id: 10,
      content: "Headache Diary Template",
      sender: {
        type: 'doctor',
        name: 'Dr. Emily Johnson',
        avatar: '/public/vite.svg?height=32&width=32'
      },
      timestamp: "2023-06-10T09:21:00Z",
      status: 'read',
      attachments: [
        {
          id: 1,
          name: "headache_diary_template.pdf",
          type: "application/pdf"
        }
      ]
    },
    {
      id: 11,
      content: "Thank you, Dr. Johnson. I've received the template and will start tracking my headaches right away.",
      sender: { type: 'patient' },
      timestamp: "2023-06-10T09:23:00Z",
      status: 'read'
    },
    {
      id: 12,
      content: "Excellent. Let's schedule a follow-up appointment in a week to review your diary and discuss next steps. How does next Monday at 2 PM sound?",
      sender: {
        type: 'doctor',
        name: 'Dr. Emily Johnson',
        avatar: '/public/vite.svg?height=32&width=32'
      },
      timestamp: "2023-06-10T09:25:00Z",
      status: 'read'
    },
    {
      id: 13,
      content: "That works perfectly for me. Thank you for your help!",
      sender: { type: 'patient' },
      timestamp: "2023-06-10T09:27:00Z",
      status: 'read'
    },
    {
      id: 14,
      content: "You're welcome. Remember to stay hydrated and try to manage your stress levels. If your headaches worsen significantly before our next appointment, please don't hesitate to reach out. Take care!",
      sender: {
        type: 'doctor',
        name: 'Dr. Emily Johnson',
        avatar: '/public/vite.svg?height=32&width=32'
      },
      timestamp: "2023-06-10T09:30:00Z",
      status: 'read'
    },
  ];
  
  