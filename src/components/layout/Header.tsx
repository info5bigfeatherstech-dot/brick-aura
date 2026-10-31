'use client';

import React from 'react';
import { UtilityStrip } from './UtilityStrip';
import { MainNav } from './MainNav';
import { MobileMenuSheet } from './MobileMenuSheet';
import { WishlistDrawer } from './WishlistDrawer';

export function Header() {
  return (
    <>
      <UtilityStrip />
      <MainNav />
      <MobileMenuSheet />
      <WishlistDrawer />
    </>
  );
}

