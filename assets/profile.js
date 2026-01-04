// assets/profile.js

document.addEventListener("DOMContentLoaded", async () => {
  const status = document.getElementById("status");

  const showStatus = (msg, isError = false) => {
    if (!status) return;
    status.textContent = msg;
    status.className = isError ? "error" : "";
  };

  // --- Vérif Supabase ---
  if (!window.supabase) {
    showStatus("Erreur : Supabase n’est pas initialisé (nav.js).", true);
    return;
  }

  const supabase = window.supabase;

  // --- Charger l'utilisateur ---
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) {
    showStatus("Utilisateur non connecté.", true);
    return;
  }

  // --- Affichage profil ---
  document.getElementById("profile-email").textContent = user.email || "—";

  const pseudo =
    user.user_metadata?.pseudo ||
    user.user_metadata?.username ||
    "—";

  document.getElementById("profile-pseudo").textContent = pseudo;
  document.getElementById("newPseudo").value = pseudo !== "—" ? pseudo : "";

  // --- Bouton pseudo ---
  document.getElementById("btnSavePseudo").addEventListener("click", async () => {
    const newPseudo = document.getElementById("newPseudo").value.trim();
    if (!newPseudo) {
      showStatus("Entre un pseudo.", true);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      data: { pseudo: newPseudo }
    });

    if (error) {
      showStatus(error.message, true);
    } else {
      document.getElementById("profile-pseudo").textContent = newPseudo;
      showStatus("Pseudo enregistré.");
    }
  });

  // --- Bouton email ---
  document.getElementById("btnChangeEmail").addEventListener("click", async () => {
    const newEmail = document.getElementById("newEmail").value.trim();
    if (!newEmail) {
      showStatus("Entre un nouvel email.", true);
      return;
    }

    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      showStatus(error.message, true);
    } else {
      document.getElementById("email-pending-box").style.display = "block";
      showStatus("Confirmation envoyée sur l’ancien ET le nouvel email.");
    }
  });

  // --- Bouton mot de passe ---
  document.getElementById("btnChangePassword").addEventListener("click", async () => {
    const p1 = document.getElementById("newPassword").value;
    const p2 = document.getElementById("confirmPassword").value;

    if (!p1 || !p2) {
      showStatus("Remplis les deux champs.", true);
      return;
    }
    if (p1 !== p2) {
      showStatus("Les mots de passe ne correspondent pas.", true);
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: p1 });
    if (error) {
      showStatus(error.message, true);
    } else {
      showStatus("Mot de passe mis à jour.");
      document.getElementById("newPassword").value = "";
      document.getElementById("confirmPassword").value = "";
    }
  });
});
