import type { Action, Thunk } from "easy-peasy";
import type { AccountId } from "~/store-easy-peasy/types";
import type { Store } from "~/store-easy-peasy/types";
import { ActionCreator } from "easy-peasy";

export type Account = {
  accountId: AccountId;
  publicKey: string;
  wallet: string;
};

export type StateModel = {
  selected: Account;
  list: AccountId[];
  map: Record<AccountId, Account>;
};

export type SelectAccount = Action<Accounts, AccountId>;

type AddAccountsPayload = Account[];
export type AddAccounts = Action<Accounts, AddAccountsPayload>;
export type AddAccountsFn = ActionCreator<AddAccountsPayload>;

export type LogOutFromAccounts = Action<Accounts>;

type Actions = {
  selectAccount: SelectAccount;
  addAccounts: AddAccounts;
  logOutFromAccounts: LogOutFromAccounts;
};

export type CanSignTx = Thunk<Accounts, AccountId, void, Store, boolean>;

type Thunks = {
  canSignTx: CanSignTx;
};

export type Accounts = StateModel & Actions & Thunks;
