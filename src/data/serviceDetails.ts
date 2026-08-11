import {
  Boxes,
  Cable,
  Cloud,
  HardDrive,
  Laptop,
  LayoutGrid,
  MonitorCog,
  MonitorPlay,
  Network,
  PackageCheck,
  RadioTower,
  Server,
  Settings2,
  ShieldCheck,
  Truck,
  Users,
  Video,
  Wifi,
  type LucideIcon,
} from "lucide-react";

export type ServiceCapability = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type ServiceDetail = {
  slug: string;
  title: string;
  tagline: string;
  icon: LucideIcon;
  heroImage: string;
  description: string;
  capabilities: ServiceCapability[];
  benefits: string[];
};

export const serviceDetails: ServiceDetail[] = [
  {
    slug: "boardroom-av",
    title: "Boardroom & AV Solutions",
    tagline: "Immersive meeting experiences, engineered for the enterprise.",
    icon: MonitorPlay,
    heroImage: "/images/blog/av-tech.png",
    description:
      "From huddle rooms to command centres, we design and deploy audio-visual systems that make every meeting effortless — video conferencing, digital signage, and unified communications, integrated and supported end-to-end.",
    capabilities: [
      {
        icon: Video,
        title: "Video Conferencing Systems",
        description: "Zoom, Microsoft Teams & Cisco-certified room deployments for seamless hybrid meetings.",
      },
      {
        icon: LayoutGrid,
        title: "Digital Signage & Displays",
        description: "Large-format displays, video walls, and interactive panels for boardrooms and lobbies.",
      },
      {
        icon: Settings2,
        title: "Room Automation & Control",
        description: "Centralized scheduling, lighting, and AV control panels for one-touch meetings.",
      },
      {
        icon: RadioTower,
        title: "Auditorium & Command Centre AV",
        description: "Large-venue sound reinforcement, projection, and multi-screen command wall design.",
      },
      {
        icon: MonitorCog,
        title: "Acoustic & Room Design",
        description: "Acoustic treatment and room engineering for clear, distraction-free audio.",
      },
      {
        icon: Users,
        title: "Unified Communications",
        description: "Enterprise-wide UC integration connecting every room to your collaboration platform.",
      },
    ],
    benefits: [
      "Certified Crestron, Cisco & Microsoft integration partners",
      "Single point of accountability from design to AMC",
      "PAN-India installation with local support coverage",
      "Minimal-disruption deployment for live offices",
    ],
  },
  {
    slug: "networking-wifi",
    title: "Networking & Wi-Fi Solutions",
    tagline: "Resilient connectivity for the always-on enterprise.",
    icon: Network,
    heroImage: "/images/products/router.png",
    description:
      "We design, deploy, and secure the network backbone your business runs on — structured cabling, enterprise Wi-Fi, and firewall infrastructure built for performance at scale.",
    capabilities: [
      {
        icon: Cable,
        title: "Structured Cabling",
        description: "Certified fiber & copper cabling infrastructure for new and retrofit sites.",
      },
      {
        icon: Wifi,
        title: "Enterprise Wi-Fi",
        description: "Wireless site surveys and high-density Wi-Fi design for seamless coverage.",
      },
      {
        icon: Network,
        title: "LAN/WAN Architecture",
        description: "Resilient network design connecting offices, data centers, and branches.",
      },
      {
        icon: ShieldCheck,
        title: "Firewall & Network Security",
        description: "Palo Alto Networks-certified perimeter and internal network protection.",
      },
      {
        icon: Cloud,
        title: "SD-WAN & Cloud Connectivity",
        description: "Optimized multi-site connectivity for hybrid and cloud-first enterprises.",
      },
      {
        icon: Settings2,
        title: "Network Monitoring",
        description: "Proactive performance monitoring and bandwidth optimization.",
      },
    ],
    benefits: [
      "Cisco & Palo Alto Networks certified engineers",
      "Optional 24/7 network operations centre (NOC) monitoring",
      "Scalable architecture for multi-site enterprises",
      "Rapid fault response with PAN-India field support",
    ],
  },
  {
    slug: "data-center-security",
    title: "Data Center & Security Solutions",
    tagline: "Infrastructure built for uptime, scale, and resilience.",
    icon: Server,
    heroImage: "/images/products/server-ram.png",
    description:
      "We build and secure the infrastructure behind your business — from greenfield data centers to disaster recovery and physical security, engineered for enterprise-grade reliability.",
    capabilities: [
      {
        icon: HardDrive,
        title: "Data Center Build-Out",
        description: "Greenfield and brownfield DC infrastructure, from racks to cooling.",
      },
      {
        icon: Server,
        title: "Server & Storage Deployment",
        description: "Dell & HP enterprise server and storage rollouts, sized to your workload.",
      },
      {
        icon: Cloud,
        title: "Disaster Recovery & Backup",
        description: "Business continuity planning with tested backup and DR architecture.",
      },
      {
        icon: ShieldCheck,
        title: "Physical & Cyber Security",
        description: "Access control, surveillance, and network security hardening for your DC.",
      },
      {
        icon: Boxes,
        title: "Hyperconverged Infrastructure",
        description: "Simplified, scalable HCI deployments for modern workloads.",
      },
      {
        icon: Settings2,
        title: "Cloud Migration",
        description: "Guided migration paths from on-prem to hybrid and cloud environments.",
      },
    ],
    benefits: [
      "Dell & HP certified infrastructure partners",
      "24/7 monitored uptime and proactive alerting",
      "Compliance-ready security and access control",
      "Disaster recovery planning built into every deployment",
    ],
  },
  {
    slug: "end-computing",
    title: "End-Computing Solutions",
    tagline: "Equip every desk, every workstation, every employee.",
    icon: Laptop,
    heroImage: "/images/products/laptop.png",
    description:
      "From laptops to thin clients, we procure, configure, and manage the devices your workforce uses every day — with lifecycle support that keeps IT overhead low.",
    capabilities: [
      {
        icon: Laptop,
        title: "Laptops & Desktops",
        description: "Bulk procurement of Dell, HP & Microsoft devices at enterprise pricing.",
      },
      {
        icon: MonitorCog,
        title: "Thin Client Deployment",
        description: "Centralized, secure thin-client environments for cost-efficient computing.",
      },
      {
        icon: LayoutGrid,
        title: "Monitors & Peripherals",
        description: "Standardized workstation rollouts across offices and branches.",
      },
      {
        icon: Settings2,
        title: "Bulk Imaging & Configuration",
        description: "Pre-configured, ready-to-deploy devices out of the box.",
      },
      {
        icon: Boxes,
        title: "Asset Lifecycle Management",
        description: "Tracking, refresh cycles, and end-of-life disposal, managed for you.",
      },
      {
        icon: Users,
        title: "Warranty & AMC Support",
        description: "Doorstep support and annual maintenance contracts, PAN-India.",
      },
    ],
    benefits: [
      "Direct partnerships with Dell, HP & Microsoft",
      "Volume pricing for large enterprise rollouts",
      "PAN-India delivery and doorstep support",
      "Full asset lifecycle tracking and reporting",
    ],
  },
  {
    slug: "it-spares",
    title: "IT Spare & Accessories",
    tagline: "Fast-turnaround components that keep your infrastructure running.",
    icon: PackageCheck,
    heroImage: "/images/products/motherboard.png",
    description:
      "When hardware fails, downtime isn't an option. We stock and dispatch genuine OEM spare parts and accessories, so your IT and AV systems stay operational.",
    capabilities: [
      {
        icon: PackageCheck,
        title: "Genuine OEM Spare Parts",
        description: "Authentic components sourced directly from certified OEM partners.",
      },
      {
        icon: Truck,
        title: "Rapid Replacement & Logistics",
        description: "Fast-dispatch logistics network for time-critical replacements.",
      },
      {
        icon: Cable,
        title: "Cables & Accessories",
        description: "A full range of enterprise-grade cables, adapters, and mounts.",
      },
      {
        icon: Boxes,
        title: "Legacy Component Sourcing",
        description: "Hard-to-find parts for systems still in active service.",
      },
      {
        icon: LayoutGrid,
        title: "Bulk Inventory Management",
        description: "Managed spare-parts inventory so you're never caught short.",
      },
      {
        icon: Settings2,
        title: "Emergency Dispatch",
        description: "Priority handling for mission-critical hardware failures.",
      },
    ],
    benefits: [
      "43 OEM & technology partnerships",
      "Fast-delivery logistics network, PAN-India",
      "100% genuine parts guarantee",
      "Managed inventory for zero-downtime operations",
    ],
  },
];
