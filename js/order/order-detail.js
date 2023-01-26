/**
 * Set the id to query the order
 */


let urlParams = new URLSearchParams(window.location.search);
let _id = urlParams.get("_id");

fetch(`http://127.0.0.1:5000/order/id/${_id}`)
  .then((response) => response.json())
  .then((order) => {
     
   order = formatOrder(order);
    let template = createRowTemplate(order);
    $("#order").append(template);
  });

/**
 * Find the template tag and populate it with the data
 * @param order
 */
function createRowTemplate(order) {
  let template = $("#order-template")[0].innerHTML;
  return Mustache.render(template, order);
}

function formatOrder(order) {
    var newOrder = {};
    newOrder._id = order._id;
    newOrder.client_address = order.client_address;
    newOrder.client_dni = order.client_dni;
    newOrder.client_name = order.client_name;
    newOrder.client_phone = order.client_phone;
    newOrder.date = order.date;
    newOrder.size = order.size;
    newOrder.total_price = order.total_price;
  
    newOrder.ingredients = [];
    newOrder.beverages = [];
  
    for (var i = 0; i < order.detail.length; i++) {
      if (order.detail[i].ingredient) {
        newOrder.ingredients.push(order.detail[i].ingredient);
      }
      if (order.detail[i].beverage) {
        newOrder.beverages.push(order.detail[i].beverage);
      }
    }
  
    return newOrder;
  }
