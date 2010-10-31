$(document).ready(function () {
  $('h1').prepend("<a name='top' />");
  $('div.article').append("<a href='#top'>Back to Top</a>");
  
  $('h1').after("<h2><a name='toc' />Table of Contents</h2>");
  
  $('h2:first').after("<ul id='toc'></ul>")
    
  $('div.article h2').each(function () {
    var slug = $(this).text().trim().toLowerCase().replace(' ', '_');
    $(this).prepend("<a name='" + slug + "' />");
    
    var list_item = "<li><a href='#" + slug + "'>" + $(this).text() + "</a></li>";
    $('ul#toc').append(list_item);
    
    var toggle_link = $("<a href='#'>(hide)</a>");
    toggle_link.click(function (event) {
      event.preventDefault();
      $(this).siblings('p').slideToggle();
      
      // Ternary operator
      var new_text = ($(this).text() == '(hide)') ? '(show)' : '(hide)';
      $(this).text(new_text);

    });
    
    $(this).after(toggle_link);
  });
  
});