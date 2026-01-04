import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

const SUPABASE_URL = "https://skwjxawyznwmmlvfepfn.supabase.co";
const SUPABASE_KEY = "sb_publishable_8t8bVf4UHqKa4yNBdcJ9Og_VrZnpDKy";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function setVisible(el, visible) {
  if (!el) return;
  el.style.display = visible ? "" : "none";
}

async function logout(e) {
  if (e) e.preventDefault();
  await supabase.auth.signOut();
  window.location.href = "login.html";
}

async function run() {
  const { data } = await supabase.auth.getSession();
  const isAuthed = !!data?.session;

  // Elements visibles seulement si connecté / non connecté
  document.querySelectorAll('[data-auth="in"]').forEach((el) => setVisible(el, isAuthed));
  document.querySelectorAll('[data-auth="out"]').forEach((el) => setVisible(el, !isAuthed));

  // Hooks logout (bouton principal + lien nav)
  const btnLogout = document.getElementById("btnLogout");
  const linkLogout = document.getElementById("linkLogout");

  if (btnLogout) btnLogout.addEventListener("click", logout);
  if (linkLogout) linkLogout.addEventListener("click", logout);
}

run();
