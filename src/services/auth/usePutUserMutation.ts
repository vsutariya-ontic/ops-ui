import { useMutation } from "react-query";
import { opsPutRequest } from "../../lib/api";

const putUser = async (user: any) => {
  try {
    const response = await opsPutRequest("/user", user);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const usePutUserMutation = () => {
  return useMutation({
    mutationFn: (user: any) => putUser(user),
  });
};
