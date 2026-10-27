// jonathansalerno.org: serves the static site from public/ and handles one
// endpoint, POST /api/contact, which turns the contact form into an email.
//
// The email goes through Cloudflare Email Routing: it is sent from an address
// on a routing domain (era-of-prevention.com) to the verified destination
// address set in wrangler.jsonc. Nothing is stored: no database, no logs of
// the message, no IP address kept.

const FROM = { email: "modulo@era-of-prevention.com", name: "Modulo jonathansalerno.org" };
const ORIGINS = ["https://jonathansalerno.org", "https://www.jonathansalerno.org"];
const MIN_MS = 3000; // a human takes at least a few seconds to write a message

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status: status || 200,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
  });
}

function clean(v, max) {
  return typeof v === "string" ? v.replace(/\r\n?/g, "\n").trim().slice(0, max) : "";
}

async function contact(request, env) {
  const origin = request.headers.get("Origin") || "";
  if (!ORIGINS.includes(origin) && !/^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) {
    return json({ ok: false, error: "origin" }, 403);
  }
  let d;
  try {
    d = await request.json();
  } catch {
    return json({ ok: false, error: "format" }, 400);
  }
  // Spam traps: a hidden field that people never fill in, and a minimum time
  // between opening the form and sending it. Bots get a fake success.
  if (clean(d.website, 200) || !(Number(d.elapsed) >= MIN_MS)) return json({ ok: true });

  const name = clean(d.name, 100);
  const email = clean(d.email, 200);
  const message = clean(d.message, 5000);
  const page = clean(d.page, 200);
  if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)) return json({ ok: false, error: "email" }, 400);
  if (message.length < 5) return json({ ok: false, error: "message" }, 400);

  const who = name || email;
  const text =
    "Nome: " + (name || "(non indicato)") + "\n" +
    "Email: " + email + "\n" +
    "Pagina: " + (page.startsWith("/") ? "https://jonathansalerno.org" + page : "(non indicata)") + "\n\n" +
    message + "\n";
  try {
    await env.EMAIL.send({
      from: FROM,
      to: env.CONTACT_TO,
      replyTo: name ? { email, name } : email,
      subject: "[jonathansalerno.org] Messaggio da " + who,
      text,
    });
  } catch (e) {
    console.error("contact form: send failed", e && e.code, e && e.message);
    return json({ ok: false, error: "send" }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      if (request.method !== "POST") return json({ ok: false, error: "method" }, 405);
      return contact(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};
