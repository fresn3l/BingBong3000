import Image from "next/image";

function isLocalPath(src: string) {
  return src.startsWith("/");
}

function isHttpUrl(src: string) {
  return /^https?:\/\//i.test(src);
}

/**
 * Prefer next/image for CLS + optimization; fall back for unknown remote hosts.
 */
export function SafeImage({
  src,
  alt,
  className,
  fill,
  width,
  height,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
}) {
  if (!src) return null;

  const canOptimize = isLocalPath(src) || isHttpUrl(src);

  if (canOptimize && (fill || (width && height))) {
    return (
      <Image
        src={src}
        alt={alt}
        className={className}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        sizes={sizes}
        priority={priority}
        unoptimized={isHttpUrl(src) && !src.includes("supabase")}
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={className} />;
}
