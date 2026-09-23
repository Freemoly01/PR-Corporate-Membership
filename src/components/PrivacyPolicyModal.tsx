import React from 'react';
import { motion } from 'motion/react';
import { X, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl bg-[#20355e] border border-[#c19541]/40 rounded-2xl shadow-2xl overflow-hidden text-[#f4f4f4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/10 bg-[#16223a]">
          <div>
            <h3 className="text-xl md:text-2xl font-['Prata'] text-white uppercase tracking-wider">
              Privacy Policy & Data Collection
            </h3>
            <p className="text-xs text-[#c19541] tracking-wider uppercase font-medium mt-1">
              Perth Racing Corporate Membership Enquiries
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 hover:bg-[#c19541] hover:text-black text-white border border-white/10 hover:border-[#c19541] flex items-center justify-center transition-all cursor-pointer"
            aria-label="Close privacy policy modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-sm text-[#d0d7de] font-light leading-relaxed">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c19541] flex items-center gap-2">
              <FileText className="w-4 h-4" /> 1. Overview & Commitment to Privacy
            </h4>
            <p>
              Perth Racing is committed to protecting the privacy of our members, corporate partners, and prospective guests. This Privacy Policy outlines how we collect, use, store, and safeguard personal information submitted through our 2026–2027 Corporate Membership enquiry forms and commercial interactions.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c19541] flex items-center gap-2">
              <Lock className="w-4 h-4" /> 2. Information We Collect
            </h4>
            <p>
              When you submit a membership enquiry or interact with our commercial team (including Nick Ristovic and Perth Racing membership executives), we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#e2e8f0]">
              <li>Full name and professional title</li>
              <li>Corporate organization or business name</li>
              <li>Direct telephone number and email address</li>
              <li>Specific membership tier interest and ticketing or hospitality requirements</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c19541] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> 3. Purpose of Data Collection & Use
            </h4>
            <p>
              Information collected is utilized exclusively for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#e2e8f0]">
              <li>Processing and responding to your 2026–2027 Corporate Membership enquiries</li>
              <li>Providing customized commercial proposals, fixture schedules, and hospitality packages</li>
              <li>Delivering essential updates regarding Ascot and Belmont Park race meetings</li>
              <li>Maintaining secure internal records for account management</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c19541]">4. Data Security & Storage</h4>
            <p>
              We implement industry-standard security protocols and encrypted data storage to prevent unauthorized access, disclosure, or alteration of personal data. Your information is never sold, traded, or shared with third-party marketing agencies.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-[#c19541]">5. Contact Our Privacy Officer</h4>
            <p>
              If you have any questions regarding your data or wish to update or remove your details from our enquiry records, please contact our Commercial & Partnerships team directly at <strong className="text-[#c19541]">nristovic@perthracing.com.au</strong> or call <strong className="text-[#c19541]">0421 242 979</strong>.
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 md:p-6 bg-[#16223a] border-t border-white/10 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#c19541] hover:bg-[#b08c48] text-black font-semibold text-xs uppercase tracking-[0.2em] rounded-lg transition-all cursor-pointer shadow-md"
          >
            Acknowledge & Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}
