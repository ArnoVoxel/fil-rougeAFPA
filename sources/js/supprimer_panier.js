/**
 * supprime la ligne du panier à l'aide du bouton
 */
function supprimer_ligne_panier() {
    console.log(this.id.split(''));
    localStorage.removeItem('ligne' + this.id.split('')[6]);
    afficher_contenu_panier();
}