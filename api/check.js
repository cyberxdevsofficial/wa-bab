export default async function handler(req, res) {
  const { number } = req.query;

  if (!number) {
    return res.status(400).json({ error: "Number required" });
  }

  try {
    const response = await fetch(`https://wa.me/${number}`);
    const html = await response.text();

    // WhatsApp returns this text when the number is not active
    if (html.includes("not on WhatsApp") || html.includes("phone number isn't on WhatsApp")) {
      return res.json({ status: "inactive" });
    }

    // Otherwise the number is usable on WhatsApp
    return res.json({ status: "active" });

  } catch (err) {
    return res.json({ status: "error", details: err.message });
  }
}
