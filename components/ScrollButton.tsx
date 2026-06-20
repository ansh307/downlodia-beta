"use client";

import { useRouter, usePathname } from "next/navigation";

type Props = {
  targetId: string;
  href?: string; // optional route
  children: React.ReactNode;
  className?: string;
};

export const ScrollButton = ({
  targetId,
  href,
  children,
  className,
}: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleScroll = () => {
    // Case 1: Same route → just scroll
    if (!href || href === pathname) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
      return;
    }

    // Case 2: Different route → navigate first, then scroll
    router.push(`${href}#${targetId}`);
  };

  return (
    <button onClick={handleScroll} className={className}>
      {children}
    </button>
  );
};
