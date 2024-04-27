import { useMutation } from "react-query";
import { opsPutRequest } from "../../../lib/api";

const putUser = async (defaultTable: any) => {
  try {
    const response = opsPutRequest("/user", { defaultTable });

    return response;
  } catch (err) {
    return err;
  }
};

export const useSetDefaultTableMutation = () => {
  return useMutation({
    mutationFn: putUser,
  });
};
