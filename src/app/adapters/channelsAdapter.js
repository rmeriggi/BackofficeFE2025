export const channelsadapter = (channels) => {
  if(!channels) return []
  const formattedchannels = channels.map((c) => {
    const formattedchannel = {
      id:c.id,
      channel: c.channel,
      symbol: c.symbol,
    }
    return formattedchannel
  })
  return formattedchannels
}