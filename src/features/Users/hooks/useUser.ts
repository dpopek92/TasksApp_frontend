import { useMutation } from "@tanstack/react-query";
import { TAppState } from "common/store";
import { authActions } from "common/store/actions/auth";
import { useAppDispatch, useAppSelector } from "common/store/hooks";
import { usersApi } from "features/Users/api/users.api";
import { useLocation, useNavigate } from "react-router";

const useUser = () => {
  const user = useAppSelector((state: TAppState) => state.auth.user);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { mutate: getMe } = useMutation({
    mutationKey: ["get-me"],
    mutationFn: () => usersApi.getMe(),
    onSuccess: async (res) => {
      if (res) dispatch(authActions.userLoaded(res.data));
    },
    onError: () => {
      if (!location.pathname.includes("auth")) navigate("/auth/login");
    },
  });

  const refetchUser = getMe;
  const userId = user?._id;

  return { user, userId, refetchUser };
};

export default useUser;
