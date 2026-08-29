import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams, origin } = new URL(request.url);

    // Check for an OAuth error returned by Deriv
    const oauthError = searchParams.get("error");

    if (oauthError) {
      const description =
        searchParams.get("error_description") || "Deriv login was cancelled.";

      return new NextResponse(
        `<html>
          <head>
            <title>Deriv Login Error</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body style="font-family:Arial,sans-serif;padding:40px;text-align:center">
            <h2>Deriv Login Failed</h2>
            <p>${description}</p>
            <a href="/">Return to DollarTraders</a>
          </body>
        </html>`,
        {
          status: 400,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );
    }

    // Get authorization code and state from Deriv
    const code = searchParams.get("code");
    const returnedState = searchParams.get("state");

    if (!code) {
      return new NextResponse(
        `<html>
          <head>
            <title>Login Error</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body style="font-family:Arial,sans-serif;padding:40px;text-align:center">
            <h2>Authorization Code Missing</h2>
            <p>Deriv did not return an authorization code.</p>
            <a href="/">Return to DollarTraders</a>
          </body>
        </html>`,
        {
          status: 400,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );
    }

    // Read credentials from Vercel environment variables
    const clientId = process.env.DERIV_CLIENT_ID;

    const redirectUri =
      process.env.DERIV_REDIRECT_URI ||
      `${origin}/api/auth/callback`;

    if (!clientId) {
      return new NextResponse(
        "Server configuration error: DERIV_CLIENT_ID is missing.",
        { status: 500 }
      );
    }

    // Read PKCE values saved by the login route
    const cookieHeader = request.headers.get("cookie") || "";

    const getCookie = (name) => {
      const match = cookieHeader.match(
        new RegExp(
          "(?:^|; )" +
            name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") +
            "=([^;]*)"
        )
      );

      return match ? decodeURIComponent(match[1]) : null;
    };

    const savedState = getCookie("oauth_state");
    const codeVerifier = getCookie("pkce_code_verifier");

    // Verify OAuth state
    if (!savedState || !returnedState || savedState !== returnedState) {
      return new NextResponse(
        `<html>
          <head>
            <title>Security Error</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body style="font-family:Arial,sans-serif;padding:40px;text-align:center">
            <h2>Security Verification Failed</h2>
            <p>The OAuth state could not be verified.</p>
            <a href="/">Return to DollarTraders</a>
          </body>
        </html>`,
        {
          status: 403,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );
    }

    if (!codeVerifier) {
      return new NextResponse(
        "PKCE code verifier is missing. Please start the Deriv login again.",
        { status: 400 }
      );
    }

    // Exchange authorization code for Deriv access token
    const tokenResponse = await fetch(
      "https://auth.deriv.com/oauth2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
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
      console.error("Deriv token exchange failed:", tokenData);

      return new NextResponse(
        `<html>
          <head>
            <title>Deriv Connection Error</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </head>
          <body style="font-family:Arial,sans-serif;padding:40px;text-align:center">
            <h2>Could Not Connect to Deriv</h2>
            <p>Deriv did not provide an access token.</p>
            <a href="/">Try Again</a>
          </body>
        </html>`,
        {
          status: 400,
          headers: {
            "Content-Type": "text/html; charset=utf-8",
          },
        }
      );
    }

    // Send the user back to the dashboard
    const response = NextResponse.redirect(
      new URL("/", request.url)
    );

    // Store the short-lived access token securely
    response.cookies.set("deriv_access_token", tokenData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: tokenData.expires_in || 3600,
    });

    // Remove temporary OAuth cookies
    response.cookies.set("oauth_state", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    response.cookies.set("pkce_code_verifier", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);

    return new NextResponse(
      `<html>
        <head>
          <title>Connection Error</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body style="font-family:Arial,sans-serif;padding:40px;text-align:center">
          <h2>Connection Error</h2>
          <p>Something went wrong while connecting to Deriv.</p>
          <a href="/">Return to DollarTraders</a>
        </body>
      </html>`,
      {
        status: 500,
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      }
    );
  }
  }
