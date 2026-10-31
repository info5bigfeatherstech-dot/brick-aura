'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Trash2, ArrowRight } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useWishlistStore } from '@/features/wishlist/store';
import { useUiStore } from '@/lib/ui-store';
import { formatPrice } from '@/lib/format';

export function WishlistDrawer() {
  const { wishlistSheetOpen, setWishlistSheetOpen } = useUiStore();
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const wishlistCount = mounted ? items.length : 0;

  return (
    <Sheet open={wishlistSheetOpen} onOpenChange={setWishlistSheetOpen}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-md p-6">
        <SheetHeader className="border-b border-sand pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brick fill-brick" />
              <span>Saved Properties ({wishlistCount})</span>
            </SheetTitle>
            {wishlistCount > 0 && (
              <button
                onClick={clearWishlist}
                className="text-xs text-ink/60 hover:text-danger transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          <SheetDescription>
            Your shortlisted residences and investment properties are saved across sessions.
          </SheetDescription>
        </SheetHeader>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {wishlistCount === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-12 h-12 rounded-full bg-cream border border-sand flex items-center justify-center text-ink/40">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="font-montreal font-semibold text-base text-ink">
                Your shortlist is empty
              </h4>
              <p className="text-xs text-ink/60 max-w-xs leading-relaxed">
                Click the heart icon on any residential or commercial property card to compare and save it here.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setWishlistSheetOpen(false)}
                className="mt-2"
              >
                Explore Properties
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="group relative flex gap-3 p-3 rounded-sm border border-sand bg-white hover:border-brick transition-all duration-150"
              >
                <div className="relative w-24 h-20 rounded-sm overflow-hidden shrink-0 bg-sand-light">
                  <Image
                    src={item.images[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80'}
                    alt={item.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <h5 className="font-montreal font-semibold text-sm text-ink truncate group-hover:text-brick transition-colors">
                      {item.title}
                    </h5>
                    <p className="text-xs text-ink/60 truncate">
                      {item.locality}, {item.city}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-sand/40">
                    <span className="font-montreal font-bold text-sm text-brick">
                      {formatPrice(item.price)}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-ink/40 hover:text-danger p-1 transition-colors"
                      title="Remove from shortlist"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {wishlistCount > 0 && (
          <div className="border-t border-sand pt-4 space-y-2">
            <Link
              href="/search"
              onClick={() => setWishlistSheetOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 bg-brick text-white rounded-sm text-sm font-semibold hover:bg-brick-hover transition-colors"
            >
              <span>Compare All Properties</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

