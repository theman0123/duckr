import { userDucksExpirationLength, userExpirationLength, repliesExpirationLength } from 'config/constants'

export function formatUserInfo (name, avatar, uid) {
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

export function formatReply ({name, uid, avatar}, reply) {
  return {
    name,
    uid,
    avatar,
    reply,
    timestamp: Date.now()
  }
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}
function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function staleDucks(timestamp) {
  return getMilliseconds(timestamp) > userDucksExpirationLength
}

export function staleUser(timestamp) {
  return getMilliseconds(timestamp) > userExpirationLength
}

export function staleReplies (timestamp) {
  return getMilliseconds(timestamp) > repliesExpirationLength
}
