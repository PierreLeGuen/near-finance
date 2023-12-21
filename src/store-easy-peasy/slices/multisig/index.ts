import { confirm } from "~/store-easy-peasy/slices/multisig/thunks/change/confirm";
import { deleteRequest } from "~/store-easy-peasy/slices/multisig/thunks/change/deleteRequest";
import { listRequestIds } from '~/store-easy-peasy/slices/multisig/thunks/view/listRequestIds';
import { getRequest } from '~/store-easy-peasy/slices/multisig/thunks/view/getRequest';
import { getNumConfirmations } from '~/store-easy-peasy/slices/multisig/thunks/view/getNumConfirmations';
import { getConfirmations } from '~/store-easy-peasy/slices/multisig/thunks/view/getConfirmations';
import { getMultisigContract } from '~/store-easy-peasy/slices/multisig/thunks/getMultisigContract';
import { addRequest } from '~/store-easy-peasy/slices/multisig/thunks/change/addRequest';

export const multisig = {
  // thunks
  confirm,
  deleteRequest,
  listRequestIds,
  getRequest,
  getNumConfirmations,
  getConfirmations,
  getMultisigContract,
  addRequest,
};
