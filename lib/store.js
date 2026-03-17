import { create } from 'zustand'
import { patients } from '../data/mock'

const useStore = create((set, get) => ({
  // Auth
  user: null,
  login: (user) => set({ user }),
  logout: () => set({ user: null }),

  // Selected patient (for prescription workflow)
  selectedPatientId: 1,
  setSelectedPatientId: (id) => set({ selectedPatientId: id }),
  getSelectedPatient: () => patients.find(p => p.id === get().selectedPatientId),

  // Last exercise result (for result page)
  exerciseResult: null,
  setExerciseResult: (result) => set({ exerciseResult: result }),

  // Prescribed exercises log
  prescribedExercises: [],
  addPrescribedExercise: (exercise) =>
    set((state) => ({
      prescribedExercises: [exercise, ...state.prescribedExercises],
    })),
}))

export default useStore
