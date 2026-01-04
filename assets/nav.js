// --- Supabase global (utilisé par profile.js) ---

const SUPABASE_URL = "https://skwjxawyzwnmllvfepfn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_8t8bVf4OHq4yNBdcJ90g_VrZnpDky";

// Supabase est déjà exposé par le CDN dans login.html / confirm.html
window.supabase = window.supabase || supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

// ---------------- NAV / AUTH ----------------

function setVisible(el, visible) {
  if (!el) return;
  el.style.display = visible ? "" : "none";
}

async function logout(e) {
  if (e) e.preventDefault();
  await window.supabase.auth.signOut();
  window.location.href = "login.html";
}

async function run() {
  const { data } = await window.supabase.auth.getSession();
  const isAuthed = !!data.session;

  document.querySelectorAll("[data-auth='in']")
    .forEach(el => setVisible(el, isAuthed));

  document.querySelectorAll("[data-auth='out']")
    .forEach(el => setVisible(el, !isAuthed));

  const btnLogout = document.getElementById("btnLogout");
  const linkLogout = document.getElementById("linkLogout");

  if (btnLogout) btnLogout.addEventListener("click", logout);
  if (linkLogout) linkLogout.addEventListener("click", logout);
}

run();
