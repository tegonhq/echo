import { redirect } from "@remix-run/node";
import { getUserById } from "~/models/user.server";
import { authenticator } from "./auth.server";
import { getImpersonationId } from "./impersonation.server";

export async function getUserId(request: Request): Promise<string | undefined> {
  const impersonatedUserId = await getImpersonationId(request);

  if (impersonatedUserId) return impersonatedUserId;

  let authUser = await authenticator.isAuthenticated(request);
  return authUser?.userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (userId === undefined) return null;

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}

export async function logout(request: Request) {
  return redirect("/logout");
}
