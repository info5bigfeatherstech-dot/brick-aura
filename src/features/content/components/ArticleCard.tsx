'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Article } from '../types';
import { Badge } from '@/components/ui/badge';
import { Clock, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  isLarge?: boolean;
  className?: string;
}

export function ArticleCard({ article, isLarge = false, className }: ArticleCardProps) {
  if (isLarge) {
    return (
      <Link
        href={`/articles/${article.slug}`}
        className={cn(
          'group relative bg-white rounded-sm border border-sand hover:border-brick overflow-hidden flex flex-col justify-between shadow-xs transition-all duration-200 hover:-translate-y-1 h-full',
          className
        )}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand-light">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="brick" className="bg-white/95 text-brick backdrop-blur-xs font-semibold">
              {article.category}
            </Badge>
          </div>
        </div>

        <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-ink/60">
              <span className="font-medium text-ink">{article.author}</span>
              <span>&bull;</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-brick" />
                <span>{article.readTime}</span>
              </span>
              <span>&bull;</span>
              <span>{article.publishedDate}</span>
            </div>

            <h3 className="font-montreal font-bold text-xl text-ink group-hover:text-brick transition-colors leading-snug">
              {article.title}
            </h3>

            <p className="text-xs sm:text-sm text-ink/70 line-clamp-3 leading-relaxed">
              {article.excerpt}
            </p>
          </div>

          <div className="pt-4 border-t border-sand flex items-center justify-between text-xs">
            <span className="font-semibold text-brick">Read Full Analysis</span>
            <ArrowUpRight className="w-4 h-4 text-brick group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </Link>
    );
  }

  // Small Article Card
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn(
        'group bg-white rounded-sm border border-sand hover:border-brick p-3.5 transition-all duration-200 hover:-translate-y-0.5 flex gap-3.5 shadow-xs',
        className
      )}
    >
      <div className="relative w-28 h-24 rounded-sm overflow-hidden bg-sand-light shrink-0">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="112px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[10px] text-ink/50">
            <span className="font-semibold text-brick uppercase tracking-wider">
              {article.category}
            </span>
            <span className="flex items-center gap-0.5">
              <Clock className="w-2.5 h-2.5" />
              <span>{article.readTime}</span>
            </span>
          </div>

          <h4 className="font-montreal font-semibold text-xs sm:text-sm text-ink line-clamp-2 group-hover:text-brick transition-colors leading-snug">
            {article.title}
          </h4>
        </div>

        <div className="pt-1.5 border-t border-sand/50 flex items-center justify-between text-[11px] text-ink/60">
          <span>{article.publishedDate}</span>
          <span className="font-semibold text-brick inline-flex items-center gap-0.5">
            <span>Read</span>
            <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

