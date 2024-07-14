import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../ui/components/Modal";
import useAuth from "../../hooks/auth/useAuth";
import usePromoteArtist from "../../features/Users/hooks/usePromoteArtist";
import toast from "react-hot-toast";

export default function AccountsPage() {
  const [openPromoteModal, setOpenPromoteModal] = useState(false);
  const { auth } = useAuth();
  const [artist, setArtist] = useState();
  const { promote, isPromoting } = usePromoteArtist();

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
              setOpen={setOpenPromoteModal}
              isOpen={openPromoteModal}
            >
              <div className="h-32 w-full flex flex-col justify-center items-center gap-3">
                <div className="text-lg">Do you want to become an artist?</div>
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => {
                      setOpenPromoteModal(false);
                      promote(null, {
                        onSuccess: (data) => {
                          toast("Promoted to an artist account!", {
                            duration: 10000,
                          });
                        },
                        onError: (err) => {
                          toast(err.message, {
                            duration: 10000,
                          });
                        },
                      });
                    }}
                    disabled={isPromoting}
                    className="w-20 bg-primary p-2 rounded-lg hover:underline"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setOpenPromoteModal(false);
                    }}
                    className="w-20 bg-primary p-2 rounded-lg hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </div>
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
