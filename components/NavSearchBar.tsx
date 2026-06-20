//nbvabrsearch
"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";

type NavSearchBarProps = {
  className?: string;
};

type SearchResult = {
  id: string;
  title: string;
  image?: string | null;
  category?: {
    name?: string | null;
  } | null;
};

export default function NavSearchBar({ className = "" }: NavSearchBarProps) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cache = useRef<Record<string, SearchResult[]>>({});

  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const highlightedIndex =
    results.length > 0 ? activeIndex % results.length : 0;

  // ✅ Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // ✅ Fetch with cache + abort + no flicker
  useEffect(() => {
    const controller = new AbortController();
    let loadingTimer: NodeJS.Timeout;

    const fetchResults = async () => {
      const q = debouncedQuery.trim();

      if (q.length < 2) {
        setResults([]);
        return;
      }

      // ✅ Cache hit (instant)
      if (cache.current[q]) {
        setResults(cache.current[q]);
        return;
      }

      try {
        // delay loading to avoid flicker
        loadingTimer = setTimeout(() => setLoading(true), 150);

        const res = await fetch(
          `/api/products/search?q=${encodeURIComponent(q)}`,
          { signal: controller.signal },
        );

        const data = await res.json();

        cache.current[q] = data; // ✅ save to cache
        setResults(data);
      } catch (err: unknown) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error(err);
        }
      } finally {
        clearTimeout(loadingTimer);
        setLoading(false);
      }
    };

    fetchResults();

    return () => {
      controller.abort();
      clearTimeout(loadingTimer);
    };
  }, [debouncedQuery]);

  // ✅ Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (results.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % results.length);
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev === 0 ? results.length - 1 : prev - 1));
    }

    if (e.key === "Enter") {
      const selected = results[highlightedIndex];
      if (selected) {
        router.prefetch(`/product/${selected.id}`); // ⚡ instant nav
        router.push(`/product/${selected.id}`);
      }
      setQuery("");
      setResults([]);
      setActiveIndex(0);
    }

    if (e.key === "Escape") {
      setQuery("");
      setResults([]);
    }
  };

  // Reset index + refs
  useEffect(() => {
    itemRefs.current = [];
  }, [results]);

  // Auto scroll active item
  useEffect(() => {
    const el = itemRefs.current[highlightedIndex];
    if (el) {
      el.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [highlightedIndex]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full min-w-0 ${className}`.trim()}
    >
      <div className="group relative">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400 transition group-focus-within:text-indigo-500">
          <Search size={16} />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          aria-label="Search products"
          className="
    w-full
    rounded-2xl
    border border-slate-200
    bg-white/95
    py-3
    pl-10 sm:pl-11
    pr-12 sm:pr-24
    text-sm
    text-slate-900
    shadow-sm
    outline-none
    transition
    placeholder:text-slate-400
    focus:border-indigo-500
    focus:bg-white
    focus:ring-4
    focus:ring-indigo-500/10
  "
        />

        <div className="absolute inset-y-0 right-2 flex items-center gap-1">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Clear search"
            >
              <X size={14} />
            </button>
          )}

          <div className="flex h-8 w-8 sm:w-auto items-center justify-center rounded-full bg-slate-100 sm:px-3 text-xs font-medium text-slate-500">
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Search size={14} />
            )}
            <span className="hidden sm:inline ml-1">Search</span>
          </div>
        </div>
      </div>

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)]">
          <div className="max-h-96 overflow-y-auto py-2">
            {results.map((product, index) => (
              <div
                key={product.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => {
                  router.prefetch(`/product/${product.id}`);
                  router.push(`/product/${product.id}`);
                  setQuery("");
                  setResults([]);
                }}
                className={`flex cursor-pointer items-center gap-3 px-4 py-3 transition ${
                  index === highlightedIndex
                    ? "bg-indigo-50/80"
                    : "hover:bg-slate-50"
                }`}
              >
                <div
                  className="h-11 w-11 shrink-0 rounded-xl bg-slate-100 bg-cover bg-center ring-1 ring-slate-200"
                  aria-hidden="true"
                  style={
                    product.image
                      ? { backgroundImage: `url(${product.image})` }
                      : undefined
                  }
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-slate-900">
                    {product.title}
                  </div>
                  <div className="truncate text-xs text-slate-500">
                    {product.category?.name ?? "Digital product"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="absolute top-full mt-3 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-500 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] z-10">
          Searching...
        </div>
      )}

      {/* NO RESULTS */}
      {debouncedQuery.trim().length >= 2 &&
        !loading &&
        results.length === 0 && (
          <div className="absolute top-full mt-3 w-full rounded-2xl border border-slate-200 bg-white p-3 text-sm text-slate-500 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] z-10">
            No results found
          </div>
        )}
    </div>
  );
}
