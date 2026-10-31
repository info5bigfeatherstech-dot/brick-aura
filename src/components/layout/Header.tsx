'use client';

import React from 'react';
import { MainNav } from './MainNav';
import { MobileMenuSheet } from './MobileMenuSheet';
import { WishlistDrawer } from './WishlistDrawer';

export function Header() {
  return (
    <>
      <MainNav />
      <MobileMenuSheet />
      <WishlistDrawer />
    </>
  );
}
