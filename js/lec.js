"use strict";
// import {} of `./workingModule`
var recipets=[];
var links=document.querySelectorAll(".nav-link");
for(let i=0;i<links.length;i++){
    links[i].addEventListener("click",function(e){
       var currentMeal=e.target.text;
       getRecipes(currentMeal);
    })
}
getRecipes("pizza");
async function getRecipes(meal){
    // var httpRequest=new XMLHttpRequest();
    // httpRequest.open("GET",`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    // httpRequest.send();
    // httpRequest.addEventListener("readystatechange",function(){
    //     if(httpRequest.readyState==4&&httpRequest.status==200){
    //         recipets=JSON.parse(httpRequest.response).recipes;
    //         displayData();
    //     }
    // })
    var response=await fetch(`https://forkify-api.herokuapp.com/api/search?q=${meal}`);
    var recipe=await response.json();
    recipets= recipe.recipes;
    displayData()
}
function displayData(){
    var cols="";
    for(let i=0;i<recipets.length;i++)
    {
        cols+=`
        <div class="col-md-3">
            <div id="food">
                <img class="w-100 my-4" src="${recipets[i].image_url}" alt="">
                <h3>${recipets[i].title}</h3>
                <a target="_blank" class="btn btn-info" href="${recipets[i].source_url}">source</a>
                <a data-bs-toggle="modal" data-bs-target="#exampleModal" onclick=getDetails(${recipets[i].recipe_id}) class="btn btn-warning">details</a>
            </div>
        </div>
         `
    }
    document.getElementById("recipes").innerHTML=cols;
}
var details={};
async function getDetails(recipeDetail){
    var response=await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeDetail}`);
     details=await response.json();
    displayDetails();
}
function displayDetails(){
    var detailsRecipe=details.recipe;
    console.log(detailsRecipe)
    var data=`
        <img class="mm w-100" src="${detailsRecipe.image_url}">
        <h2>"${detailsRecipe.title}"</h2>
        <p>"${detailsRecipe.ingredients}"</p>
        }
    `
    document.getElementById("recipeData").innerHTML=data;
}
// console.log(this)
//arrow function&this

// var person=
// {
//     name:"omar",
//     age:20,
//     salary:10000,
//     calSalary:function(){
//         calDeduction=()=>(this.salary*10)/100;
//         return this.salary-calDeduction()
//     }
// }
// console.log(person.calSalary())
// //spreed operation
// var num=[10,20,30];
// function calSum(x,y,z){
//     console.log(x+y+z)
// }
// calSum(...num);

//map object
// var myMap=new Map([
//     ["name","ahmed"],
//     ["age",23],
//     ["salary",5000]
// ]);
// console.log(myMap.keys())
// for(let x of myMap.keys()){
//     console.log(x)
// }

// myMap.set("name","ola").set("age",23)

this