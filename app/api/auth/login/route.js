import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET() {
  const clientId = process.env.DERIV_CLIENT_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "DERIV_CLIENT_ID is not configured" },
      { status: 500 }
    );
  }

  const redirectUri =
    process.env.DERIV_REDIRECT_URI ||
    "https://dollartraders.vercel.app/api/auth/callback";

  // Generate PKCE verifier
  const codeVerifier = crypto
    .randomBytes(64)
    .toString("base64url");

  // Generate PKCE challenge
  const codeChallenge = crypto
    .createHash("sha256")
    .update(codeVerifier)
    .digest("base64url");

  // Generate OAuth state
  const state = crypto
    .randomBytes(32)
    .toString("hex");

  const authUrl = new URL(
    "https://auth.deriv.com/oauth2/auth"
  );

  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("scope", "trade");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set(
    "code_challenge",
    codeChallenge
  );
  authUrl.searchParams.set(
    "code_challenge_method",
    "S256"
  );

  const response = NextResponse.redirect(
    authUrl.toString()
  );

  response.cookies.set(
    "deriv_code_verifier",
    codeVerifier,
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    }
  );

  response.cookies.set(
    "deriv_oauth_state",
    state,
    {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    }
  );

  return response;
      }
