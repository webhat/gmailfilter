$(document).ready(function () {
    $("div label").appendTo("#label");
    $("div from").appendTo("#from");
    $("div hastheword").appendTo("#hastheword");
    $("div doesnothavetheword").appendTo("#doesnothavetheword");
    $("div to").appendTo("#to");
    $("div subject").appendTo("#subject");
    $("div forwardto").appendTo("#forwardto");
    $("div shouldarchive").appendTo("#shouldarchive");
    $("div shouldstar").appendTo("#shouldstar");
    $("div shouldneverspam").appendTo("#shouldneverspam");
    $("div shouldalwaysmarkasimportant").appendTo("#shouldalwaysmarkasimportant");
    $("div shouldtrash").appendTo("#shouldtrash");

    $("label").click(function () {
        console.log($(this).html());

        hideBlock();

        var label = $(this).html();
        var attrib = $(this).attr("refid");
        $('*[refid="' + $(this).attr("refid") + '"]').show();

        var cnt = 0;

        $.each($("label"), function (i, elem) {
            el = $(elem);

            if (/* el.attr("refid") != attrib && */ el.html() == label) {
                $('*[refid="' + el.attr("refid") + '"]').css('background-color', colorTable[cnt++]).show();
                el.show();
            } else {
                el.hide();
            }
        });

        if ($(this).parent().hasClass("close")) {
            $(this).parent().removeClass("close");
            $("*").css('background-color', "white").show();
            $('textarea#edit').hide();
        } else {
            $(this).parent().addClass("close");
        }
    });
    $("from").dblclick(function (event) {
        var id = $(this).attr("refid");
        var elems = $("*[refid='" + id + "']");
        var extension = "";
        $.each(elems, function (i, elem) {
            switch (elem.nodeName.toLowerCase()) {
                case 'label':
                    alert(elem.nodeName.toLowerCase());
                    break;
                case "shouldarchive":
                case "shouldstar":
                case "shouldneverspam":
                case "shouldalwaysmarkasimportant":
                case "shouldtrash":
                    alert(elem.nodeName.toLowerCase());
                    break;
                default:
                    extension += elem.nodeName.toLowerCase() + ":(" + $(elem).html() + ")";
            }
        });
        console.log(google_uri + extension);
        window.open(google_uri + extension);
    });
    $("from").click(function (event) {
        var id = $(this).attr("refid");
        var elem = $("from[refid='" + id + "']");
        console.log(id);
        if (!elem.attr("reset")) {
            elem.attr("reset", elem.html());
        }
        console.log(elem.html() + "\r\n" + $(event.target).html());


        $('textarea#edit').val($(event.target).html());
        $('textarea#edit').show();
        $('textarea#edit').css('top', event.pageY);// $(this).position().top + 30);
        $('textarea#edit').css('left', event.pageX);//$(this).position().left);
        $('textarea#edit').unbind('keyup');
        $('textarea#edit').focus();

        console.log("Top:  " + $('textarea#edit').position().top);
        console.log("Left: " + $('textarea#edit').position().left);

//        elem.keyup(function () {
        //$('textarea#edit').val(elem.html().replace(/\n/g, '<br/>'));
        //$('textarea#edit').val($(this).html()); // also not working as expected
//        });
        $('textarea#edit').keyup(function () {
            $("from[refid='" + id + "']").html($('textarea#edit').val());
            $("from[refid='" + id + "']").elem.removeClass("edited");
        });
        $('textarea#edit').focusout(function () {
            console.log("hide textarea");
            $('textarea#edit').hide();
            //$('textarea#edit').val(" ");
            var elem = $("from[refid='" + id + "']");
            if (elem.html() == elem.attr("reset"))
                elem.removeClass("edited");
            else
                elem.addClass("edited");
        });
    });
});


function hideBlock() {
    $("div label").hide();
    $("div from").hide();
    $("div hastheword").hide();
    $("div doesnothavetheword").hide();
    $("div to").hide();
    $("div subject").hide();
    $("div forwardto").hide();
    $("div shouldarchive").hide();
    $("div shouldstar").hide();
    $("div shouldneverspam").hide();
    $("div shouldalwaysmarkasimportant").hide();
    $("div shouldtrash").hide();
}

function showBlock() {
    $("div label").show();
    $("div from").show();
    $("div hastheword").show();
    $("div doesnothavetheword").show();
    $("div to").show();
    $("div subject").show();
    $("div forwardto").show();
    $("div shouldarchive").show();
    $("div shouldstar").show();
    $("div shouldneverspam").show();
    $("div shouldalwaysmarkasimportant").show();
    $("div shouldtrash").show();
}

var colorTable = ["aqua", "green", "red", "orange", "purple", "yellow", "cyan", "magenta", "lightblue", "lightgreen", "pink"];
var google_uri = "https://mail.google.com/mail/u/0/?ui=2&shva=1#apps/";

