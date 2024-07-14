import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import useEditAuthUser from "../hooks/useEditAuthUser";
import { useNavigate, useResolvedPath } from "react-router-dom";
import toast from "react-hot-toast";
import useGetAuthUser from "../hooks/useGetAuthUser";

export default function EditUserForm() {
  const { data: user, isSuccess: gotUser } = useGetAuthUser();
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    file.preview = URL.createObjectURL(file);
    setProfilePic(file);
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (gotUser) {
      setFname(user?.fname);
      setLname(user?.lname);
      setBio(user?.bio);
    }
  }, [user, gotUser]);

  const { mutate: edit, isPending: isEditing } = useEditAuthUser();

  function handleSubmit(e) {
    e.preventDefault();
    if (!fname) {
      setError("Enter First Name");
      return;
    }
    if (!!bio && bio.length > 30) {
      setError("Bio Can't be more than 30 characters");
      return;
    }
    const formData = new FormData();
    formData.append("fname", fname);
    formData.append("lname", lname);
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }
    formData.append("bio", bio);

    edit(formData, {
      onSuccess: (respData) => {
        console.log(respData);

        toast("User profile updated!", { duration: 10000 });
        navigate("/profile");
      },
      onError: (err) => {
        setError(err.message);
      },
    });
  }

  return (
    <div className="w-full h-full bg-secondary rounded-lg flex flex-col p-2 ">
      <h1 className="text-2xl font-bold self-center ">Edit Profile</h1>

      {gotUser && (
        <form className="flex flex-col p-2 gap-3">
          {error && <div className="text-red-400">{error}</div>}
          <input
            className="w-full bg-primary h-10 outline-none focus:shadow-lg rounded-lg p-2"
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => {
              setFname(e.target.value);
            }}
          />
          <input
            className="w-full bg-primary h-10 outline-none focus:shadow-lg rounded-lg p-2"
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => {
              setLname(e.target.value);
            }}
          />

          <textarea
            className="w-full h-32 rounded-lg bg-primary p-2 resize-none outline-none focus:shadow-lg"
            placeholder="bio"
            value={bio}
            onChange={(e) => {
              setBio(e.target.value);
            }}
          />

          <div className="flex flex-row h-40 bg-primary rounded-lg gap-3 justify-center items-center p-3">
            <img
              className="w-36 h-36 rounded-full"
              src={
                profilePic
                  ? profilePic.preview
                  : user?.files?.profilePic
                  ? user.files.profilePic
                  : null
              }
              alt=""
            />

            <div
              className="h-32 w-48 bg-secondary rounded-lg"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className=" flex justify-center items-center h-full md:hidden p-2">
                {isDragActive
                  ? "Drop Here"
                  : "Profile Picture: Click to select"}
              </div>
              <div className=" hidden md:flex md:justify-center md:items-center md:h-full md:p-2">
                {isDragActive
                  ? "Drop Here"
                  : "Profile Picture: Click or Drop to select"}
              </div>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="p-2 rounded-lg bg-button hover:bg-green-500 duration-150"
          >
            Update
          </button>
        </form>
      )}
    </div>
  );
}
