export const getChatRoomId = (userId1, userId2) => {
    // Sort the user IDs to ensure consistency
    const sortedUserIds = [userId1, userId2].sort();
    
    return `${sortedUserIds[0]}_${sortedUserIds[1]}`;
  };
  
 