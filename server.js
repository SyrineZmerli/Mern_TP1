const express = require ('express') ;
const app = express () ; 
const PORT = 3000;
app.use(express.json( ) ) ;

app.get('/', (req , res) => {
res.json ({ message : " Bonjour , je suis l'API du blog " }) ;
}) ;
//
const articles = [
{ id: 1 , title : 'Bienvenue sur le blog ', author : 'Admin' } ,
{ id: 2 , title : 'Mon premier serveur Express ', author : 'Syrine' } ,
{ id: 3 , title : 'Tester une API avec Postman ', author : 'Syrine' }
];
// 
app.get('/api/articles', (req , res) => {
res.json ({ total : articles . length , articles : articles }) ;
}) ;
//
app.get('/api/articles/:id', (req , res) => {
const id = Number ( req. params .id) ; // "2" -> 2
const article = articles.find (a => a.id === id) ;
if (! article ) {
return res. status (404).json ({ error : 'Article ${id} introuvable' }) ;
}
res.json ( article ) ;
}) ;
//
app.get('/api/articles', (req , res) => {
const { author } = req. query ; 
let resultat = articles ;
if ( author ) { 
resultat = articles . filter (a => a. author === author ) ;
}
res.json ({ total: resultat.length , articles :resultat }) ;
}) ;
//
let prochainId = 4;
app.post ('/api/articles', (req , res) => {
const { title , author } = req. body ; 
if (!title || !author ) { 
return res.status(400).json({ error : "Le titre et l’auteur sont obligatoires" }) ;
}
const nouvelArticle = { id: prochainId , title : title , author : author };
prochainId = prochainId + 1;
articles.push ( nouvelArticle ) ;
res.status (201).json ({ message : 'Article créé', article : nouvelArticle }) ;
}) ;
 // EXERCICE 1
 //1
const package = require('./package.json');
app.get('/api/appInfo', (req , res) => {
    res.json ({ AppName : package.name ,
    Author  : package.author , Version : package.version }) ;
}) ;
//2
const users = [
    { id: 1, name: 'Rihab', email: 'Rihab@gmail.com' },
    { id: 2, name: 'Syrine', email: 'syrine.zmerli@polytechnicien.com' },
    { id: 3, name: 'Oumaima', email: 'oumaima@gmail.com' }
];
app.get('/api/users', (req , res) => {
    res.json ({ total : users.length , users : users }) ;
}) ;
//3
app.get('/api/users/:id', (req , res) => {
const id = Number ( req. params .id) ; 
const user = users.find (u => u.id === id) ;
if (! user ) {
return res. status (404).json ({ error : 'User ${id} not found' }) ;
}
res.json ( user ) ;
}) ;
//4
const contact = [] ; 
let idC = 1 ; 
app.post ('/api/contact', (req , res) => {
const { email , message } = req. body ; 
if (!email || !message ) { 
return res.status(400).json({ error : "L'e-mail et le message sont obligatoires" }) ;
}
const nouvelContact = { id: idC , email : email , message : message };
idC = idC + 1;
contact.push ( nouvelContact ) ;
res.status (200).json ({ message : 'Merci , votre message a bien été reçu',  }) ;
}) ;
//5
app.get('/api/users/name/:name', (req , res) => {
const { name } = req.params ; 
let resultat = users ;
if ( name ) { 
resultat = users . filter (u => u.name === name ) ;
}
res.json ({ total: resultat.length , users :resultat }) ;
}) ;

app.listen (PORT , () => {
console.log(`Serveur disponible sur http :// localhost :${ PORT }`) ;
}) ;