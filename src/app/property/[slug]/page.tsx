'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useListingDetail } from '@/features/listings/hooks/useListings';
import { useWishlistStore } from '@/features/wishlist/store';
import { formatPrice, formatArea, formatPricePerSqFt } from '@/lib/format';
import { calculateEmi } from '@/features/tools/lib/emi';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Heart,
  MapPin,
  ShieldCheck,
  Building,
  Calendar,
  Layers,
  Compass,
  CheckCircle2,
  Phone,
  MessageSquare,
  ArrowLeft,
  Share2,
  Sparkles,
  Bath,
  Bed,
  Car,
} from 'lucide-react';

export default function PropertyDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || '';

  const { data: property, isLoading, isError } = useListingDetail(slug);
  const { isWishlisted, toggleWishlist } = useWishlistStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [visitorName, setVisitorName] = useState('');
  const [visitorPhone, setVisitorPhone] = useState('');
  const [visitDate, setVisitDate] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full border-2 border-brick border-t-transparent animate-spin mx-auto" />
        <h2 className="font-montreal font-semibold text-lg text-ink">
          Retrieving property specifications &amp; verified title deeds...
        </h2>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-montreal font-bold text-2xl text-ink">Property Not Found</h2>
        <p className="text-sm text-ink/70">
          The property address you requested may have been archived or leased.
        </p>
        <Link href="/">
          <Button variant="default">Browse Active Listings</Button>
        </Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(property.id);
  const estimatedEmi = calculateEmi(property.price * 0.8, 8.5, 20);

  const images = property.images && property.images.length > 0
    ? property.images
    : ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
    setTimeout(() => {
      setBookingConfirmed(false);
      setContactModalOpen(false);
      setVisitorName('');
      setVisitorPhone('');
      setVisitDate('');
    }, 2500);
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen py-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Back */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-ink/60 border-b border-sand pb-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-brick flex items-center gap-1 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <Link href={`/search?city=${property.city.toLowerCase()}`} className="hover:text-brick">
              {property.city}
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold truncate max-w-[200px] sm:max-w-md">
              {property.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: property.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-sand hover:border-brick text-ink text-xs font-medium transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>

            <button
              onClick={() => toggleWishlist(property)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-white border border-sand hover:border-brick text-ink text-xs font-medium transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${wishlisted ? 'text-brick fill-brick' : 'text-ink'}`} />
              <span>{wishlisted ? 'Saved' : 'Shortlist'}</span>
            </button>
          </div>
        </div>

        {/* Top Header: Title, Price, Badges */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 bg-white p-6 rounded-sm border border-sand shadow-xs">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {property.badge && (
                <Badge variant="brick" className="text-xs font-semibold">
                  {property.badge}
                </Badge>
              )}
              {property.reraApproved && (
                <Badge variant="success" className="text-xs font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>RERA Verified: {property.reraId || 'Approved'}</span>
                </Badge>
              )}
              <span className="text-xs text-ink/60 bg-sand-light px-2.5 py-0.5 rounded-sm">
                ID: {property.id}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-montreal tracking-tight text-ink">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-sm text-ink/70">
              <MapPin className="w-4 h-4 text-brick shrink-0" />
              <span>{property.locality}, {property.city}, {property.state}</span>
            </div>
          </div>

          {/* Pricing Box */}
          <div className="lg:text-right space-y-1">
            <div className="text-xs uppercase tracking-wider text-ink/60 font-semibold">
              Total Acquisition Price
            </div>
            <div className="text-3xl sm:text-4xl font-bold font-montreal text-brick tracking-tight">
              {formatPrice(property.price)}
            </div>
            <div className="text-xs text-ink/60">
              {property.pricePerSqFt && (
                <span>{formatPricePerSqFt(property.pricePerSqFt)} &bull; </span>
              )}
              <span>Est. EMI: ₹{estimatedEmi.toLocaleString('en-IN')}/mo</span>
            </div>
          </div>
        </div>

        {/* Gallery Section with Main Image & Thumbnails */}
        <div className="space-y-3">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-sm overflow-hidden bg-sand-light border border-sand shadow-sm">
            <Image
              src={images[activeImageIdx] || images[0]}
              alt={property.title}
              fill
              priority
              sizes="100vw"
              className="object-cover transition-all duration-300"
            />
            <div className="absolute bottom-4 right-4 bg-dark/80 backdrop-blur-xs text-cream text-xs px-3 py-1 rounded-sm font-medium border border-white/10">
              Photo {activeImageIdx + 1} of {images.length}
            </div>
          </div>

          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIdx(i)}
                  className={`relative w-28 h-20 rounded-sm overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIdx === i ? 'border-brick ring-2 ring-brick/20' : 'border-sand opacity-75 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`Thumbnail ${i + 1}`} fill sizes="112px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Grid: Details on Left (8 cols) + Contact Sidebar on Right (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Left Details (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Quick Specs Strip */}
            <div className="bg-white rounded-sm border border-sand p-6 shadow-xs">
              <h3 className="text-xs uppercase tracking-wider font-semibold text-ink/60 mb-4 pb-2 border-b border-sand">
                Architectural Blueprint &amp; Specs
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-ink/60 text-xs">
                    <Bed className="w-4 h-4 text-brick" />
                    <span>Bedrooms</span>
                  </div>
                  <span className="font-montreal font-bold text-base text-ink block">
                    {property.bhk > 0 ? `${property.bhk} BHK` : property.propertyType}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-ink/60 text-xs">
                    <Bath className="w-4 h-4 text-brick" />
                    <span>Bathrooms</span>
                  </div>
                  <span className="font-montreal font-bold text-base text-ink block">
                    {property.bathrooms || 2} Ensuite
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-ink/60 text-xs">
                    <Layers className="w-4 h-4 text-brick" />
                    <span>Super Area</span>
                  </div>
                  <span className="font-montreal font-bold text-base text-ink block">
                    {formatArea(property.areaSqFt)}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-ink/60 text-xs">
                    <Calendar className="w-4 h-4 text-brick" />
                    <span>Status</span>
                  </div>
                  <span className="font-montreal font-bold text-base text-ink block">
                    {property.possessionDate}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 mt-6 border-t border-sand/60">
                <div>
                  <span className="text-[10px] uppercase text-ink/50 block">Furnishing</span>
                  <span className="font-medium text-xs text-ink">{property.furnishingStatus || 'Semi-Furnished'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-ink/50 block">Property Type</span>
                  <span className="font-medium text-xs text-ink">{property.propertyType}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-ink/50 block">Developer</span>
                  <span className="font-medium text-xs text-ink">{property.builderName}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-ink/50 block">Facing</span>
                  <span className="font-medium text-xs text-ink">North-East Vastu</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-sm border border-sand p-6 shadow-xs space-y-3">
              <h3 className="font-montreal font-bold text-lg text-ink">
                About this Property
              </h3>
              <p className="text-sm text-ink/75 leading-relaxed">
                Experience refined architectural living at {property.title}. Situated in the prime enclave of {property.locality}, this signature {property.propertyType.toLowerCase()} offers high floor-to-ceiling heights, expansive daylight apertures, and cross-ventilation designed to optimize thermal efficiency.
              </p>
              <p className="text-sm text-ink/75 leading-relaxed">
                Residents enjoy an integrated community ecosystem developed by {property.builderName}, featuring comprehensive security infrastructure, high-speed elevator banks, and certified earthquake-resistant structural engineering compliant with Indian National Building Code norms.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-white rounded-sm border border-sand p-6 shadow-xs space-y-4">
              <h3 className="font-montreal font-bold text-lg text-ink">
                Curated Amenities &amp; Features
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(property.amenities || ['Clubhouse', 'Infinity Pool', 'EV Charging', '24x7 Security', 'Private Elevators', 'Gymnasium']).map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 p-3 rounded-sm bg-cream/70 border border-sand text-xs font-semibold text-ink"
                  >
                    <CheckCircle2 className="w-4 h-4 text-brick shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Highlights */}
            <div className="bg-white rounded-sm border border-sand p-6 shadow-xs space-y-4">
              <h3 className="font-montreal font-bold text-lg text-ink">
                Neighbourhood Proximity Benchmarks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-ink/75">
                <div className="flex items-start gap-3 p-3 rounded-sm bg-sand-light/50 border border-sand">
                  <Compass className="w-4 h-4 text-brick shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Rapid Transit &amp; Metro</span>
                    <span>Direct connectivity via arterial ring corridors (8-10 mins).</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-sm bg-sand-light/50 border border-sand">
                  <Building className="w-4 h-4 text-brick shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Grade-A Business Parks</span>
                    <span>Proximity to corporate office campuses and IT corridors.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-sm bg-sand-light/50 border border-sand">
                  <Car className="w-4 h-4 text-brick shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Expressway Connectivity</span>
                    <span>Seamless signal-free access to international airport expressways.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-sm bg-sand-light/50 border border-sand">
                  <Sparkles className="w-4 h-4 text-brick shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-ink block">Social Infrastructure</span>
                    <span>International baccalaureate schools and multispecialty healthcare within 3 km.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sticky Contact Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-sm border border-sand p-6 shadow-md space-y-5">
              <div className="flex items-center gap-3 pb-3 border-b border-sand">
                <div className="w-10 h-10 rounded-sm bg-sand-light border border-sand flex items-center justify-center text-brick font-montreal font-bold text-sm">
                  {property.builderName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h4 className="font-montreal font-bold text-sm text-ink">
                    Official Desk: {property.builderName}
                  </h4>
                  <p className="text-[11px] text-success font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Official Representative</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => setContactModalOpen(true)}
                  variant="default"
                  size="lg"
                  className="w-full font-semibold gap-2 shadow-xs"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Free Site Visit</span>
                </Button>

                <a
                  href={`https://wa.me/919876543210?text=Hello,%20I%20am%20interested%20in%20inspecting%20${encodeURIComponent(property.title)}%20(ID:%20${property.id})%20on%20BrickAura.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 h-11 px-4 rounded-sm border border-sand bg-cream hover:bg-white hover:border-brick text-ink text-sm font-semibold transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-success" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="tel:18004197000"
                  className="w-full inline-flex items-center justify-center gap-2 h-10 px-4 rounded-sm border border-sand bg-white hover:bg-cream text-ink text-xs font-medium transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brick" />
                  <span>Call Toll-Free Desk: 1800-419-7000</span>
                </a>
              </div>

              <div className="pt-3 border-t border-sand text-[11px] text-ink/60 space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                  <span>Zero brokerage &bull; Direct builder pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                  <span>RERA compliance audit verified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-success shrink-0" />
                  <span>Free cab pickup available for scheduled visits</span>
                </div>
              </div>
            </div>

            {/* Micro Loan Widget */}
            <div className="bg-cream rounded-sm border border-sand p-5 space-y-3 shadow-xs">
              <span className="text-[10px] uppercase font-bold tracking-wider text-brick block">
                Financing Assessment
              </span>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-ink/70">Estimated Monthly EMI:</span>
                <span className="font-montreal font-bold text-lg text-ink">
                  ₹{estimatedEmi.toLocaleString('en-IN')}/mo
                </span>
              </div>
              <p className="text-[11px] text-ink/60 leading-normal">
                Estimated at 8.5% interest rate p.a. for a 20-year tenure with 20% down payment.
              </p>
              <Link href="/#emi-tools">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                  Customise Loan Sliders &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Schedule Visit Modal */}
      <Dialog open={contactModalOpen} onOpenChange={setContactModalOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-xl">Schedule Private Site Visit</DialogTitle>
            <DialogDescription>
              {property.title} &bull; {property.locality}
            </DialogDescription>
          </DialogHeader>

          {bookingConfirmed ? (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mx-auto text-success">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-montreal font-bold text-lg text-ink">
                Site Visit Confirmed!
              </h4>
              <p className="text-xs text-ink/70 max-w-xs mx-auto">
                Our property relationship manager will contact you on WhatsApp with directions, entry gate QR codes, and parking details.
              </p>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink/70">Full Name</label>
                <Input
                  placeholder="e.g. Rahul Sharma"
                  required
                  value={visitorName}
                  onChange={(e) => setVisitorName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink/70">WhatsApp Number</label>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  required
                  value={visitorPhone}
                  onChange={(e) => setVisitorPhone(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-ink/70">Preferred Visit Date</label>
                <Input
                  type="date"
                  required
                  value={visitDate}
                  onChange={(e) => setVisitDate(e.target.value)}
                />
              </div>

              <div className="pt-2">
                <Button type="submit" variant="default" className="w-full h-11 font-semibold">
                  Confirm Site Visit Booking (Free)
                </Button>
              </div>

              <div className="flex items-center gap-1.5 text-[10px] text-ink/50 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-brick" />
                <span>Zero brokerage. Direct builder coordination.</span>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

