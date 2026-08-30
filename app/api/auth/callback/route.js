import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const code = searchParams.get("code");
    const returnedState = searchParams.get("state");
    const error = searchParams.get("error");

    if (error) {
      return NextResponse.redirect(
        new URL(
          `/?error=${encodeURIComponent(error)}`,
          request.url
        )
      );
    }

    if (!code) {
      return NextResponse.redirect(
        new URL(
          "/?error=missing_authorization_code",
          request.url
        )
      );
    }

    const savedState =
      request.cookies.get("deriv_oauth_state")?.value;

    const codeVerifier =
      request.cookies.get("deriv_code_verifier")?.value;

    if (
      !savedState ||
      !returnedState ||
      savedState !== returnedState
    ) {
      return NextResponse.redirect(
        new URL(
          "/?error=invalid_oauth_state",
          request.url
        )
      );
    }

    if (!codeVerifier) {
      return NextResponse.redirect(
        new URL(
          "/?error=missing_pkce_verifier",
          request.url
        )
      );
    }

    const clientId = process.env.DERIV_CLIENT_ID;

    if (!clientId) {
      return NextResponse.redirect(
        new URL(
          "/?error=missing_client_id",
          request.url
        )
      );
    }

    const redirectUri =
      process.env.DERIV_REDIRECT_URI ||
      "https://dollartraders.vercel.app/api/auth/callback";

    const tokenResponse = await fetch(
      "https://auth.deriv.com/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          code,
          code_verifier: codeVerifier,
          redirect_uri: redirectUri,
        }).toString(),
        cache: "no-store",
      }
    );

    const tokenData = await tokenResponse.json();

    if (!tokenResponse.ok || !tokenData.access_token) {
      console.error(
        "Deriv token exchange failed:",
        tokenData
      );

      return NextResponse.redirect(
        new URL(
          "/?error=deriv_token_exchange_failed",
          request.url
        )
      );
    }

    const response = NextResponse.redirect(
      new URL("/", request.url)
    );

    response.cookies.set(
      "deriv_access_token",
      tokenData.access_token,
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: Number(
          tokenData.expires_in || 3600
        ),
      }
    );

    // Delete temporary OAuth cookies
    response.cookies.set(
      "deriv_oauth_state",
      "",
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      }
    );

    response.cookies.set(
      "deriv_code_verifier",
      "",
      {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 0,
      }
    );

    return response;
  } catch (error) {
    console.error(
      "Deriv OAuth callback error:",
      error
    );

    return NextResponse.redirect(
      new URL(
        "/?error=oauth_callback_failed",
        request.url
      )
    );
  }
        }
