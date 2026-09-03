const DATE_TIME = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

const DATE_ONLY = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeZone: "Asia/Kolkata",
});

/** Absolute timestamps are rendered in IST — where the team actually works. */
export function formatDateTime(value: Date | null): string {
  return value ? DATE_TIME.format(value) : "—";
}

export function formatDate(value: Date | null): string {
  return value ? DATE_ONLY.format(value) : "—";
}

export function timeAgo(value: Date | null): string {
  if (!value) {
    return "—";
  }

  const seconds = Math.round((Date.now() - value.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;

  return DATE_ONLY.format(value);
}

export function formatBytes(bytes: number | null): string {
  if (bytes === null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
