"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";

function HeartIcon({ filled }) {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? "#e0445a" : "none"} stroke={filled ? "#e0445a" : "currentColor"} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}
function CommentIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
    );
}
function ShareIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    );
}
function BookmarkIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
    );
}

function formatCount(n) {
    if (!n && n !== 0) return "–";
    const num = typeof n === "string" ? parseInt(n.replace(/,/g, ""), 10) : n;
    if (isNaN(num)) return "–";
    return num >= 1000
        ? (num / 1000).toFixed(1).replace(/\.0$/, "") + "k"
        : String(num);
}

// Path to your local logo file — drop the file in /public and update this path.
const DEFAULT_LOGO = "/images/kec-logo.png";

// Real Instagram web app font stack (not Inter)
const IG_FONT =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

// Instagram brand gradients
const IG_GRADIENT =
    "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)";

const CARD_WIDTH = 300;
const CARD_GAP = 16;

// Story viewer: how long each image slide stays on screen
const STORY_MS = 5000;

const DEFAULT_PROFILE = {
    name: "KEC Biofuel",
    bio: "Renewable energy, rooted in agriculture. 🌱\nCBG parks · Clean fuel · Farmer prosperity",
    link: "kecbiofuel.com",
    followers: null,
    following: null,
};

function FeedCard({ photo, handle, logoUrl }) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [imgError, setImgError] = useState(false);
    const [avatarError, setAvatarError] = useState(false);
    const [muted, setMuted] = useState(true);
    const videoRef = useRef(null);

    const likes = typeof photo.like_count !== "undefined" ? photo.like_count : photo.likes;
    const comments = photo.comments_count ?? photo.comments;

    const postImageSrc = photo.cover_url || photo.media_url || photo.img;
    const avatarSrc = photo.profile_pic_url || logoUrl || DEFAULT_LOGO;

    return (
        <a
            href={photo.permalink || "https://www.kecbiofuel.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-2xl overflow-hidden flex flex-col no-underline bg-white border border-[#efefef] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-100 hover:border-green-300"
            style={{
                width: `min(${CARD_WIDTH}px, 80vw)`,
                fontFamily: IG_FONT,
                textDecoration: "none",
                color: "inherit",
            }}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center gap-2.5 px-3 py-2.5">
                <div
                    className="w-8 h-8 rounded-full p-[2px] flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #f9ce34, #ee2a7b, #6228d7)" }}
                >
                    <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center p-[1.5px]">
                        {avatarError ? (
                            <div
                                className="w-full h-full rounded-full"
                                style={{ background: "linear-gradient(135deg, #f9ce34, #ee2a7b)" }}
                            />
                        ) : (
                            <img
                                src={avatarSrc}
                                alt={handle || "profile"}
                                className="max-w-full max-h-full object-contain"
                                draggable={false}
                                onError={() => setAvatarError(true)}
                            />
                        )}
                    </div>
                </div>
                <div className="flex flex-col leading-tight">
                    <span style={{ fontSize: 12, fontWeight: 700 }} className="text-[#1e110a]">{handle || "kecbiofuel"}</span>
                    <span style={{ fontSize: 10 }} className="text-[#8a8a8a]">New Delhi, India</span>
                </div>
                <div className="ml-auto">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-[#1e110a]">
                        <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
                    </svg>
                </div>
            </div>

            {/* Media */}
            <div style={{ aspectRatio: "1", overflow: "hidden", position: "relative" }} className="bg-orange-50">
                {photo.media_type === "VIDEO" && photo.video_url ? (
                    <>
                        <video
                            ref={videoRef}
                            src={photo.video_url}
                            poster={photo.cover_url || photo.thumbnail_url}
                            className="w-full h-full object-cover"
                            muted={muted}
                            loop
                            playsInline
                            autoPlay
                            preload="metadata"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setMuted((m) => !m);
                            }}
                        />
                        <button
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setMuted((m) => !m); }}
                            className="absolute bottom-2 right-2 w-6 h-6 rounded-full flex items-center justify-center bg-black/40 border-none cursor-pointer"
                            style={{ backdropFilter: "blur(2px)" }}
                        >
                            {muted ? (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                    <path d="M11 5 6 9H2v6h4l5 4z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                                </svg>
                            ) : (
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                    <path d="M11 5 6 9H2v6h4l5 4z" /><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                </svg>
                            )}
                        </button>
                    </>
                ) : imgError || !postImageSrc ? (
                    <div className="w-full h-full flex items-center justify-center text-[11px] text-[#8a8a8a]">
                        Image unavailable
                    </div>
                ) : (
                    <img
                        src={postImageSrc}
                        alt={photo.caption || photo.alt || "Instagram post"}
                        className="w-full h-full object-cover"
                        draggable={false}
                        loading="lazy"
                        onError={() => setImgError(true)}
                    />
                )}
            </div>

            {/* Actions */}
            <div className="px-3 pt-2.5 pb-1 flex items-center gap-3" onClick={(e) => e.preventDefault()}>
                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setLiked((l) => !l); }}
                    className={`transition-transform active:scale-90 bg-transparent border-none cursor-pointer p-0 ${liked ? "text-[#e0445a]" : "text-[#1e110a]"}`}
                >
                    <HeartIcon filled={liked} />
                </button>
                <button className="bg-transparent border-none cursor-pointer p-0 text-[#1e110a]"><CommentIcon /></button>
                <button className="bg-transparent border-none cursor-pointer p-0 text-[#1e110a]"><ShareIcon /></button>
                <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSaved((s) => !s); }}
                    className="ml-auto bg-transparent border-none cursor-pointer p-0 text-[#1e110a]"
                    style={{ opacity: saved ? 1 : 0.75 }}
                >
                    <BookmarkIcon />
                </button>
            </div>

            <div className="px-3 pb-1">
                <span style={{ fontSize: 12, fontWeight: 700 }} className="text-[#1e110a]">
                    {formatCount(liked ? (likes || 0) + 1 : likes)} likes
                </span>
            </div>

            <div className="px-3 pb-2">
                <p style={{ fontSize: 12.5, lineHeight: 1.5, margin: 0 }} className="text-[#1e110a]">
                    <span style={{ fontWeight: 700 }}>{handle || "kecbiofuel"} </span>
                    {photo.caption
                        ? photo.caption.length > 80
                            ? photo.caption.slice(0, 80) + "…"
                            : photo.caption
                        : ""}
                </p>
            </div>

            <div className="px-3 pb-3">
                <span style={{ fontSize: 11, fontWeight: 700 }} className="text-[#8a8a8a]">
                    {comments != null ? `View all ${formatCount(comments)} comments` : "View post on Instagram"}
                </span>
            </div>
        </a>
    );
}

function SkeletonCard() {
    return (
        <div
            className="shrink-0 rounded-2xl overflow-hidden animate-pulse bg-orange-50 border border-orange-100"
            style={{ width: `min(${CARD_WIDTH}px, 80vw)` }}
        >
            <div className="bg-orange-100" style={{ height: 52 }} />
            <div className="bg-orange-100" style={{ aspectRatio: "1" }} />
            <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
                <div className="bg-orange-200" style={{ height: 12, width: "40%", borderRadius: 6 }} />
                <div className="bg-orange-200" style={{ height: 10, width: "80%", borderRadius: 6 }} />
                <div className="bg-orange-200" style={{ height: 10, width: "60%", borderRadius: 6 }} />
            </div>
        </div>
    );
}

// Follow + Share profile buttons
function ActionButtons({ profileUrl, profileName }) {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        // Native share sheet on phones / supported browsers
        try {
            if (typeof navigator !== "undefined" && navigator.share) {
                await navigator.share({
                    title: profileName || "KEC Biofuel",
                    text: `Check out ${profileName || "KEC Biofuel"} on Instagram`,
                    url: profileUrl,
                });
                return;
            }
        } catch (err) {
            if (err && err.name === "AbortError") return; // user closed the sheet
        }
        // Fallback: copy link to clipboard
        try {
            await navigator.clipboard.writeText(profileUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.prompt("Copy profile link:", profileUrl);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center transition-all duration-200 hover:brightness-110 hover:shadow-lg hover:shadow-pink-300/50 active:scale-95"
                style={{
                    background: IG_GRADIENT,
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: "7px 22px",
                    textDecoration: "none",
                }}
            >
                Follow
            </a>
            <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-1.5 bg-[#efefef] hover:bg-[#dbdbdb] transition-colors duration-200 text-[#262626] active:scale-95 border-none cursor-pointer"
                style={{
                    fontSize: 14,
                    fontWeight: 600,
                    borderRadius: 8,
                    padding: "7px 18px",
                    fontFamily: IG_FONT,
                }}
            >
                {copied ? "Link copied!" : "Share profile"}
            </button>
        </div>
    );
}

// Row of highlight circles (used on desktop panel + mobile row)
function HighlightsRow({ highlights, onOpen, size = 84, scroll = false }) {
    return (
        <div
            className={scroll ? "flex items-start gap-4 overflow-x-auto pb-1" : "flex items-center justify-between"}
            style={scroll ? { scrollbarWidth: "none" } : undefined}
        >
            {highlights.map((h, i) => (
                <button
                    key={h.label}
                    type="button"
                    onClick={() => onOpen(i)}
                    className="flex flex-col items-center gap-2 group bg-transparent border-none cursor-pointer p-0 shrink-0"
                    style={{ fontFamily: IG_FONT }}
                >
                    <div
                        className="rounded-full p-[2.5px] transition-transform duration-300 group-hover:scale-105"
                        style={{
                            width: size,
                            height: size,
                            background: "linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)",
                        }}
                    >
                        <div className="w-full h-full rounded-full bg-white p-[2px] overflow-hidden">
                            {h.cover ? (
                                <img
                                    src={h.cover}
                                    alt={h.label}
                                    className="w-full h-full rounded-full object-cover"
                                    draggable={false}
                                    loading="lazy"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-[#efefef]" />
                            )}
                        </div>
                    </div>
                    <span style={{ fontSize: 11 }} className="text-[#262626]">{h.label}</span>
                </button>
            ))}
        </div>
    );
}

// Full-screen Instagram-style story viewer for highlights
function StoryViewer({ highlights, startIndex, handle, onClose }) {
    const [h, setH] = useState(startIndex);
    const [s, setS] = useState(0);
    const [progress, setProgress] = useState(0);
    const [paused, setPaused] = useState(false);
    const [muted, setMuted] = useState(true);
    const videoRef = useRef(null);
    const pressStart = useRef(0);

    const hl = highlights[h];
    const slide = hl.slides[s];
    const isVideo = slide.type === "video";

    const goNext = useCallback(() => {
        setProgress(0);
        if (s < hl.slides.length - 1) {
            setS(s + 1);
        } else if (h < highlights.length - 1) {
            setH(h + 1);
            setS(0);
        } else {
            onClose();
        }
    }, [s, h, hl.slides.length, highlights.length, onClose]);

    const goPrev = useCallback(() => {
        setProgress(0);
        if (s > 0) {
            setS(s - 1);
        } else if (h > 0) {
            setH(h - 1);
            setS(highlights[h - 1].slides.length - 1);
        }
    }, [s, h, highlights]);

    // Keep latest goNext in a ref so the timer doesn't restart every render
    const goNextRef = useRef(goNext);
    useEffect(() => { goNextRef.current = goNext; }, [goNext]);

    // Auto-advance timer for image slides
    useEffect(() => {
        if (isVideo || paused) return;
        const tick = 50;
        const t = setInterval(() => {
            setProgress((p) => {
                const np = p + (tick / STORY_MS) * 100;
                if (np >= 100) {
                    setTimeout(() => goNextRef.current(), 0);
                    return 100;
                }
                return np;
            });
        }, tick);
        return () => clearInterval(t);
    }, [h, s, paused, isVideo]);

    // Pause / resume video with hold
    useEffect(() => {
        const v = videoRef.current;
        if (!v) return;
        if (paused) v.pause();
        else v.play().catch(() => { });
    }, [paused, h, s]);

    // Keyboard + scroll lock
    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            else if (e.key === "ArrowRight") goNextRef.current();
            else if (e.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", onKey);
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = prevOverflow;
        };
    }, [goPrev, onClose]);

    const onPressStart = () => { pressStart.current = Date.now(); setPaused(true); };
    const onPressEnd = (dir) => {
        setPaused(false);
        // Short tap = navigate. Long press = just pause/resume (like real IG).
        if (Date.now() - pressStart.current < 250) {
            dir === "next" ? goNext() : goPrev();
        }
    };

    const viewer = (
        <div
            className="fixed inset-0 flex items-center justify-center"
            style={{ zIndex: 9999, background: "rgba(0,0,0,0.92)", fontFamily: IG_FONT }}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            {/* Close (top-right of screen) */}
            <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-transparent border-none cursor-pointer text-white"
                style={{ zIndex: 3 }}
            >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                </svg>
            </button>

            {/* Desktop side arrows */}
            {(h > 0 || s > 0) && (
                <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Previous"
                    className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center bg-white/90 border-none cursor-pointer text-[#262626]"
                    style={{ zIndex: 3 }}
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
            )}
            <button
                type="button"
                onClick={goNext}
                aria-label="Next"
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full items-center justify-center bg-white/90 border-none cursor-pointer text-[#262626]"
                style={{ zIndex: 3 }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6" /></svg>
            </button>

            {/* Story frame (9:16) */}
            <div
                className="relative overflow-hidden bg-black"
                style={{
                    width: "min(100vw, calc(100vh * 9 / 16))",
                    height: "min(100vh, calc(100vw * 16 / 9))",
                    borderRadius: 12,
                }}
            >
                {/* Media */}
                {isVideo ? (
                    <video
                        key={`${h}-${s}`}
                        ref={videoRef}
                        src={slide.video}
                        poster={slide.src}
                        className="absolute inset-0 w-full h-full object-cover"
                        muted={muted}
                        playsInline
                        autoPlay
                        onTimeUpdate={(e) => {
                            const v = e.currentTarget;
                            if (v.duration) setProgress((v.currentTime / v.duration) * 100);
                        }}
                        onEnded={goNext}
                    />
                ) : (
                    <img
                        key={`${h}-${s}`}
                        src={slide.src}
                        alt={hl.label}
                        className="absolute inset-0 w-full h-full object-cover"
                        draggable={false}
                    />
                )}

                {/* Top gradient for readability */}
                <div
                    className="absolute top-0 left-0 right-0 pointer-events-none"
                    style={{ height: 120, background: "linear-gradient(to bottom, rgba(0,0,0,0.55), transparent)" }}
                />

                {/* Tap zones: left 1/3 = back, right 2/3 = next; hold = pause */}
                <div className="absolute inset-0 flex" style={{ zIndex: 1 }}>
                    <div
                        className="h-full"
                        style={{ width: "33%" }}
                        onPointerDown={onPressStart}
                        onPointerUp={() => onPressEnd("prev")}
                        onPointerLeave={() => setPaused(false)}
                        onPointerCancel={() => setPaused(false)}
                    />
                    <div
                        className="h-full"
                        style={{ width: "67%" }}
                        onPointerDown={onPressStart}
                        onPointerUp={() => onPressEnd("next")}
                        onPointerLeave={() => setPaused(false)}
                        onPointerCancel={() => setPaused(false)}
                    />
                </div>

                {/* Progress bars */}
                <div className="absolute top-2 left-2 right-2 flex gap-1 pointer-events-none" style={{ zIndex: 2 }}>
                    {hl.slides.map((_, i) => (
                        <div key={i} className="flex-1 rounded-full overflow-hidden" style={{ height: 2.5, background: "rgba(255,255,255,0.35)" }}>
                            <div
                                style={{
                                    height: "100%",
                                    background: "#fff",
                                    width: i < s ? "100%" : i === s ? `${progress}%` : "0%",
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Header: avatar + handle + highlight name */}
                <div className="absolute left-3 right-3 flex items-center gap-2.5 pointer-events-none" style={{ top: 18, zIndex: 2 }}>
                    <div className="w-8 h-8 rounded-full bg-white overflow-hidden flex items-center justify-center p-[2px]">
                        <img src={DEFAULT_LOGO} alt="" className="max-w-full max-h-full object-contain" draggable={false} />
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 700 }} className="text-white">{handle}</span>
                    <span style={{ fontSize: 13 }} className="text-white/70">· {hl.label}</span>
                </div>

                {/* Mute toggle for videos */}
                {isVideo && (
                    <button
                        type="button"
                        onClick={() => setMuted((m) => !m)}
                        className="absolute bottom-4 right-4 w-9 h-9 rounded-full flex items-center justify-center bg-black/50 border-none cursor-pointer"
                        style={{ zIndex: 3 }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                            <path d="M11 5 6 9H2v6h4l5 4z" />
                            {muted ? (
                                <><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></>
                            ) : (
                                <><path d="M15.54 8.46a5 5 0 0 1 0 7.07" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14" /></>
                            )}
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );

    // Portal to body: the header has a CSS transform, which would trap
    // position:fixed inside the card instead of covering the full screen.
    return createPortal(viewer, document.body);
}

// Instagram-profile style header
function ProfileHeader({ handle, profile, postCount, posts = [], visible }) {
    const [avatarError, setAvatarError] = useState(false);
    const [openIndex, setOpenIndex] = useState(null);
    const profileUrl = `https://www.instagram.com/${handle}/`;

    // Each highlight = a few slides built from posts (3 per highlight).
    const HIGHLIGHT_LABELS = ["Plants", "Farmers", "CBG", "Solar", "Wind", "Events"];
    const SLIDES_PER_HIGHLIGHT = 3;
    const highlights = HIGHLIGHT_LABELS.map((label, i) => {
        const slides = [];
        if (posts.length) {
            for (let k = 0; k < SLIDES_PER_HIGHLIGHT; k++) {
                const p = posts[(i * SLIDES_PER_HIGHLIGHT + k) % posts.length];
                const src = p.cover_url || p.media_url || p.img || p.thumbnail_url;
                const isVideo = p.media_type === "VIDEO" && p.video_url;
                if (src || isVideo) {
                    slides.push({ type: isVideo ? "video" : "image", src, video: p.video_url });
                }
            }
        }
        return { label, cover: slides[0]?.src || null, slides };
    }).filter((hl) => hl.slides.length > 0);

    const stats = [
        { value: formatCount(postCount), label: "posts" },
        { value: formatCount(profile.followers), label: "followers" },
        { value: formatCount(profile.following), label: "following" },
    ];

    return (
        <div
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-10 mb-10 bg-white/80 backdrop-blur-sm rounded-3xl border border-[#efefef] shadow-sm p-5 sm:px-10 sm:py-6"
            style={{
                fontFamily: IG_FONT,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
        >
            {/* Avatar with story ring — logo perfectly centered */}
            <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 self-start sm:self-center rounded-full p-[3px] w-[88px] h-[88px] sm:w-[130px] sm:h-[130px]"
                style={{ background: "linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7)" }}
                aria-label={`${handle} on Instagram`}
            >
                <div className="w-full h-full rounded-full bg-white p-[3px] overflow-hidden">
                    {avatarError ? (
                        <div className="w-full h-full rounded-full" style={{ background: IG_GRADIENT }} />
                    ) : (
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                            <img
                                src={DEFAULT_LOGO}
                                alt={handle}
                                className="block object-contain"
                                style={{ width: "78%", height: "78%" }}
                                draggable={false}
                                onError={() => setAvatarError(true)}
                            />
                        </div>
                    )}
                </div>
            </a>

            {/* Info column */}
            <div className="flex flex-col gap-4 min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                    <h2
                        className="text-[#262626]"
                        style={{ fontSize: 20, fontWeight: 400, margin: 0, lineHeight: 1.2 }}
                    >
                        {handle}
                    </h2>
                    <div className="lg:hidden">
                        <ActionButtons profileUrl={profileUrl} profileName={profile.name} />
                    </div>
                </div>

                <div className="flex items-center gap-6 sm:gap-10">
                    {stats.map((s) => (
                        <div key={s.label} className="text-[#262626]" style={{ fontSize: 15 }}>
                            <span style={{ fontWeight: 700 }}>{s.value}</span>{" "}
                            <span style={{ fontWeight: 400 }}>{s.label}</span>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col gap-0.5 text-[#262626]" style={{ fontSize: 14, lineHeight: 1.45 }}>
                    <span style={{ fontWeight: 700 }}>{profile.name}</span>
                    <span style={{ whiteSpace: "pre-line" }}>{profile.bio}</span>
                </div>

                {/* Highlights on small screens (scroll sideways) */}
                {highlights.length > 0 && (
                    <div className="lg:hidden pt-1">
                        <HighlightsRow highlights={highlights} onOpen={setOpenIndex} size={54} scroll />
                    </div>
                )}
            </div>

            {/* Right panel (lg+): title + buttons on top, highlights below */}
            <div className="hidden lg:flex flex-1 flex-col gap-5 self-stretch justify-center border-l border-[#efefef] pl-8 ml-2">
                <div className="flex items-center justify-between">
                    <h3
                        className="text-[#262626]"
                        style={{ fontSize: 16, fontWeight: 700, margin: 0 }}
                    >
                        Highlights
                    </h3>
                    <ActionButtons profileUrl={profileUrl} profileName={profile.name} />
                </div>
                {highlights.length > 0 && (
                    <HighlightsRow highlights={highlights} onOpen={setOpenIndex} size={68} />
                )}
            </div>

            {/* Story viewer */}
            {openIndex !== null && highlights[openIndex] && (
                <StoryViewer
                    highlights={highlights}
                    startIndex={openIndex}
                    handle={handle}
                    onClose={() => setOpenIndex(null)}
                />
            )}
        </div>
    );
}

export default function InstagramSlider() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [handle, setHandle] = useState("kecbiofuel");
    const [profile, setProfile] = useState(DEFAULT_PROFILE);
    const [current, setCurrent] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const dragStart = useRef(null);
    const dragDelta = useRef(0);

    const [visibleCount, setVisibleCount] = useState(4);

    useEffect(() => {
        const calc = () => {
            const w = window.innerWidth;
            const cardW = Math.min(CARD_WIDTH, w * 0.8) + CARD_GAP;
            const count = Math.max(1, Math.floor((w - 32) / cardW));
            setVisibleCount(count);
        };
        calc();
        window.addEventListener("resize", calc);
        return () => window.removeEventListener("resize", calc);
    }, []);

    const maxIndex = Math.max(0, posts.length - visibleCount);

    useEffect(() => {
        setCurrent((c) => Math.min(c, maxIndex));
    }, [maxIndex]);

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold: 0.1 }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        const FALLBACK_POSTS = [
            { id: "fb1", img: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=600&q=80", alt: "Biogas plant", caption: "Turning agricultural waste into clean energy. 🌱 #CBG #Biofuel #KECBiofuel", likes: 1240, comments: 38, permalink: "https://www.kecbiofuel.com/" },
            { id: "fb2", img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=600&q=80", alt: "Renewable energy fields", caption: "Building a sustainable future, one CBG park at a time. 💚 #RenewableEnergy #KEC", likes: 987, comments: 24, permalink: "https://www.kecbiofuel.com/" },
            { id: "fb3", img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80", alt: "Green energy infrastructure", caption: "From concept to commissioning — end-to-end CBG solutions. ⚡ #CleanEnergy #Biogas", likes: 856, comments: 19, permalink: "https://www.kecbiofuel.com/" },
            { id: "fb4", img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&q=80", alt: "Farm to fuel", caption: "Empowering farmers while powering the grid. 🌾 #CBGPark #Sustainability", likes: 1103, comments: 31, permalink: "https://www.kecbiofuel.com/" },
            { id: "fb5", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80", alt: "Biofuel technology", caption: "Every plant we build cuts carbon and creates jobs. 🌿 #KECAgritech #Biofuel", likes: 762, comments: 14, permalink: "https://www.kecbiofuel.com/" },
            { id: "fb6", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80", alt: "Sustainable agriculture", caption: "Renewable energy, rooted in agriculture. ✦ #KECBiofuel #CBG", likes: 934, comments: 22, permalink: "https://www.kecbiofuel.com/" },
        ];

        const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";
        fetch(`${apiBase}/instagram/posts?limit=12`)
            .then((r) => r.json())
            .then((json) => {
                if (json.success && json.data?.posts?.length) {
                    setPosts(json.data.posts);
                    if (json.data.profile) {
                        setProfile((p) => ({ ...p, ...json.data.profile }));
                    }
                } else {
                    setPosts(FALLBACK_POSTS);
                }
            })
            .catch(() => setPosts(FALLBACK_POSTS))
            .finally(() => setLoading(false));

        const igHandle = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE;
        if (igHandle) setHandle(igHandle);
    }, []);

    useEffect(() => {
        if (posts.length === 0) return;
        const t = setInterval(() => setCurrent((c) => (c >= maxIndex ? 0 : c + 1)), 4000);
        return () => clearInterval(t);
    }, [maxIndex, posts.length]);

    const prev = useCallback(() => setCurrent((c) => Math.max(0, c - 1)), []);
    const next = useCallback(() => setCurrent((c) => Math.min(maxIndex, c + 1)), [maxIndex]);

    const handlePointerDown = (e) => { dragStart.current = e.clientX; dragDelta.current = 0; setIsDragging(true); };
    const handlePointerMove = (e) => { if (!isDragging) return; dragDelta.current = e.clientX - dragStart.current; };
    const handlePointerUp = () => {
        if (isDragging) {
            if (dragDelta.current < -50) next();
            else if (dragDelta.current > 50) prev();
        }
        setIsDragging(false);
        dragStart.current = null;
    };

    const displayItems = loading
        ? Array.from({ length: 6 }, (_, i) => ({ id: `sk-${i}`, _skeleton: true }))
        : posts;

    return (
        <section
            ref={ref}
            className="w-full py-16 overflow-hidden bg-gradient-to-br from-orange-100 via-yellow-50 to-green-100 transition-colors duration-300"
            style={{ fontFamily: IG_FONT }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-8">

                <ProfileHeader
                    handle={handle}
                    profile={profile}
                    postCount={loading ? null : posts.length}
                    posts={posts}
                    visible={visible}
                />

                {/* Slider */}
                <div
                    className="relative"
                    style={{ opacity: visible ? 1 : 0, transition: "opacity 0.8s ease 0.2s" }}
                >
                    <div
                        className="overflow-hidden cursor-grab active:cursor-grabbing"
                        style={{ touchAction: "pan-y" }}
                        onPointerDown={handlePointerDown}
                        onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        onPointerLeave={handlePointerUp}
                        onPointerCancel={handlePointerUp}
                    >
                        <div
                            className="flex"
                            style={{
                                gap: CARD_GAP,
                                transform: `translateX(calc(-${current} * (min(${CARD_WIDTH}px, 80vw) + ${CARD_GAP}px)))`,
                                transition: isDragging ? "none" : "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)",
                            }}
                        >
                            {displayItems.map((post) =>
                                post._skeleton ? (
                                    <SkeletonCard key={post.id} />
                                ) : (
                                    <FeedCard key={post.id} photo={post} handle={handle} logoUrl={DEFAULT_LOGO} />
                                )
                            )}
                        </div>
                    </div>

                    {!loading && posts.length > visibleCount && (
                        <>
                            <button
                                onClick={prev}
                                disabled={current === 0}
                                className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7" /></svg>
                            </button>
                            <button
                                onClick={next}
                                disabled={current >= maxIndex}
                                className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center transition-all duration-300 hover:scale-110 disabled:opacity-20 disabled:cursor-not-allowed rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.1)] bg-orange-500 border-2 border-orange-500 text-white hover:bg-white hover:text-orange-500"
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                            </button>
                        </>
                    )}
                </div>

                {!loading && posts.length > visibleCount && (
                    <div className="flex items-center justify-center gap-2 mt-8">
                        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`border-none cursor-pointer p-0 transition-all duration-300 ${current === i ? "bg-green-600" : "bg-orange-100"}`}
                                style={{
                                    width: current === i ? 24 : 6,
                                    height: 4,
                                    borderRadius: 2,
                                }}
                            />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}