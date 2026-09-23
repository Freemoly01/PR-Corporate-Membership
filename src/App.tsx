import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  Calendar, 
  Car, 
  Users, 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Star,
  Ticket,
  MapPin,
  Clock,
  HelpCircle,
  ChevronDown,
  Compass,
  Menu,
  X,
  Copy,
  Check,
  Printer,
  Map,
  ArrowUp,
  Pause,
  Play
} from 'lucide-react';
import PrintMembershipModal from './components/PrintMembershipModal';
import PrivacyPolicyModal from './components/PrivacyPolicyModal';

export default function App() {
  // Slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [benefitSlide, setBenefitSlide] = useState(0);
  const [calendarSlide, setCalendarSlide] = useState(0);
  const [overviewImageIndex, setOverviewImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setOverviewImageIndex((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  // Carousel refs and infinite loop helpers
  const benefitsScrollRef = useRef<HTMLDivElement>(null);
  const calendarScrollRef = useRef<HTMLDivElement>(null);
  const [dragStartX, setDragStartX] = useState<number | null>(null);

  const scrollContainer = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const firstCard = ref.current.querySelector('.carousel-card');
      const step = firstCard ? (firstCard as HTMLElement).offsetWidth + 24 : 380;
      ref.current.scrollBy({ left: direction === 'left' ? -step : step, behavior: 'smooth' });
    }
  };

  const handleInfiniteScroll = (ref: React.RefObject<HTMLDivElement | null>, originalLength: number) => {
    if (!ref.current) return;
    const cardWidth = 380 + 24;
    const singleSetWidth = originalLength * cardWidth;
    const scrollLeft = ref.current.scrollLeft;

    if (scrollLeft < singleSetWidth * 0.5) {
      ref.current.scrollLeft += singleSetWidth;
    } else if (scrollLeft > singleSetWidth * 2.5) {
      ref.current.scrollLeft -= singleSetWidth;
    }
  };

  // Venue toggle state ('ascot' | 'belmont')
  const [activeVenue, setActiveVenue] = useState<'ascot' | 'belmont'>('ascot');
  
  // Venue suite preview state
  const ascotSuites = [
    {
      title: "Members Grandstand Lounge",
      subtitle: "Panoramic views overlooking the winning post and mounting yard",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2025/06/RiftPhotography-KiaQuokkaDay-224-scaled.webp",
      badge: "Grandstand",
      description: "Ascot Racecourse is the crown jewel of Western Australian racing. Located just minutes from the Perth CBD on the banks of the Swan River, it hosts elite Group 1 racing throughout the Pinnacles Carnival. Corporate Members enjoy unrestricted access to the members enclosure, panoramic grandstands, and world-class dining facilities."
    },
    {
      title: "The Terrace Restaurant & Dining",
      subtitle: "Fine dining hospitality with tiered seating and silver service",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2025/06/RiftPhotography-KiaQuokkaDay-224-scaled.webp",
      badge: "Terrace Dining",
      description: "Enjoy premier table service and gourmet dining at The Terrace, offering uninterrupted views of the home straight while you entertain clients and business partners in style."
    },
    {
      title: "Pinnacles VIP Marquee",
      subtitle: "Exclusive all-inclusive marquee for major spring carnival fixtures",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2025/06/RiftPhotography-KiaQuokkaDay-224-scaled.webp",
      badge: "VIP Marquee",
      description: "Step inside the magnificent Pinnacles VIP Marquee during spring racing peak days. Featuring private bars, gourmet grazing stations, and dedicated wagering hosts."
    },
    {
      title: "Mounting Yard Suite",
      subtitle: "Up-close proximity to pre-race parade and mounting ring action",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2025/06/RiftPhotography-KiaQuokkaDay-224-scaled.webp",
      badge: "Parade Ring",
      description: "Witness the excitement in the mounting yard right before each race from this exclusive suite, perfectly positioned for racing purists and corporate hosts."
    }
  ];

  const belmontSuites = [
    {
      title: "Riverside Pavilion",
      subtitle: "Picturesque Swan River views and relaxed winter racing ambiance",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2025/06/RiftPhotography-KiaQuokkaDay-224-scaled.webp",
      badge: "Riverside",
      description: "Situated on the Burswood peninsula alongside the Swan River, Belmont Park offers picturesque riverside views and is the premier home of Perth's winter racing season. Members benefit from relaxed, intimate corporate entertaining spaces and dedicated priority parking right at the gates."
    },
    {
      title: "Winter Racing Corporate Suite",
      subtitle: "Intimate indoor and outdoor viewing suites for corporate groups",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2025/06/RiftPhotography-KiaQuokkaDay-224-scaled.webp",
      badge: "Winter Suite",
      description: "Stay warm and sheltered while enjoying crisp winter racing action through panoramic glass windows overlooking the entire Belmont circuit."
    },
    {
      title: "Burswood Lawn Marquee",
      subtitle: "Spacious lawn marquee hosting vibrant member networking events",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2025/06/RiftPhotography-KiaQuokkaDay-224-scaled.webp",
      badge: "Lawn Marquee",
      description: "A vibrant outdoor-indoor marquee experience set on the manicured Burswood lawns, ideal for large corporate gatherings and social membership celebrations."
    },
    {
      title: "Owners & Members Lounge",
      subtitle: "Dedicated bar, barista coffee, and wagering facilities",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2025/06/RiftPhotography-KiaQuokkaDay-224-scaled.webp",
      badge: "Members Hub",
      description: "An exclusive sanctuary for members to enjoy barista-brewed morning coffee, complimentary racebooks, and dedicated account manager assistance."
    }
  ];

  const [activeSuiteIndex, setActiveSuiteIndex] = useState({ ascot: 0, belmont: 0 });

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [venueLoaded, setVenueLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setGalleryLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setVenueLoaded(false);
    const timer = setTimeout(() => setVenueLoaded(true), 800);
    return () => clearTimeout(timer);
  }, [activeVenue, activeSuiteIndex]);

  // Prevent background scrolling when full-screen mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.overflowX = '';
    };
  }, [mobileMenuOpen]);

  // Hero section in-view detection and resource optimization
  const [heroInView, setHeroInView] = useState(true);
  const heroInViewRef = useRef(true);
  const heroSentinelRef = useRef<HTMLDivElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // User manual video play/pause control
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const userPausedVideoRef = useRef(false);

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = heroVideoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedVideoRef.current = false;
      video.play().then(() => {
        setIsVideoPlaying(true);
      }).catch(() => {});
    } else {
      userPausedVideoRef.current = true;
      video.pause();
      setIsVideoPlaying(false);
    }
  };

  useEffect(() => {
    heroInViewRef.current = heroInView;
  }, [heroInView]);

  useEffect(() => {
    const sentinel = heroSentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setHeroInView(inView);
        heroInViewRef.current = inView;

        if (heroVideoRef.current) {
          if (inView) {
            if (!userPausedVideoRef.current) {
              heroVideoRef.current.play().then(() => {
                setIsVideoPlaying(true);
              }).catch(() => {});
            }
          } else {
            heroVideoRef.current.pause();
          }
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );

    observer.observe(sentinel);

    // Pause video playback when browser tab/window is hidden or unfocused
    const handleVisibilityChange = () => {
      if (document.hidden) {
        heroVideoRef.current?.pause();
      } else if (heroInViewRef.current && !userPausedVideoRef.current) {
        heroVideoRef.current?.play().then(() => {
          setIsVideoPlaying(true);
        }).catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Smart sticky header: shows when scrolling up, hides when scrolling down, always shows near top
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollYRef.current;

      // Always show when near the top of the page
      if (currentScrollY < 40) {
        setIsHeaderVisible(true);
      } else if (diff > 8) {
        // Scrolling down -> hide header
        setIsHeaderVisible(false);
      } else if (diff < -8) {
        // Scrolling up -> show header
        setIsHeaderVisible(true);
      }

      lastScrollYRef.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyEmail = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    navigator.clipboard.writeText('nristovic@perthracing.com.au');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsHeaderVisible(true);
    if (targetId === '#' || targetId === '' || targetId === '#top') {
      if (mobileMenuOpen) setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const cleanId = targetId.replace('#', '');
    const element = document.getElementById(cleanId);

    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
      // Wait briefly for full-screen overlay exit and body scroll unlock
      setTimeout(() => {
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } else {
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const slides = [
    {
      title: "Ascot Racecourse Grandstand & Trackside",
      subtitle: "Experience Perth racing's greatest moments from the members enclosure",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2025/12/RollingStills-PerthRacing-73-scaled.webp"
    },
    {
      title: "Exclusive Hospitality & Fine Dining",
      subtitle: "Unrivalled food, wine, and panoramic views of the mounting yard",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2026/04/RiftPhotography-PerthRacingBelmontParkRacecourse-135.jpg"
    },
    {
      title: "The Quokka & Major Racedays",
      subtitle: "WA racing's premier calendar events with all-inclusive VIP hospitality",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2025/01/Jokers-Grin_26-04-2025_WIN_Ascot_8__51-scaled.jpg"
    },
    {
      title: "Corporate Networking & Client Entertainment",
      subtitle: "Build lasting business relationships in a prestigious sporting setting",
      image: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2024/10/PR_2023-4606-scaled.webp"
    }
  ];

  // Auto slide effect
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, slides.length]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/hubspot-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const text = await response.text();
      let data: any = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        data = { error: text };
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }
      setIsSubmitting(false);
      setFormSubmitted(true);
    } catch (err: any) {
      console.error('Submission error:', err);
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };



  const benefitCards = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "10x Gate Entry & Member Area Access",
      value: "Valued at $880",
      description: "Member area access for every raceday at Ascot and Belmont Park Racecourses. Fully transferable - share with clients and staff.",
      footer: "Fully Transferable",
      footerIcon: <ShieldCheck className="w-4 h-4" />
    },
    {
      icon: <Ticket className="w-6 h-6" />,
      title: "16x Member Privilege Passes",
      value: "Valued at $3,600",
      description: "Invite additional guests directly into the Member area on any standard raceday.",
      footer: "Guest Access Included",
      footerIcon: <Ticket className="w-4 h-4" />
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "10x All-Inclusive Packages For Four Feature Racedays",
      value: "Valued at $11,600",
      description: "All-inclusive packages including all-day canapes and premium beverages on the four biggest racedays: Melbourne Cup Day · Railway Stakes Day · Perth Cup Day · Quokka Day",
      footer: "Premium Hospitality",
      footerIcon: <Trophy className="w-4 h-4" />
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "10x Car Park Passes",
      value: "Valued at $1,000",
      description: "Convenient parking in the Member car park on any raceday at both Ascot and Belmont Park Racecourses throughout the year. Access to the designated convenient Member car park on all 80+ race days at Belmont and Ascot throughout the Season.",
      footer: "Priority Parking",
      footerIcon: <Car className="w-4 h-4" />
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Private Suite For The Day",
      value: "Valued at $2,200",
      description: "Premium hospitality facility for up to 10 guests (subject to availability) on any standard raceday, valid January - July.",
      footer: "Exclusive Suite",
      footerIcon: <Building2 className="w-4 h-4" />
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: "Additional Member Perks",
      value: "Exclusive Access",
      description: (
        <ul className="text-[#d0d7de] text-sm space-y-2 font-light">
          <li>- Member discounts for all-inclusive events</li>
          <li>- 2 x Invitations to corporate networking events</li>
          <li>- Dedicated Perth Racing Account Manager</li>
        </ul>
      ),
      footer: "VIP Concierge",
      footerIcon: <Star className="w-4 h-4" />
    }
  ];

  const calendarEvents = [
    {
      date: "November 2026",
      name: "Railway Stakes Day",
      category: "Group 1 Feature",
      description: "Western Australia's premier mile handicap, opening the Pinnacles Carnival with elite hospitality."
    },
    {
      date: "November - December 2026",
      name: "Northerly Stakes & Winterbottom Stakes",
      category: "Pinnacles Carnival",
      description: "World-class sprinting and weight-for-age racing at Ascot with exclusive Member enclosure access."
    },
    {
      date: "January 2027",
      name: "Perth Cup Day",
      category: "Iconic WA Tradition",
      description: "One of Australia's oldest and most prestigious staying races, celebrated in style with corporate suites."
    },
    {
      date: "April 2027",
      name: "The Quokka",
      category: "Slot Race Extravaganza",
      description: "WA's richest race day drawing national attention, featuring all-inclusive canapés and premium beverages."
    },
    {
      date: "May - July 2027",
      name: "Belmont Winter Racing Season",
      category: "Mid-Year Enterprise",
      description: "Action-packed winter racing across Belmont Park with private suite privileges and networking events."
    }
  ];

  const extendedBenefits = [...benefitCards, ...benefitCards, ...benefitCards];
  const extendedCalendar = [...calendarEvents, ...calendarEvents, ...calendarEvents];

  useEffect(() => {
    const cardWidth = 380 + 24;
    if (benefitsScrollRef.current) {
      benefitsScrollRef.current.scrollLeft = benefitCards.length * cardWidth;
    }
    if (calendarScrollRef.current) {
      calendarScrollRef.current.scrollLeft = calendarEvents.length * cardWidth;
    }
  }, []);

  const faqs = [
    {
      question: "Are Corporate Membership passes fully transferable?",
      answer: "Yes. All 10x Member Passes and 16x Privilege Passes are fully transferable. You can easily share them with key clients, prospective partners, executives, and staff members for any raceday throughout the season without prior notice."
    },
    {
      question: "How do the Car Park Passes work across Ascot and Belmont Park?",
      answer: "Your 10x Car Park Passes give you convenient, priority parking in the dedicated Member car parks located directly adjacent to the main member entrances at both Ascot and Belmont Park racecourses on any raceday."
    },
    {
      question: "What is the dress code for the Members Enclosure?",
      answer: "The Members Enclosure maintains a high standard of race day elegance. Gentlemen are required to wear a suit or tailored jacket, collared shirt, and tie (optional during warmer summer fixtures), with dress shoes. Ladies typically dress in smart racewear/millinery. Denim, sneakers, and sportswear are not permitted."
    },
    {
      question: "How do I redeem my Private Suite for the Day?",
      answer: "Corporate Members receive 1 Private Suite experience for up to 10 guests (subject to availability), valid January through July. Simply contact your dedicated Perth Racing Account Manager at least 3 weeks prior to your preferred standard raceday to secure your facility."
    },
    {
      question: "Can I upgrade my passes for major feature racedays like The Quokka?",
      answer: "Absolutely. Membership includes options for All-Inclusive Packages covering the four biggest racedays (Melbourne Cup Day, Railway Stakes Day, Perth Cup Day, and Quokka Day) featuring gourmet canapés and premium beverages."
    }
  ];

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-clip bg-[#20355e] text-[#f4f4f4] font-['Inter',Arial,sans-serif] selection:bg-[#c19541] selection:text-black">
      
      {/* Full-Width Smart Sticky Header */}
      <motion.header 
        initial={{ y: 0 }}
        animate={{ y: isHeaderVisible ? 0 : '-100%' }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 w-full z-50 bg-[#092448] shadow-[0_4px_20px_rgba(0,0,0,0.35)]"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-[26px] flex items-center justify-between">
          {/* Desktop Left: Perth Racing Logo & Title */}
          <div className="hidden lg:flex items-center">
            <a 
              href="#" 
              onClick={(e) => scrollToSection(e, '#')}
              className="flex items-center gap-3.5 group cursor-pointer"
            >
              <img 
                src="https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2026/09/PerthRacing_Logo.svg" 
                alt="Perth Racing Logo" 
                className="w-[124px] h-[30px] object-contain filter brightness-125 transition-transform duration-300 group-hover:scale-105"
              />
              <div className="border-l border-white/20 pl-3.5 leading-4">
                <span className="font-bold tracking-[0.15em] text-xs uppercase block text-[#f4f4f4]">Perth Racing</span>
                <span className="text-[10px] text-[#c19541] tracking-widest uppercase font-medium">Corporate Membership</span>
              </div>
            </a>
          </div>

          {/* Desktop Right: Nav Links & CTA in Title Case */}
          <div className="hidden lg:flex items-center gap-7 text-[15px] font-medium text-[#e2e8f0]">
            <a href="#overview" onClick={(e) => scrollToSection(e, '#overview')} className="hover:text-[#c19541] transition-colors py-1 cursor-pointer">Overview</a>
            <a href="#benefits" onClick={(e) => scrollToSection(e, '#benefits')} className="hover:text-[#c19541] transition-colors py-1 cursor-pointer">Benefits</a>
            <a href="#calendar" onClick={(e) => scrollToSection(e, '#calendar')} className="hover:text-[#c19541] transition-colors py-1 cursor-pointer">Calendar</a>
            <a href="#venues" onClick={(e) => scrollToSection(e, '#venues')} className="hover:text-[#c19541] transition-colors py-1 cursor-pointer">Venues</a>
            <a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="hover:text-[#c19541] transition-colors py-1 cursor-pointer">FAQ</a>

            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, '#contact')}
              className="px-5 py-2.5 rounded-full bg-[#e9bd12] hover:bg-[#d8ae0e] text-black font-semibold text-sm tracking-normal transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
            >
              Enquire
            </a>
          </div>

          {/* Mobile View: Perth Racing logo on left, with Enquire button and burger icon on the right */}
          <div className="flex lg:hidden items-center justify-between w-full">
            <a 
              href="#" 
              onClick={(e) => scrollToSection(e, '#')}
              className="flex items-center cursor-pointer"
              aria-label="Perth Racing Home"
            >
              <img 
                src="https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2026/09/PerthRacing_Logo.svg" 
                alt="Perth Racing Logo" 
                className="w-[115px] min-[380px]:w-[124px] h-[28px] min-[380px]:h-[30px] object-contain filter brightness-125"
              />
            </a>

            <div className="flex items-center gap-2 sm:gap-3">
              <a 
                href="#contact" 
                onClick={(e) => scrollToSection(e, '#contact')}
                className="px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#e9bd12] hover:bg-[#d8ae0e] text-black font-semibold text-xs sm:text-sm tracking-normal transition-all duration-300 shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Enquire
              </a>

              <button
                onClick={() => setMobileMenuOpen(true)}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg text-white hover:text-[#c19541] active:text-[#e9bd12] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Open mobile navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Slick Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] w-full h-[100dvh] bg-[#092448] backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-8 lg:hidden overflow-y-auto"
          >
            {/* Background subtle gold glow & watermark */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#c19541]/5 rounded-full filter blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1c325d]/40 rounded-full filter blur-3xl pointer-events-none" />

            {/* Top Bar with Logo & Close Button */}
            <div className="relative z-10 flex items-center justify-between pb-5 border-b border-white/10 shrink-0">
              <a 
                href="#" 
                onClick={(e) => scrollToSection(e, '#')}
                className="flex items-center gap-3 cursor-pointer"
              >
                <img 
                  src="https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2026/09/PerthRacing_Logo.svg" 
                  alt="Perth Racing Logo" 
                  className="h-8 w-auto object-contain filter brightness-125"
                />
                <div className="border-l border-white/20 pl-3 leading-4">
                  <span className="font-bold tracking-[0.15em] text-xs uppercase block text-[#f4f4f4]">Perth Racing</span>
                  <span className="text-[10px] text-[#c19541] tracking-widest uppercase font-medium">Corporate Membership</span>
                </div>
              </a>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-[#16223a] border border-[#c19541]/40 text-[#c19541] hover:text-white hover:border-[#c19541] flex items-center justify-center transition-all duration-300 hover:rotate-90 shadow-lg cursor-pointer"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links with Staggered Slide-In Animation */}
            <div className="relative z-10 my-auto py-6 flex flex-col space-y-3">
              {[
                { label: 'Overview', href: '#overview', sub: 'Your Place at the Track' },
                { label: 'Benefits', href: '#benefits', sub: 'Exclusive Corporate Entitlements' },
                { label: 'Calendar', href: '#calendar', sub: '2026–2027 Feature Fixtures' },
                { label: 'Venues', href: '#venues', sub: 'Ascot & Belmont Park Facilities' },
                { label: 'Frequently Asked Questions', href: '#faq', sub: 'Passes, Dress Code & Suites' },
                { label: 'Enquire', href: '#contact', sub: 'Secure Your 2026–2027 Membership' },
              ].map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.4, 
                    delay: 0.06 + index * 0.05, 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="group flex items-center justify-between py-3 px-4 rounded-2xl bg-white/[0.03] hover:bg-[#c19541]/10 border border-white/5 hover:border-[#c19541]/40 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    <span className="text-lg font-['Prata'] text-white group-hover:text-[#c19541] transition-colors tracking-wide block">
                      {item.label}
                    </span>
                    <span className="text-xs text-[#aaaaaa] font-light block">
                      {item.sub}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#c19541] group-hover:text-black text-[#c19541] flex items-center justify-center transition-all duration-300 transform group-hover:translate-x-1 shrink-0">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Bottom Actions & Direct Contacts */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.35 }}
              className="relative z-10 pt-5 border-t border-white/10 shrink-0 space-y-3.5"
            >
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="py-3 px-4 bg-[#e9bd12] hover:bg-[#d8ae0e] text-black font-semibold text-sm rounded-xl shadow-lg transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  Enquire Now <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowPrintModal(true);
                  }}
                  className="py-3 px-4 bg-[#16223a] hover:bg-[#20355e] border border-[#c19541]/40 text-[#c19541] font-semibold text-sm rounded-xl transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Summary
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#aaaaaa] pt-1 px-1">
                <a href="tel:0421242979" className="hover:text-[#c19541] transition-colors flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#c19541]" /> 0421 242 979
                </a>
                <a href="mailto:nristovic@perthracing.com.au" className="hover:text-[#c19541] transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#c19541]" /> Contact GM
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section with Video Background (Fixed in place as user scrolls, paused and hidden when out of view) */}
      <header 
        className={`fixed top-0 left-0 right-0 w-full h-[70vh] max-lg:h-[70dvh] lg:h-screen flex flex-col items-center justify-end sm:justify-center text-center overflow-hidden z-0 transition-opacity duration-300 pb-11 min-[380px]:pb-14 sm:pb-0 ${
          heroInView ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{
          visibility: heroInView ? 'visible' : 'hidden',
          willChange: heroInView ? 'opacity' : 'auto',
        }}
        aria-hidden={!heroInView}
      >
        <div className="absolute inset-0 z-0 bg-black">
          <video 
            ref={heroVideoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-60 z-0" 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="auto"
          >
            <source src="https://perthracing.com.au/app/uploads/2026/09/PR_RWWA_NORTHERLY-STAKES-SOCIALS.webm" type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl px-4 sm:px-6 w-full top-0 sm:top-40 md:top-43 lg:top-58 xl:top-50"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="flex items-center justify-center gap-2 sm:gap-4 mb-3 sm:mb-4 md:mb-6"
          >
            <div className="w-4 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#c19541]/60 shrink" />
            <h2 className="text-[17px] min-[380px]:text-[20px] sm:text-[23px] whitespace-nowrap font-normal tracking-[0.14em] sm:tracking-[0.25em] uppercase text-[#c19541] font-['Arial',sans-serif]">
              Perth Racing
            </h2>
            <div className="w-4 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#c19541]/60 shrink" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[30px] min-[380px]:text-[36px] sm:text-5xl md:text-[61px] lg:text-[82px] font-['Prata'] font-normal uppercase tracking-[0.03em] sm:tracking-[0.04em] lg:tracking-[0.03em] mb-0 sm:mb-8 md:mb-10 text-white leading-[1.14] sm:leading-[52px] md:leading-[60px] lg:leading-[79px]"
          >
            Corporate Membership
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex flex-row items-center justify-center gap-2.5 sm:gap-5 px-3 max-w-full"
          >
            <motion.a 
              href="#benefits" 
              onClick={(e) => scrollToSection(e, '#benefits')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group relative w-auto overflow-hidden bg-[#e9bd12] hover:bg-[#d8ae0e] text-black font-semibold text-xs sm:text-sm px-4.5 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer tracking-normal whitespace-nowrap"
            >
              <span className="relative z-10 sm:hidden">Membership Benefits</span>
              <span className="relative z-10 hidden sm:inline">Explore Membership Benefits</span>
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
            </motion.a>
            <motion.a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, '#contact')}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group w-auto bg-[#1c325d] hover:bg-[#233e73] text-white border border-[#e9bd12]/60 hover:border-[#e9bd12] font-semibold text-xs sm:text-sm px-5.5 sm:px-8 py-3 sm:py-3.5 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer tracking-normal whitespace-nowrap"
            >
              <span>Enquire</span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Subtle Video Play/Pause Control Button */}
        <div className="hidden sm:block absolute sm:bottom-6 sm:left-6 lg:bottom-12 lg:left-8 z-20">
          <button
            type="button"
            onClick={toggleVideoPlayback}
            aria-label={isVideoPlaying ? "Pause background video" : "Play background video"}
            title={isVideoPlaying ? "Pause background video" : "Play background video"}
            className="flex items-center gap-2 px-3 py-1.5 md:py-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/20 hover:border-[#e9bd12]/70 text-white/75 hover:text-[#e9bd12] transition-all duration-300 text-xs tracking-normal cursor-pointer group"
          >
            {isVideoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-white/80 group-hover:text-[#c19541] transition-colors" />
                <span className="text-xs font-medium tracking-normal text-white/70 group-hover:text-white transition-colors">
                  Pause
                </span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#c19541] fill-[#c19541] transition-colors" />
                <span className="text-xs font-medium tracking-normal text-white/70 group-hover:text-white transition-colors">
                  Play
                </span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Sentinel in document flow to track hero viewport visibility and provide natural 70vh/100vh height */}
      <div 
        ref={heroSentinelRef} 
        className="w-full h-[70vh] max-lg:h-[70dvh] lg:h-screen pointer-events-none" 
        aria-hidden="true" 
      />

      {/* Main Content (Scrolls up over the hero section) */}
      <main className="relative z-10 bg-white">
        {/* Introduction Section */}
        <section id="overview" className="scroll-mt-24 md:scroll-mt-28 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 px-5 sm:px-8 md:px-12 lg:px-24 bg-white text-neutral-900 overflow-hidden shadow-[0_-12px_40px_rgba(0,0,0,0.18)] border-t border-[#c19541]/40">
        <motion.div 
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#c19541]/70" />
            <h3 className="text-2xl min-[380px]:text-[28px] sm:text-3xl md:text-4xl lg:text-[40px] font-['Prata'] font-normal text-neutral-900 uppercase tracking-[0.05em] sm:tracking-[0.08em] leading-tight">
              Your Place at the Track
            </h3>
            <div className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#c19541]/70" />
          </div>

          {/* Lead Editorial Paragraph */}
          <p className="text-[17px] min-[380px]:text-lg sm:text-xl md:text-[22px] text-neutral-900 font-normal leading-[1.48] sm:leading-[30.4px] tracking-tight mb-6 sm:mb-8">
            Perth Racing's Corporate Membership gives your business a standing invitation to Ascot and Belmont Park, for every raceday of the year. It's how you entertain clients without booking ahead, reward your team without organising an event, and give your business a genuine presence in WA racing's biggest calendar moments.
          </p>

          {/* Small Image Layout */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="my-8 sm:my-10 max-w-4xl mx-auto"
          >
            {/* Mobile simple slider with no UI elements and simple fade */}
            <div className="block sm:hidden relative h-56 rounded-lg overflow-hidden border border-[#c19541]/40">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={overviewImageIndex}
                  src={[
                    "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2024/08/The-Quokka-Raceday_20-04-2024_WIN_Ascot_0__102-scaled.jpg",
                    "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2024/08/The-Quokka-Raceday_15-04-2023_WIN_Ascot_0__160-scaled.jpg",
                    "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2024/08/Corporate-Membership_result.webp"
                  ][overviewImageIndex]} 
                  alt="Overview slide"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>

            {/* Desktop grid layout */}
            <div className="hidden sm:grid grid-cols-3 gap-6">
              {[
                { src: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2024/08/The-Quokka-Raceday_20-04-2024_WIN_Ascot_0__102-scaled.jpg", alt: "Perth Racing Raceday Action" },
                { src: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2024/08/The-Quokka-Raceday_15-04-2023_WIN_Ascot_0__160-scaled.jpg", alt: "Ascot Racecourse Hospitality" },
                { src: "https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2024/08/Corporate-Membership_result.webp", alt: "Corporate Membership Experience" }
              ].map((img, idx) => (
                <div key={idx} className="relative h-56 rounded-lg overflow-hidden border border-[#c19541]/40 group">
                  <img 
                    src={img.src} 
                    alt={img.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Supporting Body Paragraphs */}
          <div className="text-neutral-600 text-[15px] sm:text-base md:text-lg font-normal max-w-3xl mx-auto">
            <p className="leading-[1.48] sm:leading-[29.4px] mb-3.5 sm:mb-[16px]">
              It's also a chance to build your own network, with invitations to connect with other Corporate Members throughout the year.
            </p>
            <p className="leading-[1.48] sm:leading-[29.4px]">
              This isn't a one-off client lunch or a single big day out. It's a standing asset for your business, ready whenever you need it—whether that's closing a deal, thanking your team, or just watching the races with people worth knowing.
            </p>
          </div>
        </motion.div>

        {/* Brochure Image Slider */}
        <motion.div 
          id="gallery" 
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 max-w-6xl mx-auto"
        >
          <div className="flex items-center justify-end mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-600">{currentSlide + 1} / {slides.length}</span>
              <button 
                onClick={() => setIsPaused(!isPaused)} 
                className="text-xs text-neutral-700 hover:text-[#c19541] px-2.5 py-1 border border-neutral-300 rounded transition-colors bg-neutral-50 hover:bg-neutral-100"
              >
                {isPaused ? 'Resume Slideshow' : 'Pause'}
              </button>
            </div>
          </div>

          <div 
            className="relative w-full h-[320px] md:h-[500px] rounded-lg overflow-hidden border border-[#c19541]/40 bg-[#16223a]"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {!galleryLoaded && (
              <div className="absolute inset-0 bg-[#16223a] animate-pulse flex flex-col items-center justify-center p-8 space-y-4 z-10">
                <div className="w-12 h-12 rounded-full bg-[#c19541]/20 border border-[#c19541]/40 flex items-center justify-center text-[#c19541]">
                  <img src="https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2026/09/PR_Loading_Icon.svg" alt="Loading" className="w-6 h-6 animate-spin" />
                </div>
                <div className="space-y-2 text-center max-w-xs">
                  <div className="h-4 bg-white/10 rounded w-3/4 mx-auto" />
                  <div className="h-3 bg-white/5 rounded w-1/2 mx-auto" />
                </div>
              </div>
            )}
            <AnimatePresence mode="wait">
              <motion.img 
                key={currentSlide}
                src={slides[currentSlide].image} 
                alt={slides[currentSlide].title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onLoad={() => setGalleryLoaded(true)}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Slider Controls */}
            <button 
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-[#c19541]/40 flex items-center justify-center text-[#c19541] hover:bg-[#c19541] hover:text-black transition-all z-20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 border border-[#c19541]/40 flex items-center justify-center text-[#c19541] hover:bg-[#c19541] hover:text-black transition-all z-20"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Pagination Dots */}
            <div className="absolute bottom-4 right-6 flex items-center gap-2 z-20">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2 rounded-full transition-all ${idx === currentSlide ? 'w-8 bg-[#c19541]' : 'w-2 bg-white/40'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Slide Title and Subtitle Underneath Slider */}
          <motion.div 
            key={currentSlide + '-text'}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-6 px-1"
          >
            <h4 className="text-lg min-[380px]:text-xl md:text-2xl font-['Prata'] font-normal text-neutral-900 uppercase tracking-wider mb-2">
              {slides[currentSlide].title}
            </h4>
            <p className="text-xs min-[380px]:text-sm md:text-base text-neutral-600 max-w-3xl font-light leading-relaxed">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="scroll-mt-24 md:scroll-mt-28 relative pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 px-0 md:px-12 lg:px-24 bg-[#16223a] overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ 
            backgroundImage: `url('https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2026/09/Blue_Bkgrnd.webp')` 
          }}
        />
        {/* Subtle Overlay for Contrast and Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#16223a]/80 via-[#16223a]/70 to-[#16223a]/85 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-0">
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 sm:mb-16 px-5 md:px-0"
          >
            <span className="text-[#c19541] text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium block mb-2 sm:mb-3">Exclusive Entitlements</span>
            <h3 className="text-2xl min-[380px]:text-[28px] sm:text-4xl md:text-5xl font-['Prata'] font-normal text-[#c19541] uppercase tracking-[0.04em] sm:tracking-[0.05em] leading-tight">
              Corporate Membership Benefits
            </h3>
            <p className="text-[#d0d7de] max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base font-light leading-normal sm:leading-relaxed">
              Designed for maximum flexibility, transferability, and high-end hospitality across Ascot and Belmont Park racecourses.
            </p>
          </motion.div>

          {/* Mobile Horizontal Scrollable Carousel view for Benefits */}
          <div className="block md:hidden relative">
            <div 
              ref={benefitsScrollRef}
              onScroll={() => handleInfiniteScroll(benefitsScrollRef, benefitCards.length)}
              onMouseDown={(e) => setDragStartX(e.clientX)}
              onMouseUp={(e) => {
                if (dragStartX === null) return;
                const deltaX = e.clientX - dragStartX;
                if (Math.abs(deltaX) > 25) {
                  scrollContainer(benefitsScrollRef, deltaX > 0 ? 'left' : 'right');
                }
                setDragStartX(null);
              }}
              onMouseLeave={() => setDragStartX(null)}
              className="flex overflow-x-auto gap-4 px-0 pb-6 snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing select-none"
            >
              {extendedBenefits.map((card, idx) => {
                const originalIdx = idx % benefitCards.length;
                return (
                  <div 
                    key={idx}
                    className="carousel-card w-[85%] sm:w-[380px] flex-shrink-0 snap-center bg-gradient-to-b from-[#1b2d52] via-[#162545] to-[#111e38] backdrop-blur-xl border-t-[5px] border-t-[#c19541] border-x border-b border-[#c19541]/30 p-6 sm:p-8 rounded-2xl transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.4)] flex flex-col justify-between min-h-[380px] sm:min-h-[400px]"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-5 sm:mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#c19541]/25 via-[#c19541]/10 to-transparent border border-[#c19541]/50 flex items-center justify-center text-[#c19541] shadow-inner">
                          {card.icon}
                        </div>
                        <span className="text-xs text-[#aaaaaa] font-medium">{originalIdx + 1} / {benefitCards.length}</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-['Inter'] font-bold text-[#f4f4f4] uppercase tracking-wide mb-2 sm:mb-2.5">
                        {card.title}
                      </h4>
                      <div className="mb-3 sm:mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#c19541]/15 border border-[#c19541]/30 text-[#c19541] font-semibold text-xs tracking-wider uppercase">
                          {card.value}
                        </span>
                      </div>
                      <div className="text-[#d0d7de] text-xs sm:text-sm leading-normal sm:leading-relaxed font-light">
                        {card.description}
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#c19541] font-medium tracking-wide">
                      {card.footerIcon} {card.footer}
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-8 mt-4 px-4">
              <button
                onClick={() => scrollContainer(benefitsScrollRef, 'left')}
                className="w-10 h-10 rounded-full bg-[#16223a] border border-[#c19541]/40 text-[#c19541] hover:bg-[#c19541] hover:text-black flex items-center justify-center transition-all shadow-md cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollContainer(benefitsScrollRef, 'right')}
                className="w-10 h-10 rounded-full bg-[#16223a] border border-[#c19541]/40 text-[#c19541] hover:bg-[#c19541] hover:text-black flex items-center justify-center transition-all shadow-md cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop & Tablet Grid view for Benefits */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Benefit Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-b from-[#1b2d52] via-[#162545] to-[#111e38] backdrop-blur-xl border-t-[5px] border-t-[#c19541] border-x border-b border-[#c19541]/30 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(193,149,65,0.2)] hover:border-[#c19541]/60 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c19541]/25 via-[#c19541]/10 to-transparent border border-[#c19541]/50 flex items-center justify-center text-[#c19541] shadow-inner mb-6">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-['Inter'] font-bold text-[#f4f4f4] uppercase tracking-wide mb-2">10x Gate Entry & Member Area Access</h4>
                <div className="mb-4">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#c19541]/15 border border-[#c19541]/30 text-[#c19541] font-semibold text-xs tracking-wider uppercase">Valued at $880</span>
                </div>
                <p className="text-[#d0d7de] text-sm leading-relaxed font-light">
                  Member area access for every raceday at Ascot and Belmont Park Racecourses. Fully transferable - share with clients and staff.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#c19541] font-medium tracking-wide">
                <ShieldCheck className="w-4 h-4" /> Fully Transferable
              </div>
            </motion.div>

            {/* Benefit Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-b from-[#1b2d52] via-[#162545] to-[#111e38] backdrop-blur-xl border-t-[5px] border-t-[#c19541] border-x border-b border-[#c19541]/30 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(193,149,65,0.2)] hover:border-[#c19541]/60 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c19541]/25 via-[#c19541]/10 to-transparent border border-[#c19541]/50 flex items-center justify-center text-[#c19541] shadow-inner mb-6">
                  <Ticket className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-['Inter'] font-bold text-[#f4f4f4] uppercase tracking-wide mb-2">16x Member Privilege Passes</h4>
                <div className="mb-4">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#c19541]/15 border border-[#c19541]/30 text-[#c19541] font-semibold text-xs tracking-wider uppercase">Valued at $3,600</span>
                </div>
                <p className="text-[#d0d7de] text-sm leading-relaxed font-light">
                  Invite additional guests directly into the Member area on any standard raceday.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#c19541] font-medium tracking-wide">
                <Ticket className="w-4 h-4" /> Guest Access Included
              </div>
            </motion.div>

            {/* Benefit Card 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-b from-[#1b2d52] via-[#162545] to-[#111e38] backdrop-blur-xl border-t-[5px] border-t-[#c19541] border-x border-b border-[#c19541]/30 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(193,149,65,0.2)] hover:border-[#c19541]/60 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c19541]/25 via-[#c19541]/10 to-transparent border border-[#c19541]/50 flex items-center justify-center text-[#c19541] shadow-inner mb-6">
                  <Trophy className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-['Inter'] font-bold text-[#f4f4f4] uppercase tracking-wide mb-2">10x All-Inclusive Packages For Four Feature Racedays</h4>
                <div className="mb-4">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#c19541]/15 border border-[#c19541]/30 text-[#c19541] font-semibold text-xs tracking-wider uppercase">Valued at $11,600</span>
                </div>
                <p className="text-[#d0d7de] text-sm leading-relaxed font-light">
                  All-inclusive packages including all-day canapes and premium beverages on the four biggest racedays: Melbourne Cup Day · Railway Stakes Day · Perth Cup Day · Quokka Day
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#c19541] font-medium tracking-wide">
                <Trophy className="w-4 h-4" /> Premium Hospitality
              </div>
            </motion.div>

            {/* Benefit Card 4 */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-b from-[#1b2d52] via-[#162545] to-[#111e38] backdrop-blur-xl border-t-[5px] border-t-[#c19541] border-x border-b border-[#c19541]/30 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(193,149,65,0.2)] hover:border-[#c19541]/60 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c19541]/25 via-[#c19541]/10 to-transparent border border-[#c19541]/50 flex items-center justify-center text-[#c19541] shadow-inner mb-6">
                  <Car className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-['Inter'] font-bold text-[#f4f4f4] uppercase tracking-wide mb-2">10x Car Park Passes</h4>
                <div className="mb-4">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#c19541]/15 border border-[#c19541]/30 text-[#c19541] font-semibold text-xs tracking-wider uppercase">Valued at $1,000</span>
                </div>
                <p className="text-[#d0d7de] text-sm leading-relaxed font-light">
                  Convenient parking in the Member car park on any raceday at both Ascot and Belmont Park Racecourses throughout the year. Access to the designated convenient Member car park on all 80+ race days at Belmont and Ascot throughout the Season.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#c19541] font-medium tracking-wide">
                <Car className="w-4 h-4" /> Priority Parking
              </div>
            </motion.div>

            {/* Benefit Card 5 */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-b from-[#1b2d52] via-[#162545] to-[#111e38] backdrop-blur-xl border-t-[5px] border-t-[#c19541] border-x border-b border-[#c19541]/30 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(193,149,65,0.2)] hover:border-[#c19541]/60 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c19541]/25 via-[#c19541]/10 to-transparent border border-[#c19541]/50 flex items-center justify-center text-[#c19541] shadow-inner mb-6">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-['Inter'] font-bold text-[#f4f4f4] uppercase tracking-wide mb-2">Private Suite For The Day</h4>
                <div className="mb-4">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#c19541]/15 border border-[#c19541]/30 text-[#c19541] font-semibold text-xs tracking-wider uppercase">Valued at $2,200</span>
                </div>
                <p className="text-[#d0d7de] text-sm leading-relaxed font-light">
                  Premium hospitality facility for up to 10 guests (subject to availability) on any standard raceday, valid January - July.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#c19541] font-medium tracking-wide">
                <Building2 className="w-4 h-4" /> Exclusive Suite
              </div>
            </motion.div>

            {/* Benefit Card 6 */}
            <motion.div 
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="bg-gradient-to-b from-[#1b2d52] via-[#162545] to-[#111e38] backdrop-blur-xl border-t-[5px] border-t-[#c19541] border-x border-b border-[#c19541]/30 p-8 rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(193,149,65,0.2)] hover:border-[#c19541]/60 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#c19541]/25 via-[#c19541]/10 to-transparent border border-[#c19541]/50 flex items-center justify-center text-[#c19541] shadow-inner mb-6">
                  <Star className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-['Inter'] font-bold text-[#f4f4f4] uppercase tracking-wide mb-2">Additional Member Perks</h4>
                <div className="mb-4">
                  <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#c19541]/15 border border-[#c19541]/30 text-[#c19541] font-semibold text-xs tracking-wider uppercase">Exclusive Access</span>
                </div>
                <ul className="text-[#d0d7de] text-sm space-y-2 font-light">
                  <li>- Member discounts for all-inclusive events</li>
                  <li>- 2 x Invitations to corporate networking events</li>
                  <li>- Dedicated Perth Racing Account Manager</li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-[#c19541] font-medium tracking-wide">
                <Star className="w-4 h-4" /> VIP Concierge
              </div>
            </motion.div>

          </div>

          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 sm:mt-16 text-center px-4"
          >
            <p className="text-lg min-[380px]:text-xl md:text-2xl text-[#c19541] font-semibold tracking-wider font-['Prata']">
              Total Corporate Membership Value: $19,000 +
            </p>
            <p className="text-xs sm:text-sm text-[#d0d7de] mt-2 font-light">
              Deliver unparalleled ROI for corporate client entertainment and team engagement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2026-2027 Perth Racing Event Calendar Section */}
      <section id="calendar" className="scroll-mt-24 md:scroll-mt-28 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 px-0 md:px-12 lg:px-24 bg-white text-black overflow-hidden border-t border-neutral-200/80">
        <div className="max-w-6xl mx-auto px-0">
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 sm:mb-16 px-5 md:px-0"
          >
            <span className="text-[#a07425] text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold block mb-2 sm:mb-3">Season Schedule</span>
            <h3 className="text-2xl min-[380px]:text-[28px] sm:text-4xl md:text-5xl font-['Prata'] font-normal text-black uppercase tracking-[0.04em] sm:tracking-[0.05em] leading-tight">
              2026-2027 Event Calendar
            </h3>
            <p className="text-neutral-600 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base font-normal leading-normal sm:leading-relaxed">
              Your Corporate Membership grants access to every raceday of the year, highlighted by WA's premier spring, summer, and autumn racing carnivals.
            </p>
          </motion.div>

          {/* Mobile Horizontal Scrollable Carousel view for Calendar */}
          <div className="block md:hidden relative">
            <div 
              ref={calendarScrollRef}
              onScroll={() => handleInfiniteScroll(calendarScrollRef, calendarEvents.length)}
              onMouseDown={(e) => setDragStartX(e.clientX)}
              onMouseUp={(e) => {
                if (dragStartX === null) return;
                const deltaX = e.clientX - dragStartX;
                if (Math.abs(deltaX) > 25) {
                  scrollContainer(calendarScrollRef, deltaX > 0 ? 'left' : 'right');
                }
                setDragStartX(null);
              }}
              onMouseLeave={() => setDragStartX(null)}
              className="flex overflow-x-auto gap-4 px-0 pb-6 snap-x snap-mandatory scrollbar-none cursor-grab active:cursor-grabbing select-none"
            >
              {extendedCalendar.map((evt, idx) => {
                const originalIdx = idx % calendarEvents.length;
                return (
                  <div 
                    key={idx}
                    className="carousel-card w-[85%] sm:w-[380px] flex-shrink-0 snap-center bg-[#fffcf6] border border-neutral-200/90 hover:border-[#c19541] p-5 sm:p-8 rounded-xl relative flex flex-col justify-between min-h-[300px] sm:min-h-[320px] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                        <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#a07425] font-semibold tracking-wider uppercase">
                          <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {evt.date}
                        </div>
                        <span className="text-xs text-neutral-400 font-medium">{originalIdx + 1} / {calendarEvents.length}</span>
                      </div>
                      <h4 className="text-lg sm:text-xl font-['Inter'] font-bold text-neutral-900 uppercase tracking-wide mb-1.5 sm:mb-2">
                        {evt.name}
                      </h4>
                      <span className="inline-block px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#c19541]/15 text-[#9e7528] text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider mb-2.5 sm:mb-3">
                        {evt.category}
                      </span>
                      <p className="text-neutral-600 text-xs sm:text-sm font-normal leading-normal sm:leading-relaxed">
                        {evt.description}
                      </p>
                    </div>
                    <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-neutral-200/60 flex items-center justify-between text-[11px] sm:text-xs text-neutral-500">
                      <span>Member Access Included</span>
                      <span className="text-[#9e7528] font-semibold">VIP Raceday</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-8 mt-4 px-4">
              <button
                onClick={() => scrollContainer(calendarScrollRef, 'left')}
                className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 hover:bg-[#c19541] hover:text-black flex items-center justify-center transition-all shadow-sm cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollContainer(calendarScrollRef, 'right')}
                className="w-10 h-10 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-800 hover:bg-[#c19541] hover:text-black flex items-center justify-center transition-all shadow-sm cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Desktop & Tablet Grid view for Calendar */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {calendarEvents.map((evt, idx) => {
              const colIndex = idx % 3;
              const rowIndex = Math.floor(idx / 3);
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ 
                    duration: 0.9, 
                    delay: colIndex * 0.22 + rowIndex * 0.15, 
                    ease: [0.22, 1, 0.36, 1] 
                  }}
                  className="bg-[#fffcf6] border border-neutral-200/90 hover:border-[#c19541] p-6 rounded-xl relative transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#a07425] font-semibold tracking-wider uppercase mb-2">
                      <Calendar className="w-4 h-4" /> {evt.date}
                    </div>
                    <h4 className="text-xl font-['Inter'] font-bold text-neutral-900 uppercase tracking-wide mb-2 group-hover:text-[#a07425] transition-colors">
                      {evt.name}
                    </h4>
                    <span className="inline-block px-2.5 py-1 rounded bg-[#c19541]/15 text-[#9e7528] text-[11px] font-semibold uppercase tracking-wider mb-3">
                      {evt.category}
                    </span>
                    <p className="text-neutral-600 text-sm font-normal leading-relaxed">
                      {evt.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-500">
                    <span>Member Access Included</span>
                    <span className="text-[#9e7528] font-semibold">VIP Raceday</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Racecourse Venues Section */}
      <section id="venues" className="scroll-mt-24 md:scroll-mt-28 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-24 bg-[#16223a] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 sm:mb-16 px-2 sm:px-0"
          >
            <span className="text-[#c19541] text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium block mb-2 sm:mb-3">Home of WA Racing</span>
            <h3 className="text-2xl min-[380px]:text-[28px] sm:text-4xl md:text-5xl font-['Prata'] font-normal text-[#c19541] uppercase tracking-[0.04em] sm:tracking-[0.05em] leading-tight">
              Our Prestigious Racecourses
            </h3>
            <p className="text-[#d0d7de] max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base font-light leading-normal sm:leading-relaxed">
              Toggle between Perth Racing's iconic metropolitan venues to explore venue-specific corporate facilities and member privileges.
            </p>
          </motion.div>

          {/* Venue Toggle Tabs & Map Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 mb-8 sm:mb-10"
          >
            <div className="bg-[#20355e] p-1.5 rounded-xl border border-[#c19541]/30 flex gap-1.5 sm:gap-2 shadow-lg">
              <button
                onClick={() => setActiveVenue('ascot')}
                className={`px-4 min-[380px]:px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold tracking-normal transition-all ${
                  activeVenue === 'ascot' 
                    ? 'bg-[#c19541] text-black shadow-md' 
                    : 'text-[#d0d7de] hover:text-[#c19541]'
                }`}
              >
                Ascot Racecourse
              </button>
              <button
                onClick={() => setActiveVenue('belmont')}
                className={`px-4 min-[380px]:px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg text-xs sm:text-sm font-semibold tracking-normal transition-all ${
                  activeVenue === 'belmont' 
                    ? 'bg-[#c19541] text-black shadow-md' 
                    : 'text-[#d0d7de] hover:text-[#c19541]'
                }`}
              >
                Belmont Park Racecourse
              </button>
            </div>
          </motion.div>

          {/* Venue Content Card */}
          {(() => {
            const currentSuites = activeVenue === 'ascot' ? ascotSuites : belmontSuites;
            const currentIndex = activeVenue === 'ascot' ? activeSuiteIndex.ascot : activeSuiteIndex.belmont;
            const activeSuite = currentSuites[currentIndex];

            return (
              <motion.div 
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[#20355e] border border-[#c19541]/40 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2 items-stretch min-h-[560px]"
              >
                <div className="flex flex-col h-full">
                  <div className="relative flex-1 min-h-[320px] lg:min-h-0 w-full overflow-hidden bg-[#16223a]">
                    {!venueLoaded && (
                      <div className="absolute inset-0 bg-[#16223a] animate-pulse flex flex-col items-center justify-center p-8 space-y-4 z-10">
                        <div className="w-10 h-10 rounded-full bg-[#c19541]/20 border border-[#c19541]/40 flex items-center justify-center text-[#c19541]">
                          <img src="https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2026/09/PR_Loading_Icon.svg" alt="Loading" className="w-5 h-5 animate-spin" />
                        </div>
                        <div className="space-y-2 text-center w-full max-w-xs">
                          <div className="h-3.5 bg-white/10 rounded w-2/3 mx-auto" />
                          <div className="h-3 bg-white/5 rounded w-1/2 mx-auto" />
                        </div>
                      </div>
                    )}
                    <img 
                      src={activeSuite.image}
                      alt={activeSuite.title}
                      onLoad={() => setVenueLoaded(true)}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${venueLoaded ? 'opacity-100' : 'opacity-0'}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#20355e] via-transparent to-transparent lg:hidden" />
                    <div className="absolute top-4 left-4 bg-black/70 backdrop-blur px-4 py-2 rounded-full border border-[#c19541]/40 text-[#c19541] text-xs font-semibold uppercase tracking-widest flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5" /> {activeVenue === 'ascot' ? 'Ascot, WA' : 'Burswood, WA'}
                    </div>
                    <div className="absolute bottom-4 left-4 bg-[#20355e]/90 backdrop-blur px-3 py-1 rounded border border-[#c19541]/30 text-[#c19541] text-[11px] font-semibold uppercase tracking-wider">
                      {activeSuite.badge}
                    </div>
                  </div>

                  {/* Secondary Horizontal Thumbnail Gallery for Each Racecourse */}
                  <div className="p-4 bg-[#16223a] border-t border-white/10 shrink-0">
                    <p className="text-[11px] uppercase tracking-widest text-[#c19541] mb-2.5 font-medium">
                      Preview {activeVenue === 'ascot' ? 'Ascot' : 'Belmont Park'} Suites & Facilities:
                    </p>
                    <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin">
                      {currentSuites.map((suite, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (activeVenue === 'ascot') {
                              setActiveSuiteIndex(prev => ({ ...prev, ascot: idx }));
                            } else {
                              setActiveSuiteIndex(prev => ({ ...prev, belmont: idx }));
                            }
                          }}
                          className={`relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden border border-white/20 transition-all ${
                            idx === currentIndex ? 'scale-[1.02] shadow-lg z-10' : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={suite.image} alt={suite.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/60 flex items-end p-1">
                            <span className="text-[9px] text-white font-medium truncate leading-tight">{suite.badge}</span>
                          </div>
                          {idx === currentIndex && (
                            <div className="absolute inset-0 border-2 border-[#c19541] rounded-md pointer-events-none z-20 shadow-[0_0_10px_rgba(197,160,89,0.5)]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-between space-y-6 h-full min-h-[440px] sm:min-h-[480px] lg:min-h-[560px]">
                  <div>
                    <span className="text-[#c19541] text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-semibold block mb-2">
                      {activeSuite.badge} • {activeVenue === 'ascot' ? 'Ascot Racecourse' : 'Belmont Park Racecourse'}
                    </span>
                    <h4 className="text-xl sm:text-2xl md:text-3xl font-['Prata'] font-normal text-[#f4f4f4] uppercase tracking-wide mb-1.5 sm:mb-2">
                      {activeSuite.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#c19541] font-medium tracking-wider mb-3 sm:mb-4">
                      {activeSuite.subtitle}
                    </p>
                    <p className="text-[#d0d7de] font-light text-sm sm:text-base leading-normal sm:leading-relaxed mb-5 sm:mb-6">
                      {activeSuite.description}
                    </p>

                    <div className="space-y-2.5 sm:space-y-3 border-t border-white/10 pt-5 sm:pt-6">
                      <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#d0d7de]">
                        <Compass className="w-4 h-4 text-[#c19541] shrink-0 mt-0.5 sm:mt-0" />
                        <span><strong>Location:</strong> {activeVenue === 'ascot' ? 'Grandstand Rd, Ascot WA 6104' : 'Great Eastern Hwy, Burswood WA 6100'}</span>
                      </div>
                      <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-[#d0d7de]">
                        <Clock className="w-4 h-4 text-[#c19541] shrink-0 mt-0.5 sm:mt-0" />
                        <span><strong>Season Racedays:</strong> {activeVenue === 'ascot' ? 'October – April (Spring & Summer Carnivals)' : 'May – September (Winter Racing Series)'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4">
                    <a 
                      href="#contact" 
                      onClick={(e) => scrollToSection(e, '#contact')}
                      className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-[#e9bd12] hover:bg-[#d8ae0e] text-black font-semibold text-xs sm:text-sm tracking-normal px-5 sm:px-6 py-3.5 rounded-lg transition-all duration-300 shadow-md cursor-pointer text-center"
                    >
                      Enquire About Venue Hospitality <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* Join The Club / Contact & Form Section */}
      <section id="contact" className="scroll-mt-24 md:scroll-mt-28 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-24 bg-white text-black overflow-hidden border-t border-neutral-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4 sm:space-y-6"
          >
            <span className="text-[#a07425] text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-semibold block">Secure Your Place</span>
            <h3 className="text-2xl min-[380px]:text-[28px] sm:text-3xl md:text-4xl font-['Prata'] font-normal text-black uppercase tracking-[0.04em] sm:tracking-[0.05em] leading-tight">
              Join the Club
            </h3>
            <p className="text-neutral-600 text-sm sm:text-base leading-normal sm:leading-relaxed font-normal">
              Corporate Memberships are strictly limited to ensure an exclusive experience for our Members. To enquire and secure your place for the 2026-2027 season, please reach out directly or submit your details via the enquiry form.
            </p>
            
            <div className="space-y-5 sm:space-y-6 mt-6 sm:mt-8">
              <div>
                <h4 className="font-['Inter'] text-[24px] font-bold text-neutral-900 tracking-wide">Nick Ristovic</h4>
                <p className="text-[#a07425] font-semibold text-[11px] sm:text-xs tracking-wider uppercase mt-1">General Manager Marketing & Communications</p>
              </div>

              <div className="space-y-3 pt-4 border-t border-neutral-200/60 text-xs sm:text-sm text-neutral-700">
                <div className="flex items-center gap-3">
                  <div className="relative inline-flex items-center gap-2 group">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="text-neutral-900 hover:text-[#a07425] transition-colors font-medium flex items-center gap-2 text-left group/btn cursor-pointer"
                      title="Click to copy email address"
                      aria-label="Click to copy email address"
                    >
                      <span className="underline decoration-neutral-300 hover:decoration-[#a07425] underline-offset-4 text-xs sm:text-sm break-all sm:break-normal">
                        nristovic@perthracing.com.au
                      </span>
                      <span className="p-1 rounded bg-neutral-100 group-hover/btn:bg-[#c19541]/20 text-[#a07425] transition-colors shrink-0">
                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#a07425]" />}
                      </span>
                    </button>

                    {/* Tooltip */}
                    <div className={`absolute left-6 -top-9.5 z-20 pointer-events-none transition-all duration-200 ${copiedEmail ? 'opacity-100 translate-y-0' : 'opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0'}`}>
                      <div className="bg-neutral-900 border border-[#c19541]/60 text-white text-[11px] font-medium px-2.5 py-1 rounded shadow-xl whitespace-nowrap flex items-center gap-1.5">
                        {copiedEmail ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied to clipboard!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-[#c19541]" />
                            <span>Click to copy email</span>
                          </>
                        )}
                      </div>
                      <div className="w-2 h-2 bg-neutral-900 border-r border-b border-[#c19541]/60 rotate-45 mx-auto -mt-1" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span><a href="tel:0421242979" className="text-neutral-900 hover:text-[#a07425] transition-colors font-medium">0421 242 979</a></span>
                </div>
                <div className="flex items-center gap-3">
                  <span><a href="https://perthracing.com.au" target="_blank" rel="noopener noreferrer" className="text-neutral-900 hover:text-[#a07425] transition-colors font-medium">perthracing.com.au</a></span>
                </div>
              </div>


            </div>
          </motion.div>

          {/* Enquiry Form Wrapper (HubSpot Form Embed / Interactive Replacement) */}
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#fffcf6] border border-[#e8dcbe] p-6 sm:p-8 md:p-10 rounded-xl"
          >
            <div className="mb-5 sm:mb-6">
              <h4 className="text-xl sm:text-2xl font-['Inter'] font-bold text-neutral-900 uppercase tracking-wider">Corporate Enquiry</h4>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 font-normal leading-relaxed">Complete the form below and our Corporate Membership team will contact you within 24 hours.</p>
            </div>

            {formSubmitted ? (
              <div className="bg-[#c19541]/10 border border-[#c19541] p-6 sm:p-8 rounded-lg text-center space-y-4 my-6 sm:my-8">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-[#a07425] mx-auto animate-bounce" />
                <h5 className="text-lg sm:text-xl font-['Prata'] font-normal text-neutral-900 uppercase tracking-wider">Enquiry Received</h5>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
                  Thank you, <strong className="text-[#a07425]">{formData.firstName} {formData.lastName}</strong>. Nick Ristovic and the Perth Racing team have received your 2026-2027 Corporate Membership enquiry and will be in touch shortly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-[#a07425] uppercase tracking-widest underline hover:text-black cursor-pointer"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <motion.form 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onSubmit={handleFormSubmit} 
                className="space-y-4 sm:space-y-5"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-neutral-700 mb-1.5 sm:mb-2 font-semibold">First Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="e.g. Sarah"
                      className="w-full bg-white border border-neutral-300 rounded px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-neutral-900 focus:outline-none focus:border-[#c19541] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-neutral-700 mb-1.5 sm:mb-2 font-semibold">Last Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="e.g. Jenkins"
                      className="w-full bg-white border border-neutral-300 rounded px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-neutral-900 focus:outline-none focus:border-[#c19541] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-neutral-700 mb-1.5 sm:mb-2 font-semibold">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="s.jenkins@apex.com.au"
                    className="w-full bg-white border border-neutral-300 rounded px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-neutral-900 focus:outline-none focus:border-[#c19541] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-neutral-700 mb-1.5 sm:mb-2 font-semibold">Phone number *</label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="0400 000 000"
                    className="w-full bg-white border border-neutral-300 rounded px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-neutral-900 focus:outline-none focus:border-[#c19541] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs uppercase tracking-wider text-neutral-700 mb-1.5 sm:mb-2 font-semibold">Message or Specific Requirements</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your corporate entertainment or team reward needs..."
                    className="w-full bg-white border border-neutral-300 rounded px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm text-neutral-900 focus:outline-none focus:border-[#c19541] transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#c19541] hover:bg-[#b08436] text-black font-semibold text-xs sm:text-sm tracking-normal py-3.5 sm:py-4 rounded-lg transition-all duration-300 shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>


              </motion.form>
            )}
          </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section id="faq" className="scroll-mt-24 md:scroll-mt-28 pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-8 md:px-12 lg:px-24 bg-[#16223a] overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 sm:mb-16 px-2 sm:px-0"
          >
            <span className="text-[#c19541] text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] font-medium block mb-2 sm:mb-3">Member Support</span>
            <h3 className="text-2xl min-[380px]:text-[28px] sm:text-4xl md:text-5xl font-['Prata'] font-normal text-[#c19541] uppercase tracking-[0.04em] sm:tracking-[0.05em] leading-tight">
              Frequently Asked Questions
            </h3>
            <p className="text-[#d0d7de] max-w-xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base font-light leading-normal sm:leading-relaxed">
              Everything you need to know about corporate membership entitlements, transferability, parking, and dress regulations.
            </p>
          </motion.div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.85, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="bg-[#20355e] border border-[#c19541]/30 rounded-xl overflow-hidden transition-all duration-300 shadow-md"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 focus:outline-none group cursor-pointer"
                  >
                    <span className="text-sm min-[380px]:text-base sm:text-lg font-['Prata'] font-normal text-[#f4f4f4] group-hover:text-[#c19541] transition-colors leading-snug">
                      {faq.question}
                    </span>
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#c19541]/10 border border-[#c19541]/30 flex items-center justify-center text-[#c19541] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#c19541] text-black' : ''}`}>
                      <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0 text-[#d0d7de] text-xs sm:text-sm font-light leading-normal sm:leading-relaxed border-t border-white/5 mt-1 sm:mt-2 pt-3 sm:pt-4">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Refined Footer */}
      <footer className="bg-[#092448] border-t border-[#c19541]/25 pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-12 px-5 sm:px-8 lg:px-16 text-[#aaaaaa] overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Main Footer Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Brand & Club Mission */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.9, delay: 0.0, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-4 space-y-5"
            >
              <div className="flex items-center gap-3.5">
                <img 
                  src="https://s3.ap-southeast-2.amazonaws.com/assets.perthracing.com.au/app/uploads/2026/09/PerthRacing_Logo.svg" 
                  alt="Perth Racing Logo" 
                  className="h-10 w-auto object-contain filter brightness-125"
                />
                <div className="border-l border-white/20 pl-3">
                  <span className="font-bold tracking-[0.18em] text-xs uppercase block text-[#f4f4f4]">Perth Racing</span>
                  <span className="text-[10px] text-[#c19541] tracking-widest uppercase font-medium">Corporate Membership</span>
                </div>
              </div>

              <p className="text-sm text-[#8c9ba5] leading-relaxed font-light">
                Western Australia's premier thoroughbred racing club, delivering world-class sport, executive networking, and distinguished hospitality across Ascot and Belmont Park.
              </p>

              <div className="pt-2 flex flex-wrap gap-2.5">
                <a 
                  href="tel:0421242979" 
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16223a] border border-[#c19541]/30 text-xs text-[#c19541] hover:text-white hover:border-[#c19541] transition-all"
                >
                  <Phone className="w-3.5 h-3.5" /> 0421 242 979
                </a>
                <a 
                  href="mailto:nristovic@perthracing.com.au" 
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#16223a] border border-[#c19541]/30 text-xs text-[#c19541] hover:text-white hover:border-[#c19541] transition-all"
                >
                  <Mail className="w-3.5 h-3.5" /> Direct Email
                </a>
              </div>
            </motion.div>

            {/* Quick Navigation Links */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 space-y-4"
            >
              <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c19541]">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <a href="#overview" onClick={(e) => scrollToSection(e, '#overview')} className="hover:text-[#c19541] transition-colors inline-flex items-center gap-1.5 cursor-pointer">
                    <span className="w-1 h-1 rounded-full bg-[#c19541]/60" /> Overview
                  </a>
                </li>
                <li>
                  <a href="#benefits" onClick={(e) => scrollToSection(e, '#benefits')} className="hover:text-[#c19541] transition-colors inline-flex items-center gap-1.5 cursor-pointer">
                    <span className="w-1 h-1 rounded-full bg-[#c19541]/60" /> Exclusive Entitlements
                  </a>
                </li>
                <li>
                  <a href="#calendar" onClick={(e) => scrollToSection(e, '#calendar')} className="hover:text-[#c19541] transition-colors inline-flex items-center gap-1.5 cursor-pointer">
                    <span className="w-1 h-1 rounded-full bg-[#c19541]/60" /> 2026–2027 Calendar
                  </a>
                </li>
                <li>
                  <a href="#venues" onClick={(e) => scrollToSection(e, '#venues')} className="hover:text-[#c19541] transition-colors inline-flex items-center gap-1.5 cursor-pointer">
                    <span className="w-1 h-1 rounded-full bg-[#c19541]/60" /> Ascot & Belmont Park
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => scrollToSection(e, '#faq')} className="hover:text-[#c19541] transition-colors inline-flex items-center gap-1.5 cursor-pointer">
                    <span className="w-1 h-1 rounded-full bg-[#c19541]/60" /> Membership FAQ
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* Racecourse Venues */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.9, delay: 0.30, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-3 space-y-4"
            >
              <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c19541]">
                Our Racecourses
              </h4>
              <div className="space-y-4 text-xs">
                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="font-semibold text-[#f4f4f4] tracking-wider uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c19541]" /> Ascot Racecourse
                  </p>
                  <p className="text-[#8c9ba5] font-light leading-relaxed">
                    Grandstand Road, Ascot WA 6104
                  </p>
                  <p className="text-[11px] text-[#c19541]/80 font-mono pt-0.5">Spring & Summer Racing Season</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                  <p className="font-semibold text-[#f4f4f4] tracking-wider uppercase flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#c19541]" /> Belmont Park Racecourse
                  </p>
                  <p className="text-[#8c9ba5] font-light leading-relaxed">
                    Victoria Park Drive, Burswood WA 6100
                  </p>
                  <p className="text-[11px] text-[#c19541]/80 font-mono pt-0.5">Winter Racing Season</p>
                </div>
              </div>
            </motion.div>

            {/* Direct Commercial Team */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2 space-y-4"
            >
              <h4 className="text-xs uppercase tracking-[0.25em] font-semibold text-[#c19541]">
                Commercial
              </h4>
              <div className="space-y-2 text-xs">
                <div>
                  <p className="text-[#f4f4f4] font-medium">Nick Ristovic</p>
                  <p className="text-[11px] text-[#8c9ba5]">GM Commercial & Partnerships</p>
                </div>
                <div className="pt-2">
                  <button
                    onClick={() => setShowPrintModal(true)}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#16223a] hover:bg-[#20355e] border border-[#c19541]/40 text-[#c19541] text-xs font-medium uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Summary
                  </button>
                </div>
                <div className="pt-1">
                  <a
                    href="#contact"
                    onClick={(e) => scrollToSection(e, '#contact')}
                    className="w-full py-2.5 px-3 rounded-lg bg-[#c19541] hover:bg-[#b08c48] text-black text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    Enquire Now <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom Divider & Legal Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
          >
            <p className="text-[#7e8b95]">
              © 2026 Perth Racing. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-[#8c9ba5]">
              <a 
                href="https://perthracing.com.au" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#c19541] transition-colors inline-flex items-center gap-1"
              >
                perthracing.com.au
              </a>
              <a 
                href="mailto:nristovic@perthracing.com.au" 
                className="hover:text-[#c19541] transition-colors"
              >
                Contact
              </a>
              <button 
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-[#c19541] transition-colors cursor-pointer bg-transparent border-none p-0 text-inherit font-inherit"
              >
                Privacy Policy
              </button>
            </div>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-1.5 text-xs text-[#c19541] hover:text-white transition-colors cursor-pointer group"
              aria-label="Back to top of page"
            >
              <span>Back to top</span>
              <div className="w-6 h-6 rounded-full bg-[#16223a] border border-[#c19541]/30 flex items-center justify-center group-hover:border-[#c19541] group-hover:-translate-y-0.5 transition-all">
                <ArrowUp className="w-3 h-3" />
              </div>
            </button>
          </motion.div>
        </div>
      </footer>
      </main>

      {/* Print-Friendly Simplified Membership Benefits Modal */}
      <PrintMembershipModal 
        isOpen={showPrintModal} 
        onClose={() => setShowPrintModal(false)} 
      />

      {/* Privacy Policy Modal */}
      <PrivacyPolicyModal 
        isOpen={showPrivacyModal} 
        onClose={() => setShowPrivacyModal(false)} 
      />

    </div>
  );
}
