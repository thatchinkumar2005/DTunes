import React from "react";
import { Link } from "react-router-dom";

export default function AccountsPage() {
  return (
    <div className="w-full h-full overflow-scroll disable-scrollbars p-3 flex flex-col gap-4">
      <h1 className="text-2xl self-center">Accounts</h1>

      <div className="w-full h-48 bg-primary rounded-md p-3 flex flex-col">
        <h2 className="text-lg">Profile</h2>
        <div className="bg-secondary w-full grow rounded-sm flex-col flex p-3 gap-3 justify-center">
          <span className="w-full h-10 bg-primary rounded-lg flex items-center p-1">
            <Link to={"/profile/edit"} className="hover:underline">
              Edit Profile
            </Link>
          </span>
          <span className="w-full h-10 bg-primary rounded-lg flex items-center p-1">
            <Link className="hover:underline">Promote to artist Account</Link>
          </span>
        </div>
      </div>

      <div className="w-full h-72 bg-primary rounded-md p-3 flex flex-col">
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
