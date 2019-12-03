json.content @message.content
json.user @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.image @message.image.url