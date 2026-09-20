(function (root) {
  "use strict";
  function prepare(email, confirmation, consent, note) {
    email = String(email || "").trim();
    confirmation = String(confirmation || "").trim();
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Enter a valid email address.");
    if (email.toLowerCase() !== confirmation.toLowerCase()) throw new Error("The email addresses must match.");
    if (!consent) throw new Error("Please confirm that you understand deletion is permanent.");
    let body = "I request deletion of my Gold Break Rush account and associated cloud data.\n\nAccount email: " + email;
    note = String(note || "").trim().slice(0, 2000);
    if (note) body += "\n\nOptional note: " + note;
    return "mailto:kamistudio.support@gmail.com?subject=" + encodeURIComponent("Gold Break Rush Account Deletion Request") + "&body=" + encodeURIComponent(body);
  }
  if (typeof module !== "undefined") module.exports = { prepare };
  if (!root.document) return;
  const form = document.getElementById("deletion-form");
  form.hidden = false;
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const status = document.getElementById("form-status");
    try {
      const link = prepare(document.getElementById("email").value, document.getElementById("confirm-email").value, document.getElementById("consent").checked, document.getElementById("note").value);
      root.location.href = link;
      status.textContent = "Your email application should open with a prepared request. Send the email to complete your request. If nothing opens, use the support address below. Nothing has been submitted by this page.";
    } catch (error) { status.textContent = error.message; }
  });
})(typeof window !== "undefined" ? window : globalThis);