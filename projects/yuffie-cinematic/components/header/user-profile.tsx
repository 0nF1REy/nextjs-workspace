"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/hooks/useAuth";
import { getUserById } from "@/lib/user/users";

export function UserProfile() {
  const { user: authUser, logout, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || !authUser) {
    return (
      <Link
        href="/auth/login"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-400" />
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-300">
          Login
        </span>
      </Link>
    );
  }

  if (isAdmin) {
    return null;
  }

  let userToDisplay = getUserById(authUser.id);
  if (!userToDisplay) {
    userToDisplay = authUser;
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/profile/${userToDisplay.username}`}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors group"
      >
        <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-red-500/30 group-hover:border-red-500/60 transition-colors">
          <Image
            src={
              userToDisplay.avatar ||
              `https://i.pravatar.cc/300?u=${userToDisplay.username}`
            }
            alt={`Avatar de ${userToDisplay.username}`}
            fill
            className="object-cover"
            sizes="32px"
          />
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
          {userToDisplay.username}
        </span>
      </Link>

      <button
        onClick={logout}
        className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-400 hover:text-red-400 cursor-pointer"
        title="Sair"
      >
        <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
      </button>
    </div>
  );
}
