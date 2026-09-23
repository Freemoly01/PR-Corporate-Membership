import React from 'react';
import { motion } from 'motion/react';
import { 
  Printer, 
  X, 
  Check, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Trophy, 
  Users, 
  Building2, 
  Car, 
  Star, 
  Ticket,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface PrintMembershipModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrintMembershipModal({ isOpen, onClose }: PrintMembershipModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-sm flex flex-col items-center justify-start p-3 sm:p-6 print:p-0 print:bg-white print:static print:overflow-visible">
      {/* Print styles injected for clean A4 printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #print-document, #print-document * {
            visibility: visible !important;
          }
          #print-document {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 24px !important;
            background: white !important;
            color: #0f172a !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Modal Controls (Hidden in Print) */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="no-print w-full max-w-4xl flex items-center justify-between py-3 px-5 bg-[#16223a] border border-[#c19541]/40 rounded-xl mb-4 text-[#f4f4f4] shadow-2xl"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#c19541]/20 flex items-center justify-center text-[#c19541]">
            <Printer className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-white">Print-Friendly Membership Summary</h4>
            <p className="text-[11px] text-[#d0d7de] font-light">Optimized for standard A4 printing and PDF export</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#e9bd12] hover:bg-[#d8ae0e] text-black font-semibold text-xs tracking-normal rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close printable version"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Simplified Print Document Sheet */}
      <motion.div 
        id="print-document"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-10 md:p-12 print:p-0 print:shadow-none border border-slate-200"
      >
        {/* Document Header */}
        <div className="border-b-2 border-[#c19541] pb-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src="https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2026/09/PerthRacing_Logo.svg" 
              alt="Perth Racing Logo" 
              className="h-10 w-auto object-contain filter invert"
            />
            <div>
              <h1 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#101826] font-['Prata',serif]">
                Corporate Membership
              </h1>
              <p className="text-xs uppercase tracking-widest text-[#8c6d2d] font-semibold">
                Perth Racing • 2026–2027 Season Prospectus
              </p>
            </div>
          </div>
          <div className="text-left sm:text-right bg-amber-50 sm:bg-transparent p-3 sm:p-0 rounded border sm:border-0 border-amber-200 w-full sm:w-auto">
            <span className="text-[11px] uppercase tracking-wider text-slate-500 block font-medium">Total Inclusions Value</span>
            <span className="text-xl font-extrabold text-[#8c6d2d]">$19,000 +</span>
          </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-8 bg-slate-50 p-5 rounded-lg border border-slate-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 mb-2">
            Your Place at the Track — Executive Overview
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed font-normal">
            Perth Racing Corporate Membership delivers year-round client entertaining, team engagement, and networking assets across Western Australia's premier metropolitan racecourses: Ascot Racecourse and Belmont Park Racecourse. Membership passes are fully transferable, providing seamless access for colleagues and clients without advance bookings.
          </p>
        </div>

        {/* Entitlements Grid / Table */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-widest text-[#8c6d2d] font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#8c6d2d]" /> Schedule of 2026–2027 Membership Entitlements
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Benefit 1 */}
            <div className="p-3.5 border border-slate-200 rounded-lg bg-white">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#8c6d2d]" /> 10x Corporate Member Passes
                </span>
                <span className="text-[11px] font-semibold text-[#8c6d2d] bg-amber-50 px-2 py-0.5 rounded">Valued at $880</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Gate entry & Member area access for every standard raceday at Ascot and Belmont Park. Fully transferable to staff and clients.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="p-3.5 border border-slate-200 rounded-lg bg-white">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Ticket className="w-3.5 h-3.5 text-[#8c6d2d]" /> 16x Privilege Passes
                </span>
                <span className="text-[11px] font-semibold text-[#8c6d2d] bg-amber-50 px-2 py-0.5 rounded">Valued at $3,600</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Additional Member area access. Invite colleagues and key corporate guests directly into exclusive enclosure areas.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="p-3.5 border border-slate-200 rounded-lg bg-white sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-[#8c6d2d]" /> 10x All-Inclusive & Four Feature Racedays
                </span>
                <span className="text-[11px] font-semibold text-[#8c6d2d] bg-amber-50 px-2 py-0.5 rounded">Valued at $11,600</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Premium all-day canapés & beverage hospitality covering the 4 marquee racedays: Melbourne Cup Day, Railway Stakes Day, Perth Cup Day, and The Quokka Day.
              </p>
            </div>

            {/* Benefit 4 */}
            <div className="p-3.5 border border-slate-200 rounded-lg bg-white">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-[#8c6d2d]" /> 10x Car Park Passes
                </span>
                <span className="text-[11px] font-semibold text-[#8c6d2d] bg-amber-50 px-2 py-0.5 rounded">Valued at $1,000</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Convenient parking in the dedicated Member car park at both Ascot and Belmont Park racecourses throughout the entire racing calendar.
              </p>
            </div>

            {/* Benefit 5 */}
            <div className="p-3.5 border border-slate-200 rounded-lg bg-white">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#8c6d2d]" /> Private Suite For The Day
                </span>
                <span className="text-[11px] font-semibold text-[#8c6d2d] bg-amber-50 px-2 py-0.5 rounded">Valued at $2,200</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Dedicated luxury suite accommodating up to 10 guests for corporate entertainment (valid standard racedays January to July).
              </p>
            </div>

            {/* Benefit 6 */}
            <div className="p-3.5 border border-slate-200 rounded-lg bg-white sm:col-span-2">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 text-[#8c6d2d]" /> Additional Corporate Member Perks
                </span>
                <span className="text-[11px] font-semibold text-[#8c6d2d] bg-amber-50 px-2 py-0.5 rounded">VIP Concierge</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Member discounts on hospitality dining, 2x invitations to Perth Racing corporate networking mixers, and a dedicated Account Manager.
              </p>
            </div>
          </div>
        </div>

        {/* Feature Racedays Calendar Summary */}
        <div className="mb-8">
          <h3 className="text-xs uppercase tracking-widest text-[#8c6d2d] font-bold mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#8c6d2d]" /> Feature Racedays Included (2026–2027 Season)
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
            <div className="p-2.5 border border-slate-200 rounded bg-slate-50">
              <span className="text-[10px] text-[#8c6d2d] font-bold uppercase block">3 Nov 2026</span>
              <strong className="text-slate-900 block text-[11px]">Melbourne Cup Day</strong>
              <span className="text-[10px] text-slate-500">Ascot Racecourse</span>
            </div>
            <div className="p-2.5 border border-slate-200 rounded bg-slate-50">
              <span className="text-[10px] text-[#8c6d2d] font-bold uppercase block">21 Nov 2026</span>
              <strong className="text-slate-900 block text-[11px]">Railway Stakes Day</strong>
              <span className="text-[10px] text-slate-500">The Pinnacles • Ascot</span>
            </div>
            <div className="p-2.5 border border-slate-200 rounded bg-slate-50">
              <span className="text-[10px] text-[#8c6d2d] font-bold uppercase block">1 Jan 2027</span>
              <strong className="text-slate-900 block text-[11px]">Perth Cup Day</strong>
              <span className="text-[10px] text-slate-500">New Year Gala • Ascot</span>
            </div>
            <div className="p-2.5 border border-slate-200 rounded bg-slate-50">
              <span className="text-[10px] text-[#8c6d2d] font-bold uppercase block">17 Apr 2027</span>
              <strong className="text-slate-900 block text-[11px]">The Quokka Day</strong>
              <span className="text-[10px] text-slate-500">$5M Slot Race • Ascot</span>
            </div>
          </div>
        </div>

        {/* Venues Summary */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="border border-slate-200 p-3 rounded-lg">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#8c6d2d]" /> Ascot Racecourse
            </h4>
            <p className="text-[11px] text-slate-600">Grandstand Rd, Ascot WA 6104</p>
            <p className="text-[10px] text-[#8c6d2d] font-medium mt-1">October – April (Spring & Summer Racing)</p>
          </div>
          <div className="border border-slate-200 p-3 rounded-lg">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-[#8c6d2d]" /> Belmont Park Racecourse
            </h4>
            <p className="text-[11px] text-slate-600">Burswood Peninsula, Burswood WA 6100</p>
            <p className="text-[10px] text-[#8c6d2d] font-medium mt-1">May – September (Winter Racing Series)</p>
          </div>
        </div>

        {/* Contact & Verification Footer */}
        <div className="pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-700">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">Nick Ristovic</h4>
            <p className="text-[11px] text-slate-600">General Manager Marketing & Communications</p>
            <div className="flex flex-wrap items-center gap-4 mt-1 text-[11px]">
              <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-[#8c6d2d]" /> 0421 242 979</span>
              <span className="flex items-center gap-1"><Mail className="w-3 h-3 text-[#8c6d2d]" /> nristovic@perthracing.com.au</span>
              <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-[#8c6d2d]" /> perthracing.com.au</span>
            </div>
          </div>
          <div className="text-left sm:text-right text-[10px] text-slate-500">
            <p className="flex items-center gap-1 sm:justify-end font-semibold text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8c6d2d]" /> Strictly Limited Corporate Memberships
            </p>
            <p className="mt-0.5">Perth Racing (The Western Australian Turf Club)</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
