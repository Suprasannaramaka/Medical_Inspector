$(function()
{
    $.ajax({
        type:'GET',
        dataType:"jsonp",
        url:"http://127.0.0.1:5500/Medicine%20Inspector.html",
        headers:
        {
         'Authorization':'',
         'Content-Type':'application/json'
        },
        success: function(data){
          console.log('success' , data);
        }
    });
});