import {
  postChannelService,
  // leaveChannelService,
  postChannelMemberService
} from '@/services/channel.service'
import { postMessageService } from '@/services/message.service'

const ChannelFunctions = () => {
  const postChannel = async (channelData) => {
    try {
      const data = await postChannelService(channelData)
      return data.response
    } catch (err) {
      throw err
    }
  }

  const postMessage = async (requestDetails) => {
    try {
      const data = await postMessageService(requestDetails)
      return data.response
    } catch (err) {
      throw err
    }
  }

  // const leaveChannel = async (requestDetails) => {
  //   try {
  //     const data = await leaveChannelService(requestDetails)
  //     return data.response
  //   } catch (err) {
  //     throw err
  //   }
  // }

  const postChannelMember = async (requestDetails) => {
    try {
      const data = await postChannelMemberService(requestDetails)
      return data.response
    } catch (err) {
      throw err
    }
  }

  return {
    postChannel,
    postMessage,
    // leaveChannel,
    postChannelMember
  }
}

export default ChannelFunctions
