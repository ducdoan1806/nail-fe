import { useEffect, useRef, useState, ReactNode, useCallback } from "react";

interface InfiniteScrollProps {
  loadMore: () => Promise<void>;
  hasMore: boolean;
  children: ReactNode;
  loading?: ReactNode;
}

export default function InfiniteScroll({
  loadMore,
  hasMore,
  children,
  loading = "Loading...",
}: InfiniteScrollProps) {
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isFetching, setIsFetching] = useState(false);

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !isFetching) {
        setIsFetching(true);
        loadMore().finally(() => setIsFetching(false));
      }
    },
    [loadMore, hasMore, isFetching]
  );

  useEffect(() => {
    const currentLoader = loaderRef.current;
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [handleObserver]);

  return (
    <>
      {children}
      <div ref={loaderRef} className="py-4 text-center text-pink-600">
        {isFetching && loading}
      </div>
    </>
  );
}
