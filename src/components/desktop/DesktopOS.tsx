"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import {
  motion,
  AnimatePresence,
  useDragControls,
  useMotionValue,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutGrid,
  Users,
  FileText,
  Server,
  Network,
  ShieldCheck,
  Database,
  Headset,
  UserCog,
  Briefcase,
  Globe2,
  Send,
  Mail,
  Info,
  Handshake,
  MonitorPlay,
  Newspaper,
  Zap,
  Sparkles,
  Gem,
  Laptop,
  PackageCheck,
  StickyNote,
  MapPin,
  Phone,
  ArrowUpRight,
  ChevronRight,
  X,
  Minus,
  Maximize2,
  Minimize2,
  type LucideIcon,
} from "lucide-react";
import { BRAND_GRADIENT } from "@/lib/brand";
import { desktopFolders, type OSFolder, type OSFile } from "@/data/desktopOS";

const ICONS: Record<string, LucideIcon> = {
  layoutGrid: LayoutGrid,
  users: Users,
  fileText: FileText,
  server: Server,
  network: Network,
  shieldCheck: ShieldCheck,
  database: Database,
  headset: Headset,
  userCog: UserCog,
  briefcase: Briefcase,
  globe2: Globe2,
  send: Send,
  mail: Mail,
  info: Info,
  handshake: Handshake,
  monitorPlay: MonitorPlay,
  newspaper: Newspaper,
  zap: Zap,
  sparkles: Sparkles,
  gem: Gem,
  laptop: Laptop,
  packageCheck: PackageCheck,
  stickyNote: StickyNote,
  mapPin: MapPin,
  phone: Phone,
};

const FOLDER_CLIP =
  "polygon(0 22%, 10% 22%, 16% 6%, 46% 6%, 52% 22%, 100% 22%, 100% 100%, 0 100%)";

const TASKBAR_HEIGHT = 48;
const MENUBAR_HEIGHT = 44;

export default function DesktopOS() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [openIds, setOpenIds] = useState<string[]>([]);
  const [minimizedIds, setMinimizedIds] = useState<Set<string>>(new Set());
  const [maximizedIds, setMaximizedIds] = useState<Set<string>>(new Set());
  const [activeFile, setActiveFile] = useState<Record<string, string | null>>({});
  const [now, setNow] = useState(() => new Date());
  const [booted, setBooted] = useState(false);

  const screenRef = useRef<HTMLDivElement>(null);
  const clickTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const bootTimer = setTimeout(() => setBooted(true), 1300);
    return () => clearTimeout(bootTimer);
  }, []);

  const bringToFront = (id: string) =>
    setOpenIds((prev) => [...prev.filter((x) => x !== id), id]);

  const openFolder = (id: string) => {
    setSelectedId(id);
    setMinimizedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setOpenIds((prev) => (prev.includes(id) ? [...prev.filter((x) => x !== id), id] : [...prev, id]));
  };

  const closeFolder = (id: string) => {
    setOpenIds((prev) => prev.filter((x) => x !== id));
    setMinimizedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setMaximizedIds((prev) => {
      if (!prev.has(id)) return prev;
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const toggleMinimize = (id: string) => {
    setMinimizedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    bringToFront(id);
  };

  const toggleMaximize = (id: string) => {
    setMaximizedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    bringToFront(id);
  };

  const handleTaskbarClick = (id: string) => {
    if (minimizedIds.has(id)) {
      toggleMinimize(id);
      return;
    }
    if (openIds[openIds.length - 1] === id) {
      toggleMinimize(id);
      return;
    }
    bringToFront(id);
    setSelectedId(id);
  };

  const handleFolderActivate = (id: string) => {
    setSelectedId(id);
    const existing = clickTimers.current.get(id);
    if (existing) {
      clearTimeout(existing);
      clickTimers.current.delete(id);
      openFolder(id);
    } else {
      const timer = setTimeout(() => clickTimers.current.delete(id), 300);
      clickTimers.current.set(id, timer);
    }
  };

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) setSelectedId(null);
  };

  const openFile = (folderId: string, fileId: string) =>
    setActiveFile((prev) => ({ ...prev, [folderId]: fileId }));

  const closeFile = (folderId: string) => setActiveFile((prev) => ({ ...prev, [folderId]: null }));

  const formattedNow = `${now.toLocaleDateString(undefined, {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  })} · ${now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}`;

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <Image
        src="/workspace-wallpaper.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="pointer-events-none object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-black/55" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-100 w-100 -translate-y-1/2 rounded-full bg-[#25D9C7]/15 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-100 w-100 translate-y-1/2 rounded-full bg-[#29B9F2]/15 blur-[120px]" />

      {/* Menu bar */}
      <div
        className="absolute inset-x-0 top-0 z-40 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 backdrop-blur-md"
        style={{ height: MENUBAR_HEIGHT }}
      >
        <div className="flex items-center gap-5">
          <Image src="/logo.png" alt="Vectrae" width={110} height={23} className="h-4 w-auto" priority />
          <div className="hidden items-center gap-4 text-xs text-white/50 sm:flex">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Help</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-xs text-white/50 sm:inline" suppressHydrationWarning>
            {formattedNow}
          </span>
          <Link
            href="/"
            className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-medium text-white/70 transition hover:border-white/30 hover:text-white"
          >
            Exit to Website
          </Link>
        </div>
      </div>

      {/* Desktop surface */}
      <div
        ref={screenRef}
        onClick={handleBackgroundClick}
        className="absolute inset-x-0 bottom-0"
        style={{ top: MENUBAR_HEIGHT }}
      >
        <div className="grid w-fit grid-flow-col grid-rows-3 gap-x-2 gap-y-4 p-4 sm:gap-x-4 sm:gap-y-6 sm:p-6">
          {desktopFolders.map((folder) => {
            const Icon = ICONS[folder.icon];
            const isSelected = selectedId === folder.id;
            return (
              <button
                key={folder.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFolderActivate(folder.id);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openFolder(folder.id);
                  }
                }}
                className="group flex w-20 cursor-pointer flex-col items-center gap-2 outline-none sm:w-24"
              >
                <span
                  className={`relative flex h-16 w-18 items-center justify-center border transition duration-200 sm:h-20 sm:w-24 ${
                    isSelected
                      ? "border-white/25 bg-black/85"
                      : "border-white/10 bg-black/50 group-hover:border-white/20 group-hover:bg-black/70"
                  }`}
                  style={{
                    clipPath: FOLDER_CLIP,
                    boxShadow: isSelected ? `0 0 28px ${folder.accent}55` : undefined,
                  }}
                >
                  <Icon className="h-7 w-7 translate-y-1.5 sm:h-9 sm:w-9 sm:translate-y-2" style={{ color: folder.accent }} />
                </span>
                <span className={`text-xs sm:text-sm ${isSelected ? "text-white" : "text-white/75"}`}>
                  {folder.label}
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {openIds.map((id, index) => {
            const folder = desktopFolders.find((f) => f.id === id);
            if (!folder) return null;
            return (
              <OSWindow
                key={id}
                folder={folder}
                index={index}
                isFocused={openIds[openIds.length - 1] === id}
                isMinimized={minimizedIds.has(id)}
                isMaximized={maximizedIds.has(id)}
                screenRef={screenRef}
                activeFileId={activeFile[id] ?? null}
                onOpenFile={(fileId) => openFile(id, fileId)}
                onCloseFile={() => closeFile(id)}
                onClose={() => closeFolder(id)}
                onMinimize={() => toggleMinimize(id)}
                onMaximize={() => toggleMaximize(id)}
                onFocus={() => bringToFront(id)}
              />
            );
          })}
        </AnimatePresence>

        {openIds.length > 0 && (
          <div
            className="absolute inset-x-0 bottom-0 z-200 flex items-center justify-center gap-1.5 border-t border-white/10 bg-white/[0.03] px-3 py-2 backdrop-blur-md sm:gap-2"
            style={{ height: TASKBAR_HEIGHT }}
          >
            {openIds.map((id) => {
              const folder = desktopFolders.find((f) => f.id === id);
              if (!folder) return null;
              const Icon = ICONS[folder.icon];
              const focused = openIds[openIds.length - 1] === id && !minimizedIds.has(id);
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleTaskbarClick(id)}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] font-medium transition ${
                    focused ? "bg-white/10 text-white" : "text-white/50 hover:bg-white/5 hover:text-white/80"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" style={{ color: folder.accent }} />
                  <span className="hidden sm:inline">{folder.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <AnimatePresence>
        {!booted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="absolute inset-0 z-500 flex flex-col items-center justify-center gap-5 bg-black"
          >
            <div className="pointer-events-none absolute h-48 w-48 rounded-full bg-[#29B9F2]/15 blur-[70px]" />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: [0.75, 1, 0.75], scale: [0.97, 1, 0.97] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <Image src="/logo.png" alt="Vectrae" width={280} height={58} className="h-9 w-auto sm:h-11" priority />
            </motion.div>
            <div className="relative h-1 w-40 overflow-hidden rounded-full bg-white/10 sm:w-48">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.15, ease: "easeInOut" }}
                className="h-full rounded-full"
                style={{ backgroundImage: BRAND_GRADIENT }}
              />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Starting Vectrae OS…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function OSWindow({
  folder,
  index,
  isFocused,
  isMinimized,
  isMaximized,
  screenRef,
  activeFileId,
  onOpenFile,
  onCloseFile,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
}: {
  folder: OSFolder;
  index: number;
  isFocused: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  screenRef: RefObject<HTMLDivElement | null>;
  activeFileId: string | null;
  onOpenFile: (fileId: string) => void;
  onCloseFile: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
}) {
  const controls = useDragControls();
  const dragX = useMotionValue(index * 18);
  const dragY = useMotionValue(index * 18);
  const Icon = ICONS[folder.icon];
  const zIndex = 40 + index;
  const file = folder.files.find((f) => f.id === activeFileId) ?? null;
  const size = { width: 640, height: 480 };

  useEffect(() => {
    if (isMaximized) {
      dragX.set(0);
      dragY.set(0);
    }
  }, [isMaximized, dragX, dragY]);

  const handleHeaderPointerDown = (e: React.PointerEvent) => {
    onFocus();
    controls.start(e);
  };

  const style: React.CSSProperties = isMaximized
    ? { position: "absolute", top: 0, left: 0, right: 0, bottom: TASKBAR_HEIGHT, zIndex }
    : {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: TASKBAR_HEIGHT,
        margin: "auto",
        width: size.width,
        maxWidth: "calc(100vw - 32px)",
        height: size.height,
        maxHeight: "calc(100% - 32px)",
        zIndex,
        pointerEvents: isMinimized ? "none" : "auto",
      };

  return (
    <motion.div
      drag={!isMaximized}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.04}
      dragConstraints={screenRef}
      onPointerDown={onFocus}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: isMinimized ? 0 : 1, scale: isMinimized ? 0.85 : 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      style={{ ...style, x: dragX, y: dragY }}
      className={`flex flex-col overflow-hidden border bg-neutral-950/95 shadow-2xl backdrop-blur-xl transition-[border-radius] duration-200 ${
        isMaximized ? "rounded-none" : "rounded-2xl"
      } ${isFocused ? "border-white/25" : "border-white/10"}`}
    >
      <div
        onPointerDown={handleHeaderPointerDown}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onMaximize();
        }}
        className={`flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-3 py-2 ${
          isMaximized ? "cursor-default" : "cursor-grab active:cursor-grabbing"
        }`}
      >
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Close"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="group/dot flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-[#ff5f57] transition hover:brightness-110"
          >
            <X className="h-2 w-2 text-[#4d0000] opacity-0 transition-opacity group-hover/dot:opacity-100" strokeWidth={3} />
          </button>
          <button
            type="button"
            aria-label="Minimize"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className="group/dot flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-[#febc2e] transition hover:brightness-110"
          >
            <Minus className="h-2 w-2 text-[#7a4b00] opacity-0 transition-opacity group-hover/dot:opacity-100" strokeWidth={4} />
          </button>
          <button
            type="button"
            aria-label={isMaximized ? "Restore" : "Maximize"}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className="group/dot flex h-3 w-3 cursor-pointer items-center justify-center rounded-full bg-[#28c840] transition hover:brightness-110"
          >
            {isMaximized ? (
              <Minimize2 className="h-1.5 w-1.5 text-[#0a4d16] opacity-0 transition-opacity group-hover/dot:opacity-100" strokeWidth={4} />
            ) : (
              <Maximize2 className="h-1.5 w-1.5 text-[#0a4d16] opacity-0 transition-opacity group-hover/dot:opacity-100" strokeWidth={4} />
            )}
          </button>
        </div>
        <Icon className="ml-1.5 h-3.5 w-3.5" style={{ color: folder.accent }} />
        <span className="text-xs font-medium text-white/80">{folder.label}</span>
      </div>

      <div className="flex items-center gap-1.5 border-b border-white/5 bg-black/20 px-4 py-2 text-[11px]">
        <button
          type="button"
          onClick={onCloseFile}
          className={!file ? "font-semibold text-white" : "text-white/40 transition hover:text-white/70"}
        >
          {folder.label}
        </button>
        {file && (
          <>
            <ChevronRight className="h-3 w-3 text-white/25" />
            <span className="font-semibold text-white">{file.title}</span>
          </>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 sm:p-5">
        {!file ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {folder.files.map((f) => {
              const FIcon = ICONS[f.icon];
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onOpenFile(f.id)}
                  className="group flex flex-col items-center gap-2 rounded-lg p-2 outline-none transition hover:bg-white/5"
                >
                  <span
                    className="relative flex h-14 w-16 items-center justify-center border border-white/10 bg-black/50 transition duration-200 group-hover:border-white/20"
                    style={{ clipPath: FOLDER_CLIP }}
                  >
                    <FIcon className="h-6 w-6 translate-y-1" style={{ color: folder.accent }} />
                  </span>
                  <span className="line-clamp-2 text-center text-[11px] leading-snug text-white/70">
                    {f.title}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <FileDetail file={file} accent={folder.accent} />
        )}
      </div>
    </motion.div>
  );
}

function FileDetail({ file, accent }: { file: OSFile; accent: string }) {
  const Icon = ICONS[file.icon] ?? FileText;
  const [on, setOn] = useState(!!file.toggleDefault);
  const hasToggle = file.toggleDefault !== undefined;

  return (
    <div className="mx-auto max-w-lg">
      <div className="flex items-start gap-4">
        <span
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
          style={{ color: accent }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          {file.tag && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-white/40">{file.tag}</span>
          )}
          <h3 className="mt-0.5 text-lg font-semibold text-white">{file.title}</h3>
        </div>
        {hasToggle && (
          <button
            type="button"
            onClick={() => setOn((v) => !v)}
            className={`relative mt-1 h-5 w-9 shrink-0 rounded-full transition-colors duration-300 ${
              on ? "bg-[#25D9C7]" : "bg-white/15"
            }`}
          >
            <motion.span
              className="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow"
              animate={{ x: on ? 16 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        )}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/60">{file.summary}</p>
      <p className="mt-3 text-sm leading-relaxed text-white/40">{file.body}</p>

      {file.meta && (
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-white/10 pt-4 sm:grid-cols-3">
          {file.meta.map((m) => (
            <div key={m.label}>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-white/30">{m.label}</p>
              <p className="mt-0.5 text-sm text-white">{m.value}</p>
            </div>
          ))}
        </div>
      )}

      {file.action && (
        <Link
          href={file.action.href}
          style={{ backgroundImage: BRAND_GRADIENT }}
          className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-black transition hover:opacity-90"
        >
          {file.action.label}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      )}
    </div>
  );
}
