import { useEffect, useState, ReactNode, useCallback } from "react";

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
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = useCallback(() => {
    // Check if we're at the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight &&
      hasMore &&
      !isFetching
    ) {
      setIsFetching(true);
      loadMore().finally(() => setIsFetching(false));
    }
  }, [hasMore, isFetching, loadMore]); // Include dependencies

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Now include handleScroll

  return (
    <>
      {children}
      {isFetching && (
        <div className="py-4 text-center text-pink-600">{loading}</div>
      )}
    </>
  );
}
