$(function(){

  function buildHTML(message){

    if(message.image){
      var image = `<img class="" src="${message.image}" alt="Mvc">`
    } else {
      var image = ""
    }

      var html = `<div class="mainChat__contents__post" data-messege_id="${message.id}">
                    <div class="mainChat__contents__post__userName">
                      ${message.user}
                      <div class="mainChat__contents__post__userName__timeStamp">
                        ${message.created_at}
                      </div>
                    </div>
                    <div class="mainChat__contents__post__message">
                      <p>
                        ${message.content}
                      </p>
                        ${image}
                    </div>
                  </div>`
    return html
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var fromData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: fromData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.mainChat__contents').append(html)
      $('.mainChat__contents').animate({ scrollTop: $('.mainChat__contents')[0].scrollHeight});
      $('#new_message')[0].reset();
      $('.sendButton').prop('disabled', false);
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })

  var reloadMessages = function() {
    last_message_id = $('.mainChat__contents__post:last').data("messege_id");
    $.ajax({
      url: 'api/messages',
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.mainChat__contents').append(insertHTML);
      $('.mainChat__contents').animate({ scrollTop: $('.mainChat__contents')[0].scrollHeight});
    })
    .fail(function() {
      console.log('error');
    });
  };

  if(document.URL.match("/messages")) {
		setInterval(reloadMessages, 7000);
	}
})