import { type PublicKey } from "near-api-js/lib/utils";
import { useStoreState, useStoreActions } from "easy-peasy";
// import { useWalletSelector } from "~/context/wallet";
import AccountingSection from "./AccountingSection";
import ApprovalSection from "./ApprovalSection";
import PaymentsSection from "./PaymentsSection";
import TeamsMenu from "./TeamsMenu";
import TreasurySection from "./TreasurySection";
import { CurrentNetwork } from "~/components/Sidebar/CurrentNetwork";
import { WebThreeConnected } from "~/components/Sidebar/WebThreeConnected";
import { SelectAccount } from "~/components/Sidebar/SelectAccount/SelectAccount";
import { WalletModal } from "~/components/Sidebar/WalletModal/WalletModal";
import { Button } from "~/components/ui/button";

const Sidebar = ({ publicKey }: { publicKey: PublicKey | null }) => {
  const selectedAccount = useStoreState((state: any) => state.selectedAccount);
  const openWalletModal = useStoreActions(
    (actions: any) => actions.walletsConnector.modal.open,
  );
  // const { modal } = useWalletSelector();

  // const handleSignIn = () => {
  //   modal.show();
  // };

  return (
    <div className="sticky top-0 flex h-screen w-64 min-w-fit flex-col border-r-2">
      <TeamsMenu />
      <div className="flex h-screen flex-col px-3 pb-3">
        <TreasurySection />
        <PaymentsSection />
        <ApprovalSection />
        <AccountingSection />
        <div className="flex-grow"></div>
        <div className="flex flex-col gap-1">
          {selectedAccount ? (
            <SelectAccount openWalletModal={openWalletModal} />
          ) : (
            <Button onClick={openWalletModal}>Connect Account</Button>
          )}
          <WalletModal />
          <CurrentNetwork />
          <WebThreeConnected publicKey={publicKey} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

{
  /*{publicKey && (*/
}
{
  /*  <button*/
}
{
  /*    className={`*/
}
{
  /*      mb-2 */
}
{
  /*      inline-flex */
}
{
  /*      justify-center */
}
{
  /*      rounded-md */
}
{
  /*      border */
}
{
  /*      border-transparent */
}
{
  /*      bg-blue-100 */
}
{
  /*      px-4 */
}
{
  /*      py-2 */
}
{
  /*      text-sm */
}
{
  /*      font-medium */
}
{
  /*      text-blue-900 */
}
{
  /*      hover:bg-blue-200 */
}
{
  /*      focus:outline-none */
}
{
  /*      focus-visible:ring-2 */
}
{
  /*      focus-visible:ring-blue-500 */
}
{
  /*      focus-visible:ring-offset-2`}*/
}
{
  /*    onClick={handleSignIn}*/
}
{
  /*  >*/
}
{
  /*    Ⓝ {publicKey.toString().slice(0, 20)}...*/
}
{
  /*  </button>*/
}
{
  /*)}*/
}
{
  /*{!publicKey && (*/
}
{
  /*  <button*/
}
{
  /*    className={`*/
}
{
  /*      mb-2 */
}
{
  /*      inline-flex */
}
{
  /*      justify-center */
}
{
  /*      rounded-md */
}
{
  /*      border */
}
{
  /*      border-transparent */
}
{
  /*      bg-blue-100 */
}
{
  /*      px-4 */
}
{
  /*      py-2 */
}
{
  /*      text-sm */
}
{
  /*      font-medium */
}
{
  /*      text-blue-900 */
}
{
  /*      hover:bg-blue-200 */
}
{
  /*      focus:outline-none */
}
{
  /*      focus-visible:ring-2 */
}
{
  /*      focus-visible:ring-blue-500 */
}
{
  /*      focus-visible:ring-offset-2`}*/
}
{
  /*    onClick={handleSignIn}*/
}
{
  /*  >*/
}
{
  /*    Ⓝ Sign In*/
}
{
  /*  </button>*/
}
{
  /*)}*/
}
