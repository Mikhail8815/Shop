import { type User } from "firebase/auth";

export type AuthUser = User | null;
export type AuthError = { message: string } | null;