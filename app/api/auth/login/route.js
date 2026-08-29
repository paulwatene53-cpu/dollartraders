import { NextResponse } from "next/server";
import crypto from "crypto";

export async function GET(request) {
  try {
    const clientId = process.env.DERIV_CLIENT_ID;

    if (!clientId) {
      return NextResponse.json(
        {
          error: "DERIV_CLIENT_ID is not configured",
        },
        { status: 500 }
      );
    }

    // Your production callback URL.
    // This must exactly match the URL registered in your Deriv OAuth app.
    const redirectUri =
      process.env.DERIV_REDIRECT_URI ||
      "https://dollartraders.vercel.app/api/auth/callback";

    // Generate PKCE code verifier
    const codeVerifier = crypto
      .randomBytes(64)
      .toString("base64url");

    // Generate PKCE code challenge
    const codeChallenge = crypto
      .createHash("sha256")
      .update(codeVerifier)
      .digest("base64url");

    // Generate CSRF state
    const state = crypto
      .randomBytes(32)
      .toString("hex");

    // Deriv OAuth authorization URL
    const authUrl = new URL(
      "https://auth.deriv.com/oauth2/auth"
    );

    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", redirectUri);

    // Request only the permissions required for trading.
    authUrl.searchParams.set(
      "scope",
      "trade"
    );

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

    // Store PKCE verifier securely in an HTTP-only cookie.
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

    // Store OAuth state securely in an HTTP-only cookie.
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
  } catch (error) {
    console.error("Deriv OAuth login error:", error);

    return NextResponse.json(
      {
        error: "Unable to start Deriv login",
      },
      { status: 500 }
    );
  }
  }
