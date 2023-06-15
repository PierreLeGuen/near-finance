import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { getSidebarLayout } from "~/components/Layout";
import { api } from "~/lib/api";
import { type NextPageWithLayout } from "../_app";

const TeamInvitationPage: NextPageWithLayout = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  useSession({ required: true });

  const router = useRouter();
  const { id } = router.query;
  const mut = api.teams.acceptOrRejectInvitation.useMutation();

  const acceptOrRejectInvitation = async (accept: boolean) => {
    setError("");
    setSuccess("");

    if (!id || typeof id !== "string") {
      setError("Invalid invitation");
      return;
    }

    try {
      await mut.mutateAsync({
        invitationId: id,
        status: accept ? "ACCEPTED" : "REJECTED",
      });
      api.teams.getTeamsForUser.useQuery();

      setSuccess("Invitation accepted");
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      setError(error.message);
    }
  };

  return (
    <div className="prose p-3">
      <h1>Team Invitation</h1>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      <button
        onClick={() => {
          void acceptOrRejectInvitation(true);
        }}
        className="mr-3 rounded bg-green-500 px-3 py-1 text-white hover:bg-green-600"
      >
        Join
      </button>
      <button
        onClick={() => {
          void acceptOrRejectInvitation(false);
        }}
        className="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
      >
        Reject
      </button>
    </div>
  );
};

TeamInvitationPage.getLayout = getSidebarLayout;

export default TeamInvitationPage;
