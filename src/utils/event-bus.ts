import { create } from 'zustand'

type EventStore = {
  events: Record<string, ((data: any) => void)[]>
  emit: (channel: string, data: any) => void
  onChannel: (channel: string, callback: (data: any) => void) => () => void
}

const useEventBus = create<EventStore>((set) => ({
  events: {},
  emit: (channel, data) => {
    set(state => {
      if (state.events[channel]) {
        state.events[channel].forEach((callback) => callback(data))
      }
      return state
    })
  },
  onChannel: (channel, callback) => {
    set(state => {
      const updatedEvents = { ...state.events }
      if (!updatedEvents[channel]) {
        updatedEvents[channel] = []
      }
      updatedEvents[channel].push(callback)
      return { events: updatedEvents }
    })

    return () => {
      set(state => {
        const updatedEvents = { ...state.events }
        if (updatedEvents[channel]) {
          updatedEvents[channel] = updatedEvents[channel].filter((cb) => cb !== callback)
          if (!updatedEvents[channel].length) {
            delete updatedEvents[channel]
          }
        }
        return { events: updatedEvents }
      })
    }
  },
}))

export const bus = useEventBus.getState()
