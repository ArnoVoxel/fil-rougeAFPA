//abonnement
document.getElementById('bouton_inscription').addEventListener('click', creer_utilisateur);

/**
 * créer un nouvel utilisateur
 */
function creer_utilisateur(){
    var input_creation_value = document.getElementById('identifiant').value;
    var password_creation_value = document.getElementById('password').value;

    var input_creation_check = input_creation_value.replace(regex_connexion, "");
    var password_creation_check = password_creation_value.replace(regex_connexion, "");

    if(input_creation_check == "" || password_creation_check == ""){
        alert("Pour vous enregistrer, entrez un identifiant et un mot de passe");
    } else {
        console.log('creation');
        utilisateurs.set('3', {'nom':input_creation_check,'mdp':password_creation_check});
    }
    
    document.getElementById('identifiant').value = '';
    document.getElementById('password').value ='';
    console.log('utilisateur créé ?');
    console.log(utilisateurs);
}