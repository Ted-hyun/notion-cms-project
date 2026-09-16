// UI 상태 관리 (Zustand)

'use client';

import { create } from 'zustand';

interface UiState {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
  openMobileMenu: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  isMobileMenuOpen: false,

  toggleMobileMenu: () =>
    set((state) => ({
      isMobileMenuOpen: !state.isMobileMenuOpen,
    })),

  closeMobileMenu: () =>
    set({
      isMobileMenuOpen: false,
    }),

  openMobileMenu: () =>
    set({
      isMobileMenuOpen: true,
    }),
}));
