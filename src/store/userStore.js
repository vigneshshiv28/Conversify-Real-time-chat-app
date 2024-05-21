import { use } from 'react'
import { create } from 'zustand'

const useUserStore = create((set) => ({
    user: null,
    setUser: (user) => set({user}),
}))