

fetch('http://127.0.0.1:5000/beverage')
.then(response => response.json())
.then(ingredients => {
    let rows = ingredients.map(element => createIngredientTemplate(element));
    let table = $("#beverages tbody");
    table.append(rows);
});


function createIngredientTemplate(ingredient) {
let template = $("#beverage-item-template")[0].innerHTML;
return Mustache.render(template, ingredient);
}
