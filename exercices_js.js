const produits = [
  { nom: "Clavier", prix: 45 },
  { nom: "Ecran", prix: 320 },
  { nom: "Souris", prix: 25 },
];

//1 
const { nom , prix  } = produits[0]; 
console.log(nom, prix);
//2 
const souris = produits.find(produit => produit.nom === "Souris");
console.log( souris.prix);
//3
const produitsMoins100 = produits.filter(produit => produit.prix < 100);
console.log(produitsMoins100);
//4
const Remise = prix => prix - (prix * 10 / 100);
console.log(Remise(320));