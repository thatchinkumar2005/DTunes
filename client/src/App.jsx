import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./ui/layout/publicLayout";
import LoginPage from "./pages/authentication/LoginPage";
import NotFoundPage from "./pages/UX/NotFoundPage";
import PrivateLayout from "./ui/layout/privateLayout";
import HomePage from "./pages/UX/HomePage";
import GoogleOauthCallBackPage from "./pages/authentication/GoogleOauthCallBackPage";
import UauthorisedPage from "./pages/UX/UauthorisedPage";
import RequireAuth from "./features/authentication/components/RequireAuth";
import RegisterPage from "./pages/authentication/RegisterPage";
import SongPage from "./pages/Songs/SongPage";
import AlbumPage from "./pages/Albums/AlbumPage";
import PlaylistPage from "./pages/Playlists/PlaylistPage";
import UserPage from "./pages/Users/UserPage";
import CreateAlbumPage from "./pages/Albums/CreateAlbumPage";
import PersistLogin from "./features/authentication/components/PersistLogin";
import CreateSongPage from "./pages/Songs/CreateSongPage";
import CreatePlaylistPage from "./pages/Playlists/CreatePlaylistPage";
import AuthUserPage from "./pages/Users/AuthUser/AuthUserPage";
import Logout from "./pages/authentication/Logout";
import SearchPage from "./pages/Search/SearchPage";
import RequestsPage from "./pages/Social/RequestsPage";
import SocialPage from "./pages/Social/SocialPage";
import PartyPage from "./pages/Social/PartyPage";
import AccountsPage from "./pages/Accounts/AccountsPage";
import EditUserPage from "./pages/Users/AuthUser/EditUserPage";
import LibraryPage from "./pages/Playlists/LibraryPage";
import UserAnalyticsPage from "./pages/Users/AuthUser/UserAnalyticsPage";
import DauthOauthCallBackPage from "./pages/authentication/DauthOauthCallBackPage";

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route
          path="/auth/oauth/google/callback"
          element={<GoogleOauthCallBackPage />}
        />
        <Route
          path="/auth/oauth/dauth/callback"
          element={<DauthOauthCallBackPage />}
        />
      </Route>
      <Route element={<PersistLogin />}>
        <Route element={<PrivateLayout />}>
          <Route element={<RequireAuth allowedRoles={[2009]} />}>
            <Route path="/album/create" element={<CreateAlbumPage />} />
            <Route path="/song/create/:albumId" element={<CreateSongPage />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[2005, 2009]} />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/song/:id" element={<SongPage />} />

            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/playlist/create" element={<CreatePlaylistPage />} />
            <Route path="/playlist/:id" element={<PlaylistPage />} />
            <Route path="/profile" element={<AuthUserPage />} />
            <Route path="/social" element={<SocialPage />} />
            <Route path="/stats" element={<UserAnalyticsPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/party" element={<PartyPage />} />
            <Route path="/profile/edit" element={<EditUserPage />} />
            <Route path="/user/:id" element={<UserPage />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/accounts" element={<AccountsPage />} />
            <Route path="/auth/logout" element={<Logout />} />
            <Route path="/unauthorized" element={<UauthorisedPage />} />
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
