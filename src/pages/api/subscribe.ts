export const prerender = false;

// oxlint-disable unicorn/prefer-response-static-json
interface Request {
  request: {
    json: () => Promise<{
      email: string;
      name: string;
      turnstileToken: string;
    }>;
  };
}

const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split("@");
  if (!localPart || !domain) {
    return "***";
  }
  if (localPart.length <= 2) {
    return `**@${domain}`;
  }
  return `${localPart.slice(0, 2)}***@${domain}`;
};

// oxlint-disable-next-line complexity
export const POST = async ({ request }: Request) => {
  const requestId = crypto.randomUUID();

  console.log(`[subscribe:${requestId}] Incoming subscription request`);

  const {
    LISTMONK_LIST_ID: listId,
    LISTMONK_USER: username,
    LISTMONK_PASS: password,
    LISTMONK_HOST_URL: hostUrl,
    TURNSTILE_SECRET_KEY: turnstileSecretKey,
  } = import.meta.env;

  if (!listId || !username || !password || !hostUrl || !turnstileSecretKey) {
    console.error(
      `[subscribe:${requestId}] Missing required env vars (LISTMONK_LIST_ID, LISTMONK_USER, LISTMONK_PASS, LISTMONK_HOST_URL, TURNSTILE_SECRET_KEY)`
    );
    return new Response(
      JSON.stringify({
        error: "Something went wrong! Please try again later.",
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const listIdInt = Number.parseInt(listId, 10);
  let payload: { email: string; name: string; turnstileToken: string };

  try {
    payload = await request.json();
  } catch (error) {
    console.error(`[subscribe:${requestId}] Failed to parse JSON body`, error);
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }

  const { email, name, turnstileToken } = payload;

  if (!email || !name || !turnstileToken) {
    console.warn(
      `[subscribe:${requestId}] Validation failed: missing email or name`,
      {
        emailPresent: Boolean(email),
        namePresent: Boolean(name),
        turnstileTokenPresent: Boolean(turnstileToken),
      }
    );
    return new Response(
      JSON.stringify({ error: "Email, name, and captcha token are required" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 400,
      }
    );
  }

  const turnstileVerifyUrl =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  console.log(`[subscribe:${requestId}] Verifying Turnstile token`);

  let turnstileData: { success?: boolean; ["error-codes"]?: string[] } = {};
  try {
    const turnstileResponse = await fetch(turnstileVerifyUrl, {
      body: JSON.stringify({
        response: turnstileToken,
        secret: turnstileSecretKey,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    turnstileData = await turnstileResponse.json();

    if (!turnstileResponse.ok || !turnstileData.success) {
      console.warn(`[subscribe:${requestId}] Turnstile verification failed`, {
        errorCodes: turnstileData["error-codes"] ?? [],
      });
      return new Response(
        JSON.stringify({ error: "Captcha verification failed" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    console.log(`[subscribe:${requestId}] Turnstile verification successful`);
  } catch (error) {
    console.error(
      `[subscribe:${requestId}] Error verifying Turnstile token`,
      error
    );
    return new Response(
      JSON.stringify({ error: "Captcha verification failed" }),
      {
        headers: { "Content-Type": "application/json" },
        status: 500,
      }
    );
  }

  const apiUrl = new URL("/api/subscribers", hostUrl);

  console.log(`[subscribe:${requestId}] Sending subscriber to Listmonk`, {
    email: maskEmail(email),
    endpoint: apiUrl.toString(),
    listIdInt,
  });

  let response: Response;

  try {
    response = await fetch(apiUrl, {
      body: JSON.stringify({
        email,
        lists: [listIdInt],
        name: name || email,
        preconfirm_subscriptions: true,
        status: "enabled",
      }),
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });
  } catch (error) {
    console.error(
      `[subscribe:${requestId}] Network error while calling Listmonk`,
      error
    );
    return new Response(JSON.stringify({ error: "Subscription failed" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  if (!response.ok) {
    let err: { message?: string } = {};
    try {
      err = await response.json();
    } catch {
      console.error(
        `[subscribe:${requestId}] Listmonk returned non-JSON error response`,
        { status: response.status }
      );
    }

    console.warn(`[subscribe:${requestId}] Listmonk subscription failed`, {
      email: maskEmail(email),
      message: err.message ?? "No error message returned",
      status: response.status,
    });

    // If subscriber already exists, treat as success
    if (err.message?.includes("already")) {
      console.log(
        `[subscribe:${requestId}] Subscriber already exists, treating as success`,
        { email: maskEmail(email) }
      );
      return new Response(JSON.stringify({ success: true }), {
        headers: { "Content-Type": "application/json" },
        status: 200,
      });
    }

    return new Response(JSON.stringify({ error: "Subscription failed" }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }

  console.log(`[subscribe:${requestId}] Subscription successful`, {
    email: maskEmail(email),
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { "Content-Type": "application/json" },
    status: 200,
  });
};
