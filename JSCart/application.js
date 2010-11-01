$(document).ready( function() {
  var inventory = $(raw_inventory);
  var prototype_item = $("#prototype_item").detach();
  var prototype_cart_item = $("#prototype_cart").detach();
  
  JSCart.build_inventory(inventory, prototype_item, prototype_cart_item);    
  
  // $('#username').load("username.html");
  
  // load JSON for footer
  // need to do this w/ webserver
  // $.getJSON('footer.json', function() {
  //   alert(created.created_by)
  // });

  // POST
  // $('form input#submit_button').click(function(event){
  //   event.preventDefault();
  //   var first_name = $('form input#first_name').text();
  //   var last_name = $('form input#last_name').text();
  //   $.post("/users/create", 
  //         { first_name: first_name, last_name: last_name },
  //         function(){alert ("It worked!");});
  // });
  
});