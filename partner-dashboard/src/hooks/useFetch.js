import { useState, useEffect } from "react";
import { publicRequest } from "../utils/requestMethods";
import { useSelector } from "react-redux";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  // user token for auth
  const token = useSelector((state) => state.partner.currentPartner?.token);

  useEffect(() => {
    setIsFetching(true);

    const fetchData = async () => {
      try {
        const res = await publicRequest.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(res.data);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
        setIsFetching(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, isFetching, isError };
};

export default useFetch;
