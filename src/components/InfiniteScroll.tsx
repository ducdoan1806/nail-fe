import { useState, useEffect, useCallback } from "react";

interface InfiniteScrollProps<T> {
  fetchData: (
    page: number,
    filters?: Record<string, string | number>
  ) => Promise<T[]>;
  renderItems: (items: T[]) => JSX.Element;
  filters?: Record<string, string | number>;
}

export default function InfiniteScroll<T>({
  fetchData,
  renderItems,
  filters = {},
}: InfiniteScrollProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreItems = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    const data = await fetchData(page, filters);
    setItems((prev) => (page === 1 ? data : [...prev, ...data]));
    setHasMore(data.length > 0);
    setIsLoading(false);
  }, [page, filters, fetchData, isLoading, hasMore]);

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [filters]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  useEffect(() => {
    loadMoreItems();
  }, [page, loadMoreItems]);

  return (
    <>
      {renderItems(items)}
      {isLoading && <p>Đang tải...</p>}
    </>
  );
}
