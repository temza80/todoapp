<div class="wysiwyg clearfix">
<div id="wysiwyg_icons_panel">
<span id="wrap-strong" class="wysiwyg_icon"></span>
<span id="wrap-italic" class="wysiwyg_icon"></span>
<span id="wrap-underline" class="wysiwyg_icon"></span>
<span id="upload" class="wysiwyg_icon"></span>
<input id="image_upload" type='file' hidden="true">
</div>
    <div class="textareas clearfix">
<textarea id="wysiwyg_title" cols="75" rows="1"><%if((typeof title_redact)!='undefined'){%> <%=title_redact%><%}%></textarea>

<br>
<textarea id="wysiwyg" cols="75" rows="12"><%if((typeof post_redact)!='undefined'){%> <%=post_redact%> <%}%></textarea>
<%if(typeof page=='undefined'){%><div id="tags_line"></div><br>
<textarea id="new_tag" cols=55" rows="1"></textarea><button onclick="tagToLineTextArea('#new_tag')">add</button><br>
<div id="tag_list"></div>
Список тегов<button id="tag_toggle" onclick='load_tags(event,this)'>&#9650</button>
<%}%>
    </div>
</div>

<span id="publishPost" class="button">publishPost</span>

<%- include cap4a.ejs %>

<script src="/javascripts/jquery.selection.js"></script>
<script src="/javascripts/jquery.caret.js"></script>
<script>

    $('#wrap-strong').click(function(){
    var top=$('#wysiwyg').scrollTop();
        $('#wysiwyg').selection('insert', {text: '<b>', mode: 'before'})
            .selection('insert', {text: '</b>', mode: 'after'});
            $('#wysiwyg').scrollTop(top);
    });
    $('#wrap-italic').click(function(){
    var top=$('#wysiwyg').scrollTop();
        $('#wysiwyg').selection('insert', {text: '<i>', mode: 'before'})
            .selection('insert', {text: '</i>', mode: 'after'});
          $('#wysiwyg').scrollTop(top);
       
    });
    $('#wrap-underline').click(function(){
    var top=$('#wysiwyg').scrollTop();
        $('#wysiwyg').selection('insert', {text: '<s>', mode: 'before'})
            .selection('insert', {text: '</s>', mode: 'after'});
            $('#wysiwyg').scrollTop(top);
    });
    $('#upload').click(function(){
        $('#image_upload').trigger('click');
    });
    $('#image_upload').change(function () {
    		
        if(document.getElementById("image_upload").files[0].type=='image/gif' ||
            document.getElementById("image_upload").files[0].type=='image/png' ||
            document.getElementById("image_upload").files[0].type=='image/jpeg') {

            var data = new FormData();
           
            data.append('image', document.getElementById("image_upload").files[0]);
            
            // append other variables to data if you_want: data.append('field_name_x', field_value_x);

            $.ajax({
                type: 'POST',
                processData: false, // important
                contentType: false, // important
                data: data,
                url: "/upl",
                success: function (data) {
                var top=$('#wysiwyg').scrollTop();
                    $('#wysiwyg').caret(data);
        $('#wysiwyg').scrollTop(top);
 

        }
                // dataType : 'json',
                // in PHP you can call and pro)cess file in the same way as if it was submitted from a form:
                // $_FILES['input_file_name']


            });


        }
        else alert('Недопустимый тип файла')
    });
    $('#publishPost').on('click',function() {
          var children=$('#tags_line').children();
   var tags=[];
   for(i=0;i<children.length;i++) tags.push($(children[0]).text().slice(2));
   //console.log(JSON.stringify(arr));
        var data = new FormData();
        var title;
        if($('#wysiwyg_title').val()=='') title='...';
        else title=$('#wysiwyg_title').val();

        data.append('title', title);
        data.append('posting', $('#wysiwyg').val());
         data.append('tags', tags);

       data.append('captcha', $('#captcha').val());
        <%if(typeof(page)!='undefined'){%>data.append('post_id','<%= page._id %>')<%}%>



        if($('#wysiwyg').val()==''){ alert('Введите текст');return;}
        $.ajax({
            type: 'POST',
            processData: false, // important
            contentType: false, // important
            url: '<%=wysiwygAjax%>',

            data: data,
            success:function(data, textStatus, jqXHR){
                if(data!='OK') alert(data);
                else
                location.href='<%if(typeof page=='undefined'){%>/posts<%}%><%if(typeof page!='undefined'){%>/post/<%=page._id%><%}%>'
        },
            complete: function () {



            },
         /*   statusCode: {
                200: function () {

                    location.href='<%if(typeof page=='undefined'){%>/posts<%}%><%if(typeof page!='undefined'){%>/post/<%=page._id%><%}%>'
                },
                403: function (jqXHR) {
                    var error = JSON.parse(jqXHR.responseText);



                }
            }*/
        });
    });
</script>
