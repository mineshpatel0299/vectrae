export type WorkspaceItem = {
  icon: string;
  title: string;
  description: string;
  tag?: string;
  action?: {
    label: string;
    href: string;
  };
  toggleDefault?: boolean;
};

export type WorkspaceFolder = {
  id: string;
  label: string;
  icon: string;
  accent: string;
  items: WorkspaceItem[];
};

export const workspaceFolders: WorkspaceFolder[] = [
  {
    id: "projects",
    label: "Projects",
    icon: "layoutGrid",
    accent: "#29B9F2",
    items: [
      {
        icon: "server",
        title: "Data Center Modernization",
        tag: "Financial Services",
        description:
          "Migrated 40 racks to a hybrid on-prem/cloud architecture with zero downtime.",
        action: { label: "View case study", href: "/case-studies/data-center-modernization" },
      },
      {
        icon: "network",
        title: "Enterprise WiFi 7 Rollout",
        tag: "Retail · 5,000 Seats",
        description: "Deployed dense WiFi 7 access points across 120 store locations.",
        action: { label: "View case study", href: "/case-studies/wifi-rollout" },
      },
      {
        icon: "shieldCheck",
        title: "Zero-Trust Network Overhaul",
        tag: "Healthcare",
        description: "Implemented end-to-end zero-trust security across clinical networks.",
        action: { label: "View case study", href: "/case-studies/zero-trust-overhaul" },
      },
      {
        icon: "database",
        title: "Server Refresh Program",
        tag: "Manufacturing",
        description: "Replaced legacy servers with high-density compute for real-time analytics.",
        action: { label: "View case study", href: "/case-studies/server-refresh" },
      },
    ],
  },
  {
    id: "team",
    label: "Team",
    icon: "users",
    accent: "#25D9C7",
    items: [
      {
        icon: "users",
        title: "Solutions Architecture",
        tag: "12 Specialists",
        description: "Design end-to-end infrastructure blueprints tailored to your environment.",
      },
      {
        icon: "headset",
        title: "Field Engineering",
        tag: "24/7 Coverage",
        description: "On-site deployment, installation, and hands-on technical support.",
      },
      {
        icon: "userCog",
        title: "Program Management",
        tag: "Dedicated PMO",
        description: "A single point of contact keeping every rollout on time and on budget.",
      },
      {
        icon: "briefcase",
        title: "Customer Success",
        tag: "Post-Deployment",
        description: "Ongoing account support, health checks, and lifecycle planning.",
      },
    ],
  },
  {
    id: "resources",
    label: "Resources",
    icon: "fileText",
    accent: "#84D96C",
    items: [
      {
        icon: "fileText",
        title: "Product Catalog 2026",
        tag: "PDF · 8.2 MB",
        description: "Full lineup of enterprise hardware, networking, and power solutions.",
        action: { label: "Download", href: "/resources/product-catalog.pdf" },
      },
      {
        icon: "fileText",
        title: "Deployment Playbook",
        tag: "PDF · 3.4 MB",
        description: "Step-by-step guidance for large-scale enterprise rollouts.",
        action: { label: "Download", href: "/resources/deployment-playbook.pdf" },
      },
      {
        icon: "shieldCheck",
        title: "Security & Compliance Brief",
        tag: "PDF · 1.1 MB",
        description: "How Vectrae meets SOC 2, ISO 27001, and industry compliance standards.",
        action: { label: "Download", href: "/resources/security-brief.pdf" },
      },
      {
        icon: "download",
        title: "Warranty & Support Policy",
        tag: "PDF · 640 KB",
        description: "Coverage terms, SLAs, and support escalation paths.",
        action: { label: "Download", href: "/resources/warranty-policy.pdf" },
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    accent: "#B6D93B",
    items: [
      {
        icon: "moon",
        title: "Dark Mode Interface",
        description: "Switch dashboard theme for low-light environments.",
        toggleDefault: true,
      },
      {
        icon: "bell",
        title: "Deployment Notifications",
        description: "Get notified on rollout milestones and maintenance windows.",
        toggleDefault: true,
      },
      {
        icon: "lock",
        title: "Two-Factor Authentication",
        description: "Require a second verification step for all admin accounts.",
        toggleDefault: true,
      },
      {
        icon: "globe2",
        title: "Regional Data Residency",
        description: "Keep workloads and backups within your selected region.",
        toggleDefault: false,
      },
    ],
  },
  {
    id: "messages",
    label: "Messages",
    icon: "mail",
    accent: "#29B9F2",
    items: [
      {
        icon: "messageSquare",
        title: "Sales Team",
        tag: "2m ago",
        description: "Thanks for reaching out — let's schedule a walkthrough of the platform.",
        action: { label: "Reply", href: "/contact" },
      },
      {
        icon: "headset",
        title: "Support",
        tag: "1h ago",
        description: "Your ticket #4821 has been resolved. Let us know if you need anything else.",
        action: { label: "Reply", href: "/contact" },
      },
      {
        icon: "users",
        title: "Partnerships",
        tag: "Yesterday",
        description: "Following up on the reseller agreement draft we sent over last week.",
        action: { label: "Reply", href: "/contact" },
      },
      {
        icon: "send",
        title: "Vectrae Newsletter",
        tag: "3 days ago",
        description: "New enterprise hardware line now available for Q3 deployments.",
        action: { label: "Reply", href: "/contact" },
      },
    ],
  },
];
