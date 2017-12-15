const auth = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        avatar:'image',
        name: 'Spencer Jones',
        uid: 'spencerjones'
      })
    }, 2000)
  })
}

export default auth