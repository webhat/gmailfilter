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
        $('*[refid="' + $(this).attr("refid") + '"]').css('opacity', 1);

        var cnt = 0;

        $.each($("label"), function (i, elem) {
            el = $(elem);

            if (/* el.attr("refid") != attrib && */ el.html() == label) {
                $('*[refid="' + el.attr("refid") + '"]').css('background-color', colorTable[cnt++]).css('opacity', 1);
                el.css('opacity', 1);
            } else {
                el.css('opacity', 0);
            }
        });

        if ($(this).parent().hasClass("close")) {
            $(this).parent().removeClass("close");
            $("*").css('background-color', "white").css('opacity', 1);
            $('textarea#edit').hide();
        } else {
            $(this).parent().addClass("close");
        }
    });
    $("label").dblclick(function (event) {
        var id = $(this).attr("refid");
        var elems = $("*[refid='" + id + "']");
        var extension = "";
        $.each(elems, function (i, elem) {
            switch (elem.nodeName.toLowerCase()) {
                case 'label':
                    //alert(elem.nodeName.toLowerCase());
                    break;
                case "shouldarchive":
                case "shouldstar":
                case "shouldneverspam":
                case "shouldalwaysmarkasimportant":
                case "shouldtrash":
                    //alert(elem.nodeName.toLowerCase());
                    break;
                case 'hastheword':
                case 'doesnothavetheword':
                    extension += " " + encodeURI($(elem).html()) + "";
                    break
                default:
                    extension += elem.nodeName.toLowerCase() + ":(" + encodeURI($(elem).html().replace(/ /g,"+")).replace("?","%3F") + ") ";
            }
        });
        console.log(google_uri + extension);
        window.open(google_uri + extension);
    });
    $("from").click(editBlock);
    $("hastheword").click(editBlock);
    $("doesnothavetheword").click(editBlock);
    $("subject").click(editBlock);
    $("forwardto").click(editBlock);
});

function editBlock() {
    var id = $(this).attr("refid");
    var tagname = this.tagName.toLowerCase();
    var elem = $(tagname + "[refid='" + id + "']");
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

    $('textarea#edit').keyup(function () {
        $(tagname + "[refid='" + id + "']").html($('textarea#edit').val());
        $(tagname + "[refid='" + id + "']").addClass("edited");
    });
    $('textarea#edit').focusout(function () {
        console.log("hide textarea");
        $('textarea#edit').hide();
        //$('textarea#edit').val(" ");
        var elem = $(tagname + "[refid='" + id + "']");
        if (elem.html() == elem.attr("reset"))
            elem.removeClass("edited");
        else
            elem.addClass("edited");
    });
}


function hideBlock() {
    $("div label").css('opacity', 0);
    $("div from").css('opacity', 0);
    $("div hastheword").css('opacity', 0);
    $("div doesnothavetheword").css('opacity', 0);
    $("div to").css('opacity', 0);
    $("div subject").css('opacity', 0);
    $("div forwardto").css('opacity', 0);
    $("div shouldarchive").css('opacity', 0);
    $("div shouldstar").css('opacity', 0);
    $("div shouldneverspam").css('opacity', 0);
    $("div shouldalwaysmarkasimportant").css('opacity', 0);
    $("div shouldtrash").css('opacity', 0);
}

function showBlock() {
    $("div label").css('opacity', 1);
    $("div from").css('opacity', 1);
    $("div hastheword").css('opacity', 1);
    $("div doesnothavetheword").css('opacity', 1);
    $("div to").css('opacity', 1);
    $("div subject").css('opacity', 1);
    $("div forwardto").css('opacity', 1);
    $("div shouldarchive").css('opacity', 1);
    $("div shouldstar").css('opacity', 1);
    $("div shouldneverspam").css('opacity', 1);
    $("div shouldalwaysmarkasimportant").css('opacity', 1);
    $("div shouldtrash").css('opacity', 1);
}

var colorTable = ["aqua", "green", "red", "orange", "purple", "yellow", "cyan", "magenta", "lightblue", "lightgreen", "pink"];
var google_uri = "https://mail.google.com/mail/u/0/?ui=2&shva=1#apps/";

