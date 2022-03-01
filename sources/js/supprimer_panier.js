/**
 * supprime la ligne du panier à l'aide du bouton
 */
function supprimer_ligne_panier() {
    localStorage.removeItem('ligne' + this.id.split('')[6]);
    afficher_contenu_panier();
    bulle_bouton_panier();
}