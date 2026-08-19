export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; attribution?: string }
  | { type: "list"; items: string[] };

export type BlogAuthor = {
  name: string;
  role: string;
  initials: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
  image: string;
  featured?: boolean;
  author: BlogAuthor;
  tags: string[];
  content: BlogBlock[];
};

const rohan: BlogAuthor = { name: "Rohan Mehta", role: "Practice Lead, Audio Visual", initials: "RM" };
const ananya: BlogAuthor = { name: "Ananya Kapoor", role: "Practice Lead, Networking & Security", initials: "AK" };
const vikram: BlogAuthor = { name: "Vikram Suri", role: "Practice Lead, Data Center & Power", initials: "VS" };
const karan: BlogAuthor = { name: "Karan Bhatia", role: "Head of Managed IT Services", initials: "KB" };

export const blogPosts: BlogPost[] = [
  {
    slug: "av-tech-2026",
    title: "Top 10 AV Technologies for Enterprise Meeting Rooms in 2026",
    excerpt:
      "Hybrid work has permanently changed what a meeting room needs to do. Here's what's actually worth specifying in 2026 — and what to skip.",
    category: "Audio Visual",
    date: "March 12, 2026",
    readTime: "6 min read",
    color: "#29B9F2",
    image: "/images/blog/av-tech.png",
    featured: true,
    author: rohan,
    tags: ["Audio Visual", "Hybrid Work", "Meeting Rooms"],
    content: [
      {
        type: "paragraph",
        text: "Every enterprise we walk into now runs on a mix of in-room and remote attendees, often in the same call. That single shift has done more to change AV specification over the last few years than any single piece of hardware. The room is no longer the audience — the camera is. Once you internalise that, the priority list for 2026 becomes a lot clearer.",
      },
      {
        type: "heading",
        text: "What actually moved the needle this year",
      },
      {
        type: "paragraph",
        text: "We evaluate dozens of AV product lines a year across Crestron, Cisco, Poly, Yealink, and Microsoft's Teams Rooms ecosystem. Most incremental updates don't change how a room feels to use. The technologies below did — enough that we now include them as standard in most enterprise deployments rather than as premium add-ons.",
      },
      {
        type: "list",
        items: [
          "Certified all-in-one video bars — single-cable room systems (camera, speaker, mic array) that cut install time and points of failure versus componentised setups.",
          "AI auto-framing and speaker tracking — cameras that keep every in-room participant visibly framed without a technician riding the controls.",
          "Voice isolation and noise suppression — background typing, HVAC hum, and hallway noise filtered out at the mic array, not left to software guesswork later.",
          "Wireless content sharing — one-tap casting from any laptop without dongles or driver installs, critical for BYOD and guest presenters.",
          "Room scheduling panels with occupancy sensing — outside-the-door displays that release unused bookings automatically, ending the phantom-booked-room problem.",
          "Unified control across platforms — a single touch panel that runs Teams, Zoom, and Google Meet without swapping hardware or re-training staff.",
          "Acoustic treatment as a line item, not an afterthought — panelling and room geometry fixes that no amount of DSP can fully compensate for.",
          "Video walls for command centres — LED and narrow-bezel LCD walls now cost-competitive enough for NOCs and trading floors below flagship budgets.",
          "Centralised device management — remote monitoring and firmware push across every room from one dashboard, essential once you're past ten rooms.",
          "Sustainability-rated hardware — lower standby draw and longer refresh cycles, increasingly a procurement requirement rather than a nice-to-have.",
        ],
      },
      {
        type: "heading",
        text: "The checklist we give clients before they specify a room",
      },
      {
        type: "paragraph",
        text: "Before any hardware conversation, we ask three questions: how many people will typically be in the room, what platform does the organisation standardise on, and who owns the room after handover. Answering those honestly avoids the most common mistake we see — over-speccing a huddle space with command-centre hardware because a vendor demo looked impressive.",
      },
      {
        type: "quote",
        text: "The best AV room is the one nobody notices. If your team is thinking about the technology instead of the meeting, something in the spec was wrong.",
        attribution: "Rohan Mehta, Practice Lead — Audio Visual, Vectrae",
      },
      {
        type: "paragraph",
        text: "Technology choices matter, but they only pay off with correct room design and a support plan behind them. That's the part vendors rarely tell you at the demo stage — and the part that determines whether a room still works reliably eighteen months after installation.",
      },
    ],
  },
  {
    slug: "managed-it",
    title: "Why Every Enterprise Needs a Managed IT Services Provider",
    excerpt:
      "In-house IT teams are stretched thinner every year. Here's how managed services actually change the cost and risk equation — not just the headcount math.",
    category: "Managed Services",
    date: "March 08, 2026",
    readTime: "5 min read",
    color: "#25D9C7",
    image: "/images/blog/managed-it.png",
    author: karan,
    tags: ["Managed IT", "AMC", "IT Operations"],
    content: [
      {
        type: "paragraph",
        text: "Most enterprises don't choose managed IT services because they can't hire — they choose it because hiring doesn't solve the actual problem. A four-person internal IT team can competently run daily operations, but the moment a firewall needs re-architecting, a data centre migration comes up, or a 2 a.m. outage hits, that team is suddenly out of depth or out of hours.",
      },
      {
        type: "heading",
        text: "The real cost comparison",
      },
      {
        type: "paragraph",
        text: "The comparison enterprises actually need to run isn't 'managed services vs. one more hire.' It's 'managed services vs. the fully-loaded cost of covering every specialisation — networking, security, servers, end-user support, and AV — at the depth those disciplines now require, around the clock.' Once you price out that coverage internally, managed services usually comes out ahead, especially once you factor in recruitment cycles and attrition risk on a small team.",
      },
      {
        type: "list",
        items: [
          "Proactive monitoring catches failing hardware and anomalous traffic before they become incidents, not after.",
          "A defined SLA replaces best-effort response with a contractual response and resolution window.",
          "Vendor and OEM relationships are already in place, so replacement parts and escalations move faster.",
          "Security patching and compliance reporting happen on a schedule, not when someone remembers.",
          "Budget becomes predictable — a fixed monthly cost instead of unplanned capital spend when something breaks.",
        ],
      },
      {
        type: "heading",
        text: "What good managed IT actually looks like",
      },
      {
        type: "paragraph",
        text: "Not all managed services contracts are equal. The ones that hold up under pressure share a few traits: a named escalation path (not a ticket queue that disappears into a call centre), transparent reporting that shows what was monitored and fixed, and a provider who understands your existing infrastructure well enough to make architectural recommendations — not just keep the lights on.",
      },
      {
        type: "quote",
        text: "Good managed IT is invisible until the day you need it — and on that day, the difference between a five-minute fix and a five-hour outage is entirely down to how the relationship was set up beforehand.",
        attribution: "Karan Bhatia, Head of Managed IT Services, Vectrae",
      },
      {
        type: "paragraph",
        text: "The enterprises that get the most value from managed IT treat it as an extension of their team, not a vendor to be managed at arm's length. That means giving the provider real visibility into infrastructure and roadmap — which is exactly what turns a support contract into a genuine reduction in operational risk.",
      },
    ],
  },
  {
    slug: "teams-vs-zoom",
    title: "Microsoft Teams Rooms vs Zoom Rooms — Which Is Right for Your Enterprise?",
    excerpt:
      "Both platforms run on nearly identical hardware today. The decision that matters happens well before you pick a camera.",
    category: "Collaboration",
    date: "March 02, 2026",
    readTime: "8 min read",
    color: "#29B9F2",
    image: "/images/blog/teams-zoom.png",
    author: rohan,
    tags: ["Collaboration", "Microsoft Teams", "Zoom"],
    content: [
      {
        type: "paragraph",
        text: "We get asked this question in nearly every AV consultation now: Teams Rooms or Zoom Rooms? The honest answer is that the hardware layer barely differentiates the two anymore — most certified devices from Poly, Logitech, and Yealink support both platforms interchangeably. The decision that actually matters is upstream of the room.",
      },
      {
        type: "heading",
        text: "Start with what your organisation already runs on",
      },
      {
        type: "paragraph",
        text: "If your enterprise is on Microsoft 365, Teams Rooms wins on integration alone — calendar, chat, file sharing, and single sign-on all sit inside the same identity and licensing model your IT team already manages. Enterprises running a mixed or Google Workspace environment, or those whose culture and client base default to Zoom, tend to find Zoom Rooms the lower-friction choice, particularly for external client-facing meetings where Zoom remains the more universally recognised link.",
      },
      {
        type: "heading",
        text: "Where the platforms genuinely differ",
      },
      {
        type: "list",
        items: [
          "Admin control — Teams Rooms integrates with Intune and Azure AD for device policy; Zoom Rooms uses its own admin portal, which some IT teams prefer for its simplicity.",
          "Cross-platform meeting joins — both now support joining the other platform's calls from a room system, but the native experience is smoother on the home platform.",
          "Licensing structure — Teams Rooms licensing often bundles more naturally into existing Microsoft 365 enterprise agreements; Zoom licensing is typically simpler to model per-room.",
          "Room analytics — both offer usage and quality dashboards; Teams' data surfaces more naturally alongside broader Microsoft 365 reporting.",
          "Third-party device support — the certified hardware list is now broadly comparable across both ecosystems.",
        ],
      },
      {
        type: "quote",
        text: "We rarely recommend a platform based on the room. We recommend it based on where your employees already spend their day — email, chat, file storage. The room should follow that, not the other way round.",
        attribution: "Rohan Mehta, Practice Lead — Audio Visual, Vectrae",
      },
      {
        type: "heading",
        text: "The migration question nobody asks upfront",
      },
      {
        type: "paragraph",
        text: "Many enterprises we work with aren't choosing a platform from scratch — they're deciding whether to standardise after years of mixed deployments. In that scenario, the hardware refresh cycle matters more than platform preference: most certified room systems purchased in the last three years can be re-licensed to the other platform with a software update, which means a full hardware swap is rarely necessary just to switch ecosystems.",
      },
    ],
  },
  {
    slug: "choose-ups",
    title: "How to Choose the Right UPS for Your Data Center",
    excerpt:
      "Sizing a UPS wrong is one of the most common — and most expensive — mistakes in data centre planning. Here's how to get it right.",
    category: "Power Solutions",
    date: "February 25, 2026",
    readTime: "7 min read",
    color: "#25D9C7",
    image: "/images/products/power-supply.png",
    author: vikram,
    tags: ["Power Solutions", "Data Center", "UPS"],
    content: [
      {
        type: "paragraph",
        text: "A UPS is the one piece of infrastructure enterprises budget for and then rarely think about again — until the day it fails to deliver. Sizing and topology decisions made at procurement stage determine whether that day ends in a graceful failover or a full outage.",
      },
      {
        type: "heading",
        text: "Start with load, not with a number you've heard before",
      },
      {
        type: "paragraph",
        text: "The most common sizing mistake is working backward from a round number — 'we'll get a 100kVA unit' — instead of forward from actual and projected load. A proper sizing exercise accounts for current IT load, projected growth over the equipment's service life, and the derating that comes from redundancy configuration. Skipping this step is how enterprises end up either overpaying for capacity they'll never use, or worse, undersized for a load they'll hit within two years.",
      },
      {
        type: "heading",
        text: "Topology: the decision that matters more than brand",
      },
      {
        type: "list",
        items: [
          "Standby (offline) UPS — lowest cost, short transfer time; suitable for smaller, less critical loads, rarely appropriate for a production data centre.",
          "Line-interactive UPS — corrects minor voltage fluctuations without switching to battery; a reasonable middle ground for smaller server rooms.",
          "Double-conversion (online) UPS — continuously regenerates clean power with zero transfer time; the standard for enterprise data centres and any load that cannot tolerate a transfer gap.",
          "N+1 or 2N redundancy — determines whether a single UPS failure or a full maintenance cycle can happen without any load interruption.",
        ],
      },
      {
        type: "paragraph",
        text: "For any enterprise data centre or colocated environment, double-conversion topology with N+1 redundancy at minimum is the baseline we recommend — the incremental cost over line-interactive is small relative to the cost of even a single unplanned outage.",
      },
      {
        type: "quote",
        text: "We've never had a client regret sizing for growth. We've had several regret sizing for exactly where they were the day of purchase.",
        attribution: "Vikram Suri, Practice Lead — Data Center & Power, Vectrae",
      },
      {
        type: "heading",
        text: "Don't forget the battery lifecycle",
      },
      {
        type: "paragraph",
        text: "A UPS is only as reliable as its batteries, and VRLA batteries typically need replacement every three to five years depending on ambient temperature and discharge cycles. Build battery replacement into your AMC from day one rather than treating it as a surprise capital expense — it's the single most common reason a UPS fails to perform during an actual outage, long after the unit itself was installed correctly.",
      },
    ],
  },
  {
    slug: "network-security",
    title: "5 Signs Your Enterprise Network Needs a Security Overhaul",
    excerpt:
      "Most network security failures don't happen without warning. These are the signals enterprises consistently miss until it's too late.",
    category: "Networking & Security",
    date: "February 18, 2026",
    readTime: "5 min read",
    color: "#29B9F2",
    image: "/images/products/router.png",
    author: ananya,
    tags: ["Network Security", "Firewall", "Enterprise IT"],
    content: [
      {
        type: "paragraph",
        text: "Network security overhauls tend to happen reactively — after an incident, an audit failure, or a near-miss that finally gets budget approved. In our experience, the warning signs are almost always visible well before that point. Here are the five we see most consistently ignored.",
      },
      {
        type: "list",
        items: [
          "Your firewall rule set has grown organically for years with no one able to explain why half the rules exist — a sign that access has expanded faster than governance.",
          "Guest and IoT devices sit on the same VLAN as core business systems, meaning a single compromised smart device has a path to critical infrastructure.",
          "Patch management is manual and inconsistent across sites, leaving known vulnerabilities open for months after a fix is available.",
          "There's no visibility into east-west traffic between internal systems — only perimeter traffic is monitored, so lateral movement after a breach goes undetected.",
          "Multi-factor authentication is enforced for some systems but not consistently across VPN, admin, and cloud access — the gaps are exactly where attackers look first.",
        ],
      },
      {
        type: "heading",
        text: "Why these signs get ignored",
      },
      {
        type: "paragraph",
        text: "None of these are dramatic on their own, which is exactly why they persist. A messy firewall rule set doesn't cause an outage. Inconsistent MFA doesn't show up on a dashboard. It's only when these issues compound — a phishing email gets through, lands on an under-segmented network, and finds an unpatched system with no monitoring — that the cost of ignoring them becomes visible, and by then it's an incident response conversation, not a planning one.",
      },
      {
        type: "heading",
        text: "Where to start",
      },
      {
        type: "paragraph",
        text: "A network security overhaul doesn't have to mean ripping out infrastructure. We typically start with a segmentation and access review — mapping what's actually talking to what — followed by a phased rollout of consistent MFA, centralised patch management, and a firewall rule audit. That sequencing matters: fixing visibility before enforcement means you're not flying blind while you tighten controls.",
      },
      {
        type: "quote",
        text: "The enterprises that get breached usually aren't the ones with no security. They're the ones whose security stopped evolving three years before the attack did.",
        attribution: "Ananya Kapoor, Practice Lead — Networking & Security, Vectrae",
      },
    ],
  },
  {
    slug: "dc-decision",
    title: "Greenfield vs Brownfield Data Center — Decision Guide",
    excerpt:
      "Building new and retrofitting existing space involve completely different risk profiles. Here's how to decide which path fits your enterprise.",
    category: "Data Center",
    date: "February 10, 2026",
    readTime: "9 min read",
    color: "#25D9C7",
    image: "/images/products/server-ram.png",
    author: vikram,
    tags: ["Data Center", "Infrastructure", "Planning"],
    content: [
      {
        type: "paragraph",
        text: "Every data centre project starts with a version of the same question: build new, or work with what you have? Greenfield and brownfield projects solve the same end problem but carry very different cost curves, timelines, and risk profiles — and the wrong choice is expensive to reverse once construction starts.",
      },
      {
        type: "heading",
        text: "Greenfield: full control, full cost",
      },
      {
        type: "paragraph",
        text: "A greenfield build means designing power, cooling, structural load, and physical security from a blank slate. That gives you the cleanest path to modern density and efficiency targets — but it also means the full capital cost of civil work, power infrastructure, and cooling plant lands in a single project timeline, typically 12 to 18 months from design to commissioning for an enterprise-scale facility.",
      },
      {
        type: "heading",
        text: "Brownfield: faster, cheaper, but constrained",
      },
      {
        type: "paragraph",
        text: "Retrofitting existing space is almost always faster and cheaper upfront, but the constraints are real: existing floor loading, ceiling height, and electrical capacity all cap what's achievable. We've seen brownfield projects deliver excellent outcomes when the existing shell genuinely supports modern rack density — and we've seen others where the retrofit cost approached greenfield anyway once structural reinforcement and power upgrades were factored in.",
      },
      {
        type: "list",
        items: [
          "Power availability — does the site have (or can it economically get) the utility capacity your projected load requires?",
          "Cooling headroom — can the existing HVAC or a retrofit support your target rack density, or will you be capped well below modern standards?",
          "Structural loading — enterprise server racks are heavy; older buildings weren't always designed for it.",
          "Timeline pressure — brownfield wins when you need capacity in months, not years.",
          "Growth horizon — greenfield wins when the facility needs to serve the business for a decade or more at scale.",
        ],
      },
      {
        type: "quote",
        text: "The question isn't which approach is better. It's which set of constraints you'd rather manage — the ones you inherit from an existing building, or the ones that come from a fixed budget and clean-slate design.",
        attribution: "Vikram Suri, Practice Lead — Data Center & Power, Vectrae",
      },
      {
        type: "heading",
        text: "How we help clients decide",
      },
      {
        type: "paragraph",
        text: "Before recommending either path, we run a feasibility assessment against the existing site — power availability, structural survey, and cooling capacity — priced alongside a greenfield estimate for the same target specification. Most enterprises find the decision becomes obvious once both numbers, and both timelines, are sitting side by side rather than being evaluated in the abstract.",
      },
    ],
  },
];

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = blogPosts.find((p) => p.slug === slug);
  if (!current) return blogPosts.filter((p) => p.slug !== slug).slice(0, limit);

  const sameCategory = blogPosts.filter((p) => p.slug !== slug && p.category === current.category);
  const rest = blogPosts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

export const blogCategories = Array.from(new Set(blogPosts.map((p) => p.category)));
