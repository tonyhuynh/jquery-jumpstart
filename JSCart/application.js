$(document).ready( function() {

  var inventory = $(raw_inventory);
  
  var prototype_item = $("#prototype_item").detach();
  var prototype_cart_item = $("#prototype_cart").detach();
  
  inventory.each(function() {
    console.log('Inserting ' + this.name);
    var item = prototype_item.clone();
    item.find('h3').text(this.name);
    item.find('.price').text(this.price);
    item.find('.qty').text(this.stock);
    item.attr('id', 'product_' + this.product_id);
    
    var cart_item = prototype_cart_item.clone();
    cart_item.find('h3').text(this.name);
    cart_item.find('.price').text(0);
    cart_item.attr('id', 'product_' + this.product_id);
    
    item.find('a').click( function(event) {
      event.preventDefault();

      var parent_item = $(this).parents('.item');
      console.log('adding ' + parent_item.attr('id') + ' to the cart.');
      var cart_qty = $('#cart #' + parent_item.attr('id') + ' span.qty');
      var current_qty = parseInt(cart_qty.text());
      var new_qty = current_qty + 1;
      cart_qty.text(new_qty);
      
      var inventory_item = $('div#inventory div#' + parent_item.attr('id'));
      var item_price = parseFloat(inventory_item.find('span.price').text());
      var subtotal = (new_qty * item_price).toFixed(2);
      var cart_price = $('#cart #' + parent_item.attr('id') + ' span.price');
      cart_price.text(subtotal);
    });
    
    $('#inventory').append(item);
    $('#cart').append(cart_item);
  });
    
});

// $().load("data.js");