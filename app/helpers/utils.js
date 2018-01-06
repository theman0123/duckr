export const formatUserInfo = (name, avatar, uid) => {
  return {
    name,
    avatar,
    uid,
  }
}

export const formatDuck = (text, {name, avatar, uid}) => {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}
