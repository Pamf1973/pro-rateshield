import { create } from "zustand";
import { DecomposeResult } from "../lib/engine/decompose";

interface BillState {
  result: DecomposeResult | null;
  isLoading: boolean;
  error: string | null;
  setResult: (result: DecomposeResult) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

export const useBillStore = create<BillState>((set) => ({
  result: null,
  isLoading: false,
  error: null,
  setResult: (result) => set({ result, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  reset: () => set({ result: null, isLoading: false, error: null }),
}));