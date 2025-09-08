"use client";

import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { getUserByUsername } from "@/lib/user";

const CURRENT_USERNAME = "0nF1REy";

export function UserProfile() {
  const user = getUserByUsername(CURRENT_USERNAME);

  if (!user) {
    return (
      <Link
        href="/profile/0nF1REy"
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-gray-400" />
        </div>
        <span className="hidden md:block text-sm font-medium text-gray-300">
          Usuário
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/profile/${user.id}`}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors group"
    >
      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-red-500/30 group-hover:border-red-500/60 transition-colors">
        <Image
          src={user.avatar || `https://i.pravatar.cc/300?u=${user.username}`}
          alt={`Avatar de ${user.username}`}
          fill
          className="object-cover"
          sizes="32px"
        />
      </div>
      <span className="hidden md:block text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
        {user.username}
      </span>
    </Link>
  );
}
