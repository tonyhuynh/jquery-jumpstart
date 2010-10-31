function update_counter() {
  var task_count = $('#tasks ul li').not('li.completed').size();
  $('span#task_counter').text("(" + task_count + ")");
}

function sort_tasks() {
  // find all the completed tasks
  // pull them out of the list
  // append them back to the list
  // $('#tasks ul li.completed').each(function() {
  //   var completed_task = $(this).detach();
  //   $('#tasks ul').append(completed_task);
  // });
  
  var completed = $('#tasks ul li.completed');
  completed.detach();
  $('#tasks ul').append(completed);
}

$(document).ready(function () {
  $('input#add_button').click( function(event) {
    event.preventDefault();
    
    var task_text = $('input#task_text').val();
    
    var list_item = $("<li>" + task_text  + "</li>");
    list_item.click( function () {
      $(this).toggleClass('completed');
      update_counter();
      sort_tasks();
    });
    
    $('#tasks ul').append(list_item);
    $('input#task_text').val(null);
    
    update_counter();
  });
  
  $('input#task_text').focus();
  
  $('#tasks h2').append("<span id='task_counter'></span>");
  
  // alert($("input[name='add_button']").text());
});