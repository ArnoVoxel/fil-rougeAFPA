//déclaration
const select_nombre = document.querySelector('.nombre_bd');
const select_category = document.querySelector('.category');

select_nombre.addEventListener('change', affichage_elements_category);
select_category.addEventListener('change', affichage_contenu_category);

/**
 * afficher le nombre d'éléments avec le select
 */
function affichage_elements_category(e) {
    afficher_BD_random(JSON.parse(sessionStorage.getItem('last')), e.target.value);
}

function affichage_contenu_category(e) {
    afficher_BD_random(JSON.parse(sessionStorage.getItem(e.target.value)), 4);
}