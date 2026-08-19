import {
  MonitorPlay,
  Settings2,
  Users,
  BatteryCharging,
  ShieldCheck,
  Server,
  Newspaper,
  type LucideIcon,
} from "lucide-react";

export const categoryIcons: Record<string, LucideIcon> = {
  "Audio Visual": MonitorPlay,
  "Managed Services": Settings2,
  Collaboration: Users,
  "Power Solutions": BatteryCharging,
  "Networking & Security": ShieldCheck,
  "Data Center": Server,
};

export const DEFAULT_CATEGORY_ICON: LucideIcon = Newspaper;
