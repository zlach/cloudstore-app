const mockAsync = async (cb, ms = 1000) => {
  await new Promise(resolve => setTimeout(resolve, ms))

  return cb
}

export default mockAsync
