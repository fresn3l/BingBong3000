"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { AnalyticsEvents, trackEvent } from "@/lib/analytics";

type LinkProps = ComponentProps<typeof Link>;

export function TrackedLink({
  event,
  eventProps,
  onClick,
  ...props
}: LinkProps & {
  event: string;
  eventProps?: Record<string, string | number | boolean>;
}) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        trackEvent(event, eventProps);
        onClick?.(e);
      }}
    />
  );
}

export function HireMeLink({
  href = "/contact",
  location,
  className,
  children = "Hire me",
}: {
  href?: string;
  location: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <TrackedLink
      href={href}
      className={className}
      event={AnalyticsEvents.hireMeClick}
      eventProps={{ location, href }}
    >
      {children}
    </TrackedLink>
  );
}
