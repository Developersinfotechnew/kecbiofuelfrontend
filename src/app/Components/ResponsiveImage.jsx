// Desktop / mobile image pair. Shows `mobileSrc` below `breakpoint` px when it
// exists, otherwise falls back to `src`. Uses a plain <picture> so admin
// uploads work without configuring next/image remote domains.
export default function ResponsiveImage({
  src,
  mobileSrc,
  alt = "",
  className = "",
  breakpoint = 768,
  loading = "lazy",
}) {
  if (!src && !mobileSrc) return null;
  return (
    <picture className="contents">
      {mobileSrc && <source media={`(max-width: ${breakpoint - 1}px)`} srcSet={mobileSrc} />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src || mobileSrc} alt={alt} className={className} loading={loading} />
    </picture>
  );
}
