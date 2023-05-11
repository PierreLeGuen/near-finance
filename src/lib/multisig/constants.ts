import BN from "bn.js";
import { parseNearAmount } from "near-api-js/lib/utils/format";

export const MULTISIG_STORAGE_KEY = "__multisigRequest";
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const MULTISIG_ALLOWANCE = new BN(parseNearAmount("1")!);
// TODO: Different gas value for different requests (can reduce gas usage dramatically)
export const MULTISIG_GAS = new BN("100000000000000");
export const MULTISIG_DEPOSIT = new BN("0");
export const MULTISIG_CHANGE_METHODS = [
  "add_request",
  "add_request_and_confirm",
  "delete_request",
  "confirm",
];
export const MULTISIG_CONFIRM_METHODS = ["confirm"];
