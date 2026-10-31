import { create } from 'zustand';
import { Project } from '@/features/listings/types';

interface UiState {
  mobileMenuOpen: boolean;
  citySelectorOpen: boolean;
  wishlistSheetOpen: boolean;
  brochureModalProject: Project | null;
  setMobileMenuOpen: (open: boolean) => void;
  setCitySelectorOpen: (open: boolean) => void;
  setWishlistSheetOpen: (open: boolean) => void;
  openBrochureModal: (project: Project) => void;
  closeBrochureModal: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  mobileMenuOpen: false,
  citySelectorOpen: false,
  wishlistSheetOpen: false,
  brochureModalProject: null,
  setMobileMenuOpen: (mobileMenuOpen) => set({ mobileMenuOpen }),
  setCitySelectorOpen: (citySelectorOpen) => set({ citySelectorOpen }),
  setWishlistSheetOpen: (wishlistSheetOpen) => set({ wishlistSheetOpen }),
  openBrochureModal: (project) => set({ brochureModalProject: project }),
  closeBrochureModal: () => set({ brochureModalProject: null }),
}));

