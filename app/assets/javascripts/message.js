$(function(){

  function buildHTML(message){

    if(message.image){
      var image = `<img class="" src="${message.image}" alt="Mvc">`
    } else {
      var image = ""
    }

      var html = `<div class="mainChat__contents__userName">
                    ${message.user}
                    <div class="mainChat__contents__userName__timeStamp">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="mainChat__contents__message">
                    <p>
                      ${message.content}
                    </p>
                      ${image}
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
})