import React from "react";
import useGetAuthUserParty from "../../features/Users/hooks/useGetAuthUserParty";
import Spinner from "../../ui/components/Spinner";
import CreatePartyForm from "../../features/Social/Components/CreatePartyForm";

export default function PartyPage() {
  const { data: party, isFetching: isGettingParty } = useGetAuthUserParty();

  if (isGettingParty) return <Spinner />;
  return (
    <div className="h-full w-full p-3 flex flex-col overflow-scroll disable-scrollbars">
      {party && <h1>Party</h1>}
      {!party && <CreatePartyForm />}
    </div>
  );
}
