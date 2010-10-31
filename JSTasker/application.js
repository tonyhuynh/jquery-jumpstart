var JSTasker = {
  update_counter : function() {
    var task_count = $('#tasks ul#pending li').size();
    $('span#task_counter').text("(" + task_count + ")");    
  },
  move_to_completed : function() {
    var completed = $('#tasks ul#pending li.completed');
    completed.slideUp('slow', function() {
      completed.detach();
      $('#tasks ul#completed').append(completed);
      completed.slideDown();      
    });
  },
  move_to_pending : function() {
    var pending = $('#tasks ul#completed li').not('.completed');
    pending.slideUp('slow', function() {
      pending.detach();
      $('#tasks ul#pending').append(pending);
      pending.slideDown();      
    });
  },
  sort_tasks : function() {
    this.move_to_completed();
    this.move_to_pending();
  },
  update_page : function() {
    this.sort_tasks();
    this.update_counter();
  },
  check_all : function() {
    $('#tasks ul#pending li').click();
    
    // NOTE: stop using each when you don't have to!
    // $('#tasks ul#pending li').each(function() {
    //   $(this).addClass('completed');
    // });
  },
  uncheck_all : function() {
    $('#tasks ul#completed li').click();
    
    // $('#tasks ul li').each(function() {
    //   $(this).removeClass('completed');
    // });    
  },
  trash_icon : function() {
    // create trash icon with event handler
    var trash = $("<img src='icons/bin.png'/ class='trash'>")
    trash.click(function (event) {
      var item_to_trash = $(this).parent();
      item_to_trash.fadeOut('slow', function() {
        $(this).remove();
        // since we stop propogation need to update count explicitly
        JSTasker.update_counter();
      });
      event.stopPropagation();
    });
    return trash;
  },
  move_up : function (event) {
    // find the li
    // find the li before this one
    // use 'before' to insert this one before the previous 
    var mover = $(this).parent();
    var target = mover.prev();
    target.before(mover);
    event.stopPropagation();
  },
  move_down : function (event) {
    var mover = $(this).parent();
    var target = mover.next();
    target.after(mover);
    event.stopPropagation();
  }
}


$(document).ready(function () {
  $('input#add_button').click( function(event) {
    event.preventDefault();
    
    var task_text = $('input#task_text').val();
    var list_item = $("<li>" + task_text + "</li>");

    list_item.click( function () {
      $(this).toggleClass('completed');
      JSTasker.update_page();
    });
    list_item.append(JSTasker.trash_icon());

    var minus = $("<span class='minus'>-</span>");
    minus.click(JSTasker.move_down);
    list_item.append(minus);
    var plus = $("<span class='plus'>+</span>");
    plus.click(JSTasker.move_up);
    list_item.append(plus);
    
    $('#tasks ul#pending').append(list_item);
    list_item.effect('highlight', 'slow');
    $('input#task_text').val(null);
    
    JSTasker.update_page();
  });
  
  // $('a.trash').live('click', function(event) {
  //   event.preventDefault();
  //   console.log($(this).parent());
  // });
  
  // NOTE: can't use not check_all() b/c it'll be evaluated upon load
  // passing in function, not result of function
  $('span#check_all').click(JSTasker.check_all); 

  $('span#uncheck_all').click(JSTasker.uncheck_all);
    
  $('input#task_text').focus();
  
  $('#tasks h2').append("<span id='task_counter'></span>");

});



