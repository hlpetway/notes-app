$ = require('jquery');

var data = '';

$.ajax({
    url: '/api/v0_0_1/notes',
    data: data,
    success: function(json) {
        json.forEach(function(element) {
            $('#notes').append('<li>' + element.body + '</li>');
        });
    },
    dataType: 'json'

});