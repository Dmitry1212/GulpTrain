function renderFeadbackList() {
    $('#feadbacks').empty();
    $.get(' http://localhost:3000/comments', {}, function (comments) {

        comments.forEach(function (comment) {
            if (!JSON.parse(comment.accepted)) {
                $color = 'moderate';
            } else {
                $color = 'accepted';
            }

            var $form = $('<form />');
            $form.append(
                $('<div />', {
                    class: $color + ' status'
                }),
                $('<input />', {
                    type: 'text',
                    name: comment.idComment,
                    class: 'info',
                    value: comment.text,
                    'data-id': comment.id,
                    'data-accepted': comment.accepted
                }),
                $('<input />', {
                    type: 'submit',
                    value: 'Одобрить',
                    class: 'submit'
                }),
                $('<input />', {
                    type: 'submit',
                    value: 'Удалить',
                    class: 'delete'
                })
            );

            $('#feadbacks').append($form);
        });

    }, 'json');
}


(function ($) {
    $(document).ready(function () {
        renderFeadbackList();

        $('#feadbacks').on('click', 'input.submit', function (event) {
            if ($(this).prev().attr('data-accepted')=='false'){
                $.ajax({
                    type: 'PATCH',
                    url: ' http://localhost:3000/comments/' + $(this).prev().attr('data-id'),
                    data: {accepted: true},
                    success: function () {
                        renderFeadbackList();
                    }
                });
            }
            event.preventDefault();
        });

        $('#feadbacks').on('click', 'input.delete', function (event) {
            // console.log($(this).prev().prev().attr('data-id'));
            $.ajax({
                type: 'DELETE',
                url: 'http://localhost:3000/comments/' + $(this).prev().prev().attr('data-id'),
                success: function () {
                    renderFeadbackList();
                }
            });
            event.preventDefault();
        });

        $('#getComment').on('click', 'input#sendComment', function (event) {

            $.get(' http://localhost:3000/comments', {}, function (comments) {
                var newId = comments.length;
                console.log(newId);
                var commentsIds =[];

                comments.forEach(function (comment) {
                    comment.id = JSON.parse(comment.id);
                    commentsIds.push(comment.id)
                });

                 while (commentsIds.indexOf(newId) !== -1) {
                     newId++;
                }

                var comment = {
                    id: JSON.stringify(newId),
                    text: $('textarea').val(),
                    accepted: JSON.stringify(false)
                };
                $.ajax({
                    type: 'POST',
                    url: 'http://localhost:3000/comments',
                    data: comment,
                    success: function () {
                        renderFeadbackList();
                    }
                });

            }, 'json');

            event.preventDefault();
        });


    });
})(jQuery);