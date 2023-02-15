const mockAsync = async (cb, ms = 500) => {
  await new Promise(resolve => setTimeout(resolve, ms))

  return cb
}

export default mockAsync
