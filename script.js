// =====================================
// BOUCHERIE CHARMAT
// SCRIPT PRINCIPAL
// =====================================

const telephone = "243897457097";

let panier = [];


// =====================================
// 1. AJOUTER UN PRODUIT AU PANIER
// =====================================

document.addEventListener("click", function(event) {

    const bouton = event.target.closest(".ajouter-panier");

    if (!bouton) return;

    const produit = bouton.closest(".produit");

    if (!produit) return;

    const nom = produit.querySelector("h3").textContent.trim();

    const choix = produit.querySelector("select");
    const quantite = produit.querySelector('input[type="number"]');

    if (!quantite || Number(quantite.value) <= 0) {
        alert("Veuillez entrer une quantité valide.");
        return;
    }

    const nombre = Number(quantite.value);

    let prix;
    let format = "";
    let unite = "kg";

    if (choix) {

        prix = Number(choix.value);

        format = choix.options[choix.selectedIndex].text;

    } else {

        prix = Number(produit.dataset.prix);

    }

    if (nom.toLowerCase() === "poulet") {
        unite = "lots";
    }

    if (!Number.isFinite(prix) || prix <= 0) {
        alert("Prix du produit introuvable.");
        return;
    }

    panier.push({

        nom: nom,
        prix: prix,
        quantite: nombre,
        format: format,
        unite: unite,
        total: prix * nombre

    });

    afficherPanier();

    alert(nom + " ajouté au panier !");

});


// =====================================
// 2. AFFICHER LE PANIER
// =====================================

function afficherPanier() {

    const liste = document.getElementById("liste-panier");

    const totalElement = document.getElementById("total-panier");

    liste.innerHTML = "";

    if (panier.length === 0) {

        liste.innerHTML = "<p>Votre panier est vide.</p>";

        totalElement.textContent = "0 FC";

        return;
    }

    let totalGeneral = 0;

    panier.forEach(function(produit, index) {

        const ligne = document.createElement("p");

        ligne.textContent =
            produit.nom + " - " +
            produit.quantite + " " + produit.unite +
            (produit.format ? " (" + produit.format + ")" : "") +
            " = " +
            produit.total.toLocaleString("fr-FR") + " FC ";

        const boutonSupprimer = document.createElement("button");

        boutonSupprimer.textContent = "Supprimer";

        boutonSupprimer.type = "button";

        boutonSupprimer.addEventListener("click", function() {

            panier.splice(index, 1);

            afficherPanier();

        });

        ligne.appendChild(boutonSupprimer);

        liste.appendChild(ligne);

        totalGeneral += produit.total;

    });

    totalElement.textContent =
        totalGeneral.toLocaleString("fr-FR") + " FC";

}


// =====================================
// 3. VIDER LE PANIER
// =====================================

document.getElementById("vider-panier").addEventListener("click", function() {

    panier = [];

    afficherPanier();

});


// =====================================
// 4. COMMANDER SUR WHATSAPP
// =====================================

document.getElementById("commander-panier").addEventListener("click", function() {

    if (panier.length === 0) {

        alert("Votre panier est vide !");

        return;
    }

    let message = "Bonjour Boucherie Charmat !\n\n";

    message += "Voici ma commande :\n\n";

    let totalGeneral = 0;

    panier.forEach(function(produit) {

        message += produit.nom + "\n";

        message += "Quantité : " +
            produit.quantite + " " + produit.unite + "\n";

        if (produit.format) {

            message += "Format : " + produit.format + "\n";

        }

        message += "Prix : " +
            produit.total.toLocaleString("fr-FR") + " FC\n\n";

        totalGeneral += produit.total;

    });

    message += "TOTAL À PAYER : " +
        totalGeneral.toLocaleString("fr-FR") + " FC";

    const lien = "https://wa.me/" + telephone +
        "?text=" + encodeURIComponent(message);

    window.open(lien, "_blank");

});


// =====================================
// 5. AFFICHAGE INITIAL
// =====================================

afficherPanier();