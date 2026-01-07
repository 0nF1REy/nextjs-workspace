import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT } from "jose";
import { users, addUser, getUserByUsername } from "@/lib/user/users";
import { registerSchema } from "@/lib/validations/register";
import { UserProfile } from "@/lib/user/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: "Dados de entrada inválidos",
          details: validation.error.issues,
        },
        { status: 400 }
      );
    }

    const { username, email, password } = validation.data;

    const existingUserByUsername = getUserByUsername(username);
    const existingUserByEmail = users.find((u) => u.email === email);

    if (existingUserByUsername) {
      return NextResponse.json(
        { error: "Este nome de usuário já está em uso." },
        { status: 409 }
      );
    }

    if (existingUserByEmail) {
      return NextResponse.json(
        { error: "Este e-mail já está cadastrado." },
        { status: 409 }
      );
    }

    const hashedPassword = password;

    const newUser: UserProfile = {
      id: crypto.randomUUID(),
      username,
      email,
      password: hashedPassword,
      userType: "regular",
      avatar: `https://i.pravatar.cc/150?u=${username}`,
      joinDate: new Date().toISOString().split("T")[0],
      displayName: username,
      bio: "",
      favoriteGenres: [],
    };

    addUser(newUser);

    const jwtPayload = Object.fromEntries(
      Object.entries(newUser).filter(([key]) => key !== "password")
    );

    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
    const alg = "HS256";

    const token = await new SignJWT(jwtPayload)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 2,
      path: "/",
    });

    return NextResponse.json(jwtPayload, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Ocorreu um erro inesperado no servidor." },
      { status: 500 }
    );
  }
}
