import { atom, selector } from 'recoil'

export const minuteState = atom({
  key: 'minuteState',
  default: 0,
})

export const hourSelector = selector({
  key: 'hourSelector',
  get: ({ get }) => {
    const minutes = get(minuteState)
    return Math.floor(minutes / 60)
  },
  set: ({ set }, newValue) => {
    const minutes = Number(newValue) * 60
    set(minuteState, minutes)
  },
})
