export const getChatRoomId = (userId1, userId2) => {
    // Sort the user IDs to ensure consistency
    const sortedUserIds = [userId1, userId2].sort();
    
    return `${sortedUserIds[0]}_${sortedUserIds[1]}`;
  };
  
 
  export const createChatRoom = (userId1, userId2) => {
    const chatRoomId = getChatRoomId(userId1, userId2);
    
    return chatRoomId;
  };