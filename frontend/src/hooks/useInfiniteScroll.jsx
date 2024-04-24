import { useCallback, useEffect, useRef, useState } from 'react';
import axios from '../api/axios';

const useInfiniteScroll = (path, query) => {
  const [loading, setLoading] = useState(false);
  const [flag, setFlag] = useState(true);
  const [page, setPage] = useState(0);
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();
  const lastComponentRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) setPage(pre => pre + 1);
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setData([]);
    setPage(0);
    setHasMore(true);
    setFlag(pre => !pre);
  }, [query]);

  useEffect(() => {
    if (loading) return;
    setLoading(true);
    axios
      .get(`${path}?page=${page}&${query}`)
      .then(res => {
        setData(pre => [...pre, ...res.data.results]);
        setLoading(false);
        if (res.data.results.length === 0) setHasMore(false);
      })
      .catch(err => {
        console.error(err);
        setHasMore(false);
        setLoading(false);
      });
  }, [flag, page]);

  return [loading, data, lastComponentRef];
};

export default useInfiniteScroll;
