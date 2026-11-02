import {
  ClipboardList,
  CircleHelp,
  HeartPulse,
  Hourglass,
  BadgeCheck,
  ListChecks,
  Mail,
  MessageCircle,
  Phone,
  SearchCheck,
  UserRound,
  Users,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/types/site";

const icons = {
  phone: Phone,
  "message-circle": MessageCircle,
  mail: Mail,
  "clipboard-list": ClipboardList,
  "list-checks": ListChecks,
  "circle-help": CircleHelp,
  "search-check": SearchCheck,
  "heart-pulse": HeartPulse,
  hourglass: Hourglass,
  users: Users,
  "user-round": UserRound,
  "badge-check": BadgeCheck,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const Component = icons[name];
  return <Component aria-hidden {...props} />;
}
