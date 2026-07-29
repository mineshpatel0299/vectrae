export type OSMeta = { label: string; value: string };

export type OSFile = {
  id: string;
  icon: string;
  title: string;
  tag?: string;
  summary: string;
  body: string;
  meta?: OSMeta[];
  action?: { label: string; href: string };
  toggleDefault?: boolean;
};

export type OSFolder = {
  id: string;
  label: string;
  icon: string;
  accent: string;
  files: OSFile[];
};

// Mirrors the homepage content brief (abt.md) — one folder per homepage
// section, one subfolder per content block within that section.
export const desktopFolders: OSFolder[] = [
  {
    id: "hero",
    label: "Hero",
    icon: "sparkles",
    accent: "#29B9F2",
    files: [
      {
        id: "primary-headline",
        icon: "layoutGrid",
        title: "Primary Headline (H1)",
        tag: "Recommended",
        summary: "Integrated Technology Solutions for the Modern Enterprise",
        body: "The primary H1 headline for the hero section, with two alternates on file for A/B testing.",
        meta: [
          { label: "Alternate A", value: "One Trusted Technology Partner for 2,300+ Enterprises Across India" },
          { label: "Alternate B", value: "Comprehensive Technology Solutions — From AV to Data Centers to Power" },
        ],
      },
      {
        id: "sub-headline",
        icon: "fileText",
        title: "Sub-headline",
        tag: "Hero Copy",
        summary: "From AV and Networking to Data Centers and Power — Vectrae delivers end-to-end enterprise technology across PAN-India.",
        body: "Sits directly beneath the primary headline in the hero section.",
      },
      {
        id: "trust-line-ctas",
        icon: "shieldCheck",
        title: "Trust Line & CTAs",
        tag: "Conversion Copy",
        summary: "Trusted by 2,300+ enterprises | 250+ Technology Experts | PAN-India Delivery.",
        body: "Displayed directly below the hero CTA buttons.",
        meta: [
          { label: "Primary CTA", value: "Request a Free Consultation" },
          { label: "Secondary CTA", value: "Explore Our Solutions" },
        ],
      },
      {
        id: "top-bar-contact",
        icon: "mail",
        title: "Top Bar Contact",
        tag: "Header",
        summary: "enquiry@vectrae.com",
        body: "Displayed in the top utility bar above the main navigation.",
        action: { label: "Email Us", href: "mailto:enquiry@vectrae.com" },
      },
      {
        id: "certifications-badges",
        icon: "stickyNote",
        title: "Certifications / Badges",
        tag: "Needs Client Input",
        summary: "Awaiting badge assets from the client team.",
        body: "Team will share a Drive link with certification and award badge graphics once available.",
      },
    ],
  },
  {
    id: "trust-signals",
    label: "Trust Signals",
    icon: "handshake",
    accent: "#25D9C7",
    files: [
      {
        id: "client-logos",
        icon: "briefcase",
        title: "Client Logos",
        tag: "49 Enterprises",
        summary:
          "Wipro, HCL, TCS, Accenture, HDFC Bank, JP Morgan, EY, Deloitte, KPMG, PwC, McKinsey, Maruti Suzuki, Zomato, Adobe, Airtel, Thales, American Express, Ford, MakeMyTrip, Schneider Electric — plus additional names from the full 49-client list.",
        body: "Displayed as a scrolling logo carousel directly beneath the hero section.",
        meta: [
          { label: "Format", value: "Carousel" },
          { label: "Total Clients", value: "49" },
        ],
      },
      {
        id: "priority-oem-partners",
        icon: "shieldCheck",
        title: "Priority OEM Partners",
        tag: "Homepage Strip",
        summary: "Cisco, Microsoft, Lenovo, Dell, HP, Crestron, Palo Alto Networks, APC by Schneider Electric, Fortinet, Samsung, Bosch, Harman, QSC.",
        body: "The 13 partner names to feature most prominently in the homepage OEM strip.",
      },
      {
        id: "av-collaboration-partners",
        icon: "network",
        title: "AV & Collaboration",
        tag: "22 Partners",
        summary: "Crestron, Extron, Kramer, Key Digital, Aurora, ATEN, Lightware, AMX by Harman, Atlona, Altafron, Biamp, QSC, Harman, Prysm, Bosch, Sennheiser, Audio-Technica, Poly, Jabra, Yealink, Huddly, Epson.",
        body: "Full category list, per Blueprint §7.2.",
      },
      {
        id: "networking-security-partners",
        icon: "shieldCheck",
        title: "Networking & Security",
        tag: "7 Partners",
        summary: "Cisco, Palo Alto Networks, Fortinet, Sophos, McAfee, D-Link, CommScope.",
        body: "Full category list, per Blueprint §7.2.",
      },
      {
        id: "compute-power-partners",
        icon: "server",
        title: "End Computing & Power",
        tag: "14 Partners",
        summary: "Lenovo, Dell, HP, Acer, Microsoft, Samsung, LG, Sony, Philips, Logitech, 3M, Kensington, Targus, APC by Schneider Electric, Schneider Electric.",
        body: "Full category list, per Blueprint §7.2.",
      },
      {
        id: "logo-assets-needed",
        icon: "stickyNote",
        title: "Logo Assets Needed",
        tag: "Action Required",
        summary: "High-resolution, transparent-background logos are still needed for all 43 partners.",
        body: "The Blueprint provides names only — awaiting final logo files from the client team.",
      },
    ],
  },
  {
    id: "about",
    label: "About Us",
    icon: "info",
    accent: "#84D96C",
    files: [
      {
        id: "homepage-teaser",
        icon: "fileText",
        title: "Homepage Teaser",
        tag: "Section Copy",
        summary:
          "Vectrae Infotech is a full-spectrum enterprise technology solutions provider, delivering Audio Visual, IT Infrastructure, Networking & Security, Data Center, End Computing, and Power solutions to enterprises across India.",
        body: "With 250+ technology experts, 43 OEM and technology partnerships, and a PAN-India delivery footprint, Vectrae has supported 2,300+ enterprise clients from initial consultation through to long-term managed support. Our mission is to simplify technology decisions for enterprises — delivering the right solutions, the right partners, and the right outcomes, every time.",
      },
      {
        id: "key-statistics",
        icon: "database",
        title: "Key Statistics",
        tag: "Number Counters",
        summary: "2,300+ Enterprise Clients · 250+ Technology Experts · 43 OEM & Technology Partners · 25+ Years of Enterprise Experience.",
        body: "Animated number counters displayed in the About Us section.",
        meta: [
          { label: "Enterprise Clients", value: "2,300+" },
          { label: "Technology Experts", value: "250+" },
          { label: "OEM & Tech Partners", value: "43" },
          { label: "Years Experience", value: "25+" },
        ],
      },
    ],
  },
  {
    id: "why-choose-us",
    label: "Why Choose Us",
    icon: "gem",
    accent: "#B6D93B",
    files: [
      {
        id: "single-window-partner",
        icon: "layoutGrid",
        title: "Single-Window Technology Partner",
        summary: "AV, IT, Networking, DC, Power under one roof.",
        body: "One of five headline cards in the Why Choose Us section.",
      },
      {
        id: "pre-sales-post-sales",
        icon: "userCog",
        title: "Pre-Sales to Post-Sales",
        summary: "End-to-end support from needs assessment to AMC.",
        body: "One of five headline cards in the Why Choose Us section.",
      },
      {
        id: "oem-partnerships",
        icon: "handshake",
        title: "43 OEM Partnerships",
        summary: "Best-in-class technology from the world's leading brands.",
        body: "One of five headline cards in the Why Choose Us section.",
      },
      {
        id: "pan-india-delivery",
        icon: "globe2",
        title: "PAN-India Delivery",
        summary: "Nationwide project execution and service support network.",
        body: "One of five headline cards in the Why Choose Us section.",
      },
      {
        id: "enterprise-grade-expertise",
        icon: "users",
        title: "Enterprise-Grade Expertise",
        summary: "250+ certified professionals across all verticals.",
        body: "One of five headline cards in the Why Choose Us section.",
      },
    ],
  },
  {
    id: "solutions-services",
    label: "Solutions & Services",
    icon: "network",
    accent: "#29B9F2",
    files: [
      {
        id: "audio-visual-solutions",
        icon: "monitorPlay",
        title: "Audio Visual Solutions",
        summary: "End-to-end AV for meeting rooms, boardrooms, auditoriums & command centres.",
        body: "Homepage service card, per Blueprint spec.",
      },
      {
        id: "networking-security",
        icon: "network",
        title: "Networking & Security",
        summary: "Enterprise networking, wireless infrastructure, firewall & secure connectivity.",
        body: "Homepage service card, per Blueprint spec.",
      },
      {
        id: "data-center-solutions",
        icon: "server",
        title: "Data Center Solutions",
        summary: "Greenfield/brownfield DC infrastructure, servers, cloud & disaster recovery.",
        body: "Homepage service card, per Blueprint spec.",
      },
      {
        id: "end-computing-solutions",
        icon: "laptop",
        title: "End Computing Solutions",
        summary: "Laptops, workstations, thin clients, monitors & enterprise peripherals.",
        body: "Homepage service card, per Blueprint spec.",
      },
      {
        id: "it-spares-accessories",
        icon: "packageCheck",
        title: "IT Spares & Accessories",
        summary: "Fast-delivery enterprise IT components, accessories & spare parts.",
        body: "Homepage service card, per Blueprint spec.",
      },
      {
        id: "power-solutions",
        icon: "zap",
        title: "Power Solutions",
        summary: "UPS, power backup, distribution & critical infrastructure power management.",
        body: "Homepage service card, per Blueprint spec.",
      },
      {
        id: "managed-it-services",
        icon: "headset",
        title: "Managed IT Services",
        summary: "Proactive AMC, remote monitoring, helpdesk & full managed IT support.",
        body: "Homepage service card, per Blueprint spec.",
      },
    ],
  },
  {
    id: "core-values",
    label: "Core Values",
    icon: "gem",
    accent: "#25D9C7",
    files: [
      {
        id: "integrity",
        icon: "shieldCheck",
        title: "Integrity",
        tag: "Core Value",
        summary: "Integrity",
        body: "One of five principles guiding every Vectrae engagement.",
      },
      {
        id: "excellence",
        icon: "gem",
        title: "Excellence",
        tag: "Core Value",
        summary: "Excellence",
        body: "One of five principles guiding every Vectrae engagement.",
      },
      {
        id: "partnership",
        icon: "handshake",
        title: "Partnership",
        tag: "Core Value",
        summary: "Partnership",
        body: "One of five principles guiding every Vectrae engagement.",
      },
      {
        id: "innovation",
        icon: "sparkles",
        title: "Innovation",
        tag: "Core Value",
        summary: "Innovation",
        body: "One of five principles guiding every Vectrae engagement.",
      },
      {
        id: "accountability",
        icon: "userCog",
        title: "Accountability",
        tag: "Core Value",
        summary: "Accountability",
        body: "One of five principles guiding every Vectrae engagement.",
      },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    icon: "newspaper",
    accent: "#84D96C",
    files: [
      {
        id: "av-tech-2026",
        icon: "monitorPlay",
        title: "Top 10 AV Technologies for Enterprise Meeting Rooms in 2026",
        tag: "Audio Visual",
        summary: "A rundown of the AV upgrades enterprises are prioritizing this year.",
        body: "Covers everything from AI-framing cameras to acoustic fencing for open-plan boardrooms.",
        meta: [
          { label: "Published", value: "March 12, 2026" },
          { label: "Read Time", value: "6 min" },
        ],
        action: { label: "Read Article", href: "/blog/av-tech-2026" },
      },
      {
        id: "managed-it",
        icon: "headset",
        title: "Why Every Enterprise Needs a Managed IT Services Provider",
        tag: "Managed Services",
        summary: "The case for proactive AMC and remote monitoring over reactive break-fix support.",
        body: "Explores the hidden cost of downtime and how a managed helpdesk shifts IT from reactive to proactive.",
        meta: [
          { label: "Published", value: "March 08, 2026" },
          { label: "Read Time", value: "5 min" },
        ],
        action: { label: "Read Article", href: "/blog/managed-it" },
      },
      {
        id: "teams-vs-zoom",
        icon: "network",
        title: "Microsoft Teams Rooms vs Zoom Rooms — Which Is Right for Your Enterprise?",
        tag: "Collaboration",
        summary: "A side-by-side comparison for enterprises standardizing their meeting room platform.",
        body: "Weighs licensing, hardware compatibility, and admin overhead across both platforms.",
        meta: [
          { label: "Published", value: "March 02, 2026" },
          { label: "Read Time", value: "8 min" },
        ],
        action: { label: "Read Article", href: "/blog/teams-vs-zoom" },
      },
      {
        id: "choose-ups",
        icon: "zap",
        title: "How to Choose the Right UPS for Your Data Center",
        tag: "Power Solutions",
        summary: "A buyer's guide to sizing and specifying UPS systems for critical infrastructure.",
        body: "Covers load calculation, runtime planning, and the tradeoffs between line-interactive and online UPS.",
        meta: [
          { label: "Published", value: "February 25, 2026" },
          { label: "Read Time", value: "7 min" },
        ],
        action: { label: "Read Article", href: "/blog/choose-ups" },
      },
      {
        id: "network-security",
        icon: "shieldCheck",
        title: "5 Signs Your Enterprise Network Needs a Security Overhaul",
        tag: "Networking & Security",
        summary: "Warning signs that your current network architecture is due for a zero-trust review.",
        body: "From flat VLANs to unmanaged BYOD access — the red flags our security engineers see most often.",
        meta: [
          { label: "Published", value: "February 18, 2026" },
          { label: "Read Time", value: "5 min" },
        ],
        action: { label: "Read Article", href: "/blog/network-security" },
      },
      {
        id: "dc-decision",
        icon: "database",
        title: "Greenfield vs Brownfield Data Center — Decision Guide",
        tag: "Data Center",
        summary: "A framework for deciding between a new build and modernizing an existing facility.",
        body: "Compares total cost of ownership, timeline, and risk between the two approaches.",
        meta: [
          { label: "Published", value: "February 10, 2026" },
          { label: "Read Time", value: "9 min" },
        ],
        action: { label: "Read Article", href: "/blog/dc-decision" },
      },
    ],
  },
  {
    id: "footprint",
    label: "Footprint",
    icon: "globe2",
    accent: "#B6D93B",
    files: [
      {
        id: "pan-india-coverage",
        icon: "mapPin",
        title: "PAN-India Coverage",
        tag: "Coverage Map",
        summary: "PAN-India service and delivery footprint.",
        body: "Active delivery and support hubs across major metro regions, shown as an interactive map on the homepage.",
        meta: [
          { label: "Delhi NCR", value: "Active" },
          { label: "Mumbai", value: "Active" },
          { label: "Bangalore", value: "Active" },
          { label: "Hyderabad", value: "Active" },
          { label: "Chennai", value: "Active" },
          { label: "Pune", value: "Active" },
          { label: "Kolkata", value: "Active" },
          { label: "Ahmedabad", value: "Active" },
        ],
        action: { label: "View Coverage Map", href: "/#footprint" },
      },
    ],
  },
  {
    id: "contact-footer",
    label: "Contact & Footer",
    icon: "phone",
    accent: "#29B9F2",
    files: [
      {
        id: "company-info",
        icon: "briefcase",
        title: "Company Info",
        tag: "Footer",
        summary: "Vectrae Infotech Pvt. Ltd.",
        body: "A-16/B-1 Extension, Mohan Co-Op, Industrial Estate, New Delhi - 110044, India",
        meta: [
          { label: "Email", value: "enquiry@vectrae.com" },
          { label: "Phone", value: "+91-11-40590964" },
        ],
        action: { label: "Call Us", href: "tel:+911140590964" },
      },
      {
        id: "social-links",
        icon: "send",
        title: "Social Links",
        tag: "Footer",
        summary: "LinkedIn · Instagram · Facebook",
        body: "Official social channels linked in the footer.",
        meta: [
          { label: "LinkedIn", value: "linkedin.com/company/vectraeinfotechpvtltd." },
          { label: "Instagram", value: "instagram.com/vectraeinfotech" },
          { label: "Facebook", value: "facebook.com/vectraee" },
        ],
        action: { label: "Visit LinkedIn", href: "https://www.linkedin.com/company/vectraeinfotechpvtltd./" },
      },
      {
        id: "legal-links",
        icon: "stickyNote",
        title: "Legal Links",
        tag: "Needs Content",
        summary: "Privacy Policy and Terms of Use still need to be drafted.",
        body: "Corporate Governance page is live. Privacy Policy and Terms of Use are flagged as pending in the Blueprint.",
        meta: [
          { label: "Privacy Policy", value: "Please create" },
          { label: "Terms of Use", value: "Please create" },
          { label: "Corporate Governance", value: "Live" },
        ],
        action: { label: "View Corporate Governance", href: "https://vectrae.com/corporate-governance/" },
      },
      {
        id: "support-promise",
        icon: "headset",
        title: "Support Promise",
        tag: "Footer Element",
        summary: "We respond within 4 business hours.",
        body: "A floating WhatsApp Quick Connect button is fixed bottom-right on all pages. Footer layout uses 4 columns: Company info + social links | Solutions | Industries | Quick Links. A slim OEM partner logo strip sits directly above the footer. Newsletter signup is optional.",
        action: { label: "Chat on WhatsApp", href: "https://wa.me/911140590964" },
      },
    ],
  },
];
