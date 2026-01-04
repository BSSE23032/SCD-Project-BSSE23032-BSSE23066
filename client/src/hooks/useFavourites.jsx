import { useContext, useEffect, useRef } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { useQuery } from "react-query";
import { getAllFav } from "../utils/api";

const useFavourites = () => {
  const { userDetails, setUserDetails } = useContext(UserDetailContext);
  const queryRef = useRef();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["allFavourites", userDetails?.token],
    queryFn: () => getAllFav(userDetails?.email, userDetails?.token),
    enabled: !!userDetails?.token,
    staleTime: 30000,
    onSuccess: (data) => {
      setUserDetails((prev) => ({ ...prev, favourites: data }));
    },
  });

  queryRef.current = refetch;

  useEffect(() => {
    if (queryRef.current) queryRef.current();
  }, [userDetails?.token]);

  return { data, isError, isLoading, refetch };
};

export default useFavourites;
