{
  users: {
    isAuthed,
    isFetching,
    error,
    [uid]: {
      lastupdated,
      info: {
        name,
        uid,
        avatar
      }
    }
  },
  modal: {
    duck,
    isOpen,
  },
  ducks: {
    [duckId]: {
      lastUpdated,
      info: {
        avatar
        duckId
        name
        comment
        text
        timestamp
        uid
      }
    }
  },
  usersDucks: {
    isFetching,
    error,
    [uid]: {
      lastUpdated,
      duckIds: [duckId, duckId, duckId] 
    }
  },
  likeCount: {
    [duckId]: 0
  },
  usersLikes: {
    [duckId]: true
  },
  replies: {
    isFetching,
    error,
    [duckId]: {
      replies: {
        lastUpdated,
        [replyId]: {
          avatar,
          reply,
          name,
          uid,
          timestamp ,
          replyId,
        }
      }
    }
  },
   listeners: {
  [listenersId]: true
  },
  feed:
    isFetching,
    error,
    newDucksAvaliable,
    duckIdsToAdd: [duckId, duckId],
    duckIds: [duckId, duckId, duckId]
}  
