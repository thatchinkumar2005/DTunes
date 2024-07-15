import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../ui/components/Modal";
import useAuth from "../../hooks/auth/useAuth";
import usePromoteArtist from "../../features/Users/hooks/usePromoteArtist";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import ArtistConfirmPopUp from "../../features/Accounts/ArtistConfirmPopUp";

export default function AccountsPage() {
  const { auth } = useAuth();
  const [artist, setArtist] = useState();
  useEffect(() => {
    setArtist(auth?.roles.includes(2009));
  }, [auth]);

  return (
    <div className="w-full h-full overflow-scroll disable-scrollbars p-3 flex flex-col gap-4">
      <h1 className="text-2xl self-center">Accounts</h1>

      <div className="w-full h-auto bg-primary rounded-md p-3 flex flex-col">
        <h2 className="text-lg">Profile</h2>
        <div className="bg-secondary w-full grow rounded-sm flex-col flex p-3 gap-3 justify-center">
          <span className="w-full h-10 bg-primary rounded-lg flex items-center p-1">
            <Link to={"/profile/edit"} className="hover:underline">
              Edit Profile
            </Link>
          </span>
          {!artist && (
            <Modal
              ToggleElement={({ onClick }) => (
                <span
                  onClick={onClick}
                  className="w-full h-10 bg-primary rounded-lg flex items-center p-1"
                >
                  <div className="hover:underline">
                    Promote to artist Account
                  </div>
                </span>
              )}
            >
              <ArtistConfirmPopUp />
            </Modal>
          )}
        </div>
      </div>

      <div className="w-full h-auto bg-primary rounded-md p-3 flex flex-col">
        <h2 className="text-lg">Privacy and Security</h2>
        <div className="bg-secondary w-full grow rounded-sm flex-col flex p-3 gap-3 justify-center">
          <span className="w-full h-10 bg-primary rounded-lg flex items-center p-1">
            <Link className="hover:underline">Change Email</Link>
          </span>
          <span className="w-full h-10 bg-primary rounded-lg flex items-center p-1">
            <Link className="hover:underline">Change Password</Link>
          </span>
          <span className="w-full h-10 bg-primary rounded-lg flex items-center p-1">
            <Link className="hover:underline">Change Username</Link>
          </span>
          <span className="w-full h-10 bg-primary rounded-lg flex items-center p-1">
            <Link className="hover:underline">Delete Account</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
