import { useState } from "react";
import axios from "../api/axios.js";

const useInfiniteScroll = path => {
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async () => {
    axios
      .get(`${path}?page=${page}`)
      .then(response => {
        setdata([...data, ...response.data.results]);
        if (response.data.results.length === 0) {
          setHasMore(false);
        }
        setPage(pre => pre + 1);
      })
      .catch(err => {
        console.error(err);
        setHasMore(false);
      });
  };

  return [data, hasMore, fetchData];
};

export default useInfiniteScroll;
