import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

// ⚠️ Tes clés
const SUPABASE_URL = "https://skwjxawyznwmmlvfepfn.supabase.co";
const SUPABASE_KEY = "sb_publishable_8t8bVf4UHqKa4yNBdcJ9Og_VrZnpDKy";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function setVisible(el, visible) {
  if (!el) return;
  el.style.display = visible ? "" : "none";
}

async function run() {
  const { data } = await supabase.auth.getSession();
  const isAuthed = !!data?.session;

  // Éléments qui dépendent de l'état de connexion
  document.querySelectorAll("[data-auth='in']").forEach(el => setVisible(el, isAuthed));
  document.querySelectorAll("[data-auth='out']").forEach(el => setVisible(el, !isAuthed));

  // Bouton/lien de déconnexion (optionnel)
  const logoutBtn = document.getElementById("btnLogout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      await supabase.auth.signOut();
      window.location.href = "login.html";
    });
  }
}

run();
