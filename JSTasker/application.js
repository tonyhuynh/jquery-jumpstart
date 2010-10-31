var JSTasker = {
  update_counter : function() {
    var task_count = $('#tasks ul li').not('li.completed').size();
    $('span#task_counter').text("(" + task_count + ")");    
  },
  sort_tasks : function() {
    var completed = $('#tasks ul li.completed');
    completed.detach();
    $('#tasks ul').append(completed);
  },
  update_page : function() {
    this.update_counter();
    this.sort_tasks();
  },
  check_all : function() {
    $('#tasks ul li').each(function() {
      $(this).addClass('completed');
    });
  },
  uncheck_all : function() {
    $('#tasks ul li.completed').each(function() {
      $(this).removeClass('completed');
    });    
  }
}


$(document).ready(function () {
  $('input#add_button').click( function(event) {
    event.preventDefault();
    
    var task_text = $('input#task_text').val();
    var list_item = $("<li>" + task_text  + "</li>");
    list_item.click( function () {
      $(this).toggleClass('completed');
      JSTasker.update_page();
    });
    
    $('#tasks ul').append(list_item);
    list_item.effect('highlight', 'slow');
    $('input#task_text').val(null);
    
    JSTasker.update_page();
  });
  
  $('a#check_all').click( function(event) {
    event.preventDefault();
    JSTasker.check_all();
  });

  $('a#uncheck_all').click( function(event) {
    event.preventDefault();
    JSTasker.uncheck_all();
  });
    
  $('input#task_text').focus();
  
  $('#tasks h2').append("<span id='task_counter'></span>");
  
  // alert($("input[name='add_button']").text());
});