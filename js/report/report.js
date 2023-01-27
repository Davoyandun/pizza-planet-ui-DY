fetch("http://127.0.0.1:5000/report/")
  .then((response) => response.json())
  .then((report) => {
    console.log(report);
    let rowsClients = report.top3_clients.map((element) =>
      createClientTemplate(element, "#clients-template")
    );
    let rowBeberage = createProductTemplate(
      report.top_beverage,
      "#beverage-template"
    );
    let rowIngredient = createProductTemplate(
      report.top_ingredient,
      "#ingredient-template"
    );
    let rowMonth = createProductTemplate(
      { month: currentMonth(report.top_month) },
      "#month-template"
    );

    let tableClients = $("#clients tbody");
    let tableBeberage = $("#beverage tbody");
    let tableIngredient = $("#ingredient tbody");
    let tableMonth = $("#month tbody");
    tableMonth.append(rowMonth);
    tableBeberage.append(rowBeberage);
    tableIngredient.append(rowIngredient);
    tableClients.append(rowsClients);
  });

/**
 * Find the template tag and populate it with the data
 * @param order
 */
function createClientTemplate(client, idTemplate) {
  let template = $(idTemplate)[0].innerHTML;
  return Mustache.render(template, client);
}
function createProductTemplate(product, idTemplate) {
  let template = $(idTemplate)[0].innerHTML;
  return Mustache.render(template, product);
}

function currentMonth(month) {
    let date = new Date();
    date.setMonth(month - 1); 
    return date.toLocaleString("en", { month: "long" })
  }
