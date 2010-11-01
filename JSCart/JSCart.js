JSCart = {
  build_inventory_item : function(prototype, data) {
    var item = prototype.clone();
    item.find('h3').text(data.name);
    item.find('.price').text(data.price);
    item.find('.qty').text(data.stock);
    item.attr('id', 'product_' + data.product_id);
    item = this.build_add_to_cart_action(item);
    return item;
  },
  build_cart_item : function(prototype, data) {
    var cart_item = prototype.clone();
    cart_item.find('h3').text(data.name);
    cart_item.find('.price').text(0);
    cart_item.attr('id', 'product_' + data.product_id);
    return cart_item;
  },
  product_id_in_stock : function(product_id) {
    var qty = parseInt($('#inventory #' + product_id + ' span.qty').text());
    return (qty > 0);
  },
  build_add_to_cart_action : function(item) {
    item.find('a').click( function(event) {
      event.preventDefault();

      var parent_item = $(this).parents('.item');
      var product_id = parent_item.attr('id');
      
      if (JSCart.product_id_in_stock(product_id)) {
        console.log('adding ' + parent_item.attr('id') + ' to the cart.');
        var cart_qty = $('#cart #' + product_id + ' span.qty');
        var current_qty = parseInt(cart_qty.text());
        var new_qty = current_qty + 1;
        cart_qty.text(new_qty);

        var inventory_item = $('div#inventory div#' + parent_item.attr('id'));
        var item_price = parseFloat(inventory_item.find('span.price').text());
        var subtotal = (new_qty * item_price).toFixed(2);
        var cart_price = $('#cart #' + product_id + ' span.price');
        cart_price.text(subtotal);

        JSCart.update_cart();
        JSCart.decrease_inventory(inventory_item, 1);
      }
    });
    return item;
  },
  decrease_inventory : function(item, amount) {
    var qty = item.find('.qty');
    var current_qty = parseInt(qty.text());
    var new_inventory_qty = current_qty - amount;
    if (new_inventory_qty == 0) {
      item.fadeOut('slow', function () {
        $(this).remove();
      });
    } 
    else {
      qty.text(new_inventory_qty);
    }
  },
  update_cart_item_count : function() {
    var quantities = $('#cart .qty');
    var total = 0;
    quantities.each(function () {
      total += parseInt($(this).text());
    });
    $('#cart_quantity').text(total);
  },
  update_cart_item_total : function () {
    var prices = $('#cart .price');
    var total = 0;
    prices.each(function () {
      total += parseFloat($(this).text());
    });
    $('#cart_price').text(total.toFixed(2));
  },
  update_cart : function () {
    this.update_cart_item_count();
    this.update_cart_item_total();
  },
  clear_cart : function () {
    $('#cart .qty').text('0');
    $('#cart .price').text('0.00');
    $('#cart_quantity').text('0');
    $('#cart_price').text('0.00');
  },
  build_inventory : function (inventory, prototype_item, prototype_cart_item) {
    inventory.each(function() {
      console.log('Inserting ' + this.name);

      var item = JSCart.build_inventory_item(prototype_item, this);    
      var cart_item = JSCart.build_cart_item(prototype_cart_item, this);

      $('#inventory').append(item);
      $('#cart').append(cart_item);
    });
    
    $('#clear_link').click(function(event) {
      JSCart.clear_cart();
      event.preventDefault();
    });
    
    $(document).keydown(function () {
      if (event.keyCode == '67') {
        if (confirm("Do you want to clear the cart?"))
          JSCart.clear_cart();
      };
    });
  }
}