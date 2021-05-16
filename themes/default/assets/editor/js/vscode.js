/*
* Fayl menjr Akbarali tomonidan yozildi.
* Johncms Profile Link: https://johncms.com/profile/?user=38217
* Those who want to sponsor: Webmoney WMR: R853215959425, Webmoney WMZ: Z401474330355, Webmoney WMY: Y194307290426
*/
const API_URL = '../api/';

function save_file(idbu) {
  var contents = $('textarea#adsafadsfasd_' + idbu).val(), fayl_yoli = $('input#fayl_yoli_' + idbu).val();
  $.ajax({
    url: API_URL,
    type: "POST",
    data: {
      action: "save-file",
      fayl_yoli: fayl_yoli,
      contents: contents,
    },
    dataType: 'JSON',
    beforeSend: function() {
      $('#bajarilmoqda_' + idbu).show();
    },
    success: function(a) {
      var fadeTimeout = 1000;
      if (a.success) {
      $('#bajarilmoqda_' + idbu).css("background-color", "green");
        $('#error-message_' + idbu).hide();
        clearTimeout(window.msg_tmt);
        window.msg_tmt = setTimeout(function() {
          $('#bajarilmoqda_' + idbu).fadeOut();
        }, fadeTimeout);
      $('#bajarilmoqda_' + idbu).css("background-color", "");
      } else {
        alert(a.message);
        $('#bajarilmoqda_' + idbu).hide();
        $('#error-message_' + idbu).show();
      }
    }
  });
}

var makeBackup = function(idbu) {
  var contents = $('textarea#adsafadsfasd_' + idbu).text(), fayl_yoli = $('input#fayl_yoli_' + idbu).val();
  $.ajax({
    url: API_URL,
    method: "POST",
    data: {
      action: 'backup',
      contents: contents,
      fayl_yoli: fayl_yoli
    },
    dataType: 'JSON',
    beforeSend: function() {
      $('#bajarilmoqda_' + idbu).show();
    },
    success: function(reply) {
      var fadeTimeout = 1000;
      if (reply.success) {
        clearTimeout(window.msg_tmt);
        window.msg_tmt = setTimeout(function() {
          $('#bajarilmoqda_' + idbu).fadeOut();
        }, fadeTimeout);
      } else {
        alert(reply.message);
        $('#bajarilmoqda_' + idbu).hide();
        $('#error-message_' + idbu).show();
      }
    }
  });
}

function reloadFiles(hash) {
    $.ajax({
     url: window.location.href,
     type: "POST",
     data: {
       action: "reload"
     },
     dataType: 'JSON',
     success: function(data) {
       $("#files > div").jstree("destroy");
       $("#files > div").html(data.data);
       $("#files > div").jstree();
      // $("#files > div a:first").click();
       if (hash) {
         $("#files a[data-file=\"" + hash + "\"], #files a[data-dir=\"" + hash + "\"]").click();
       }
     }
    });
    }
    
    $("#files").on("click", "a[data-file]", function() {
      var foldername = $(this).attr("data-file");

      $("#renamefolder").hide();
      $("#renamefile").show();

      $("#newfolder").hide();
      $("#clickfilename").val(foldername);
      $("#delletefolder").hide();
      $("#delletefile").show();
      $("#newfile").show();
    });

$("#files").on("dblclick", "a[data-file]", function() {
    var faylyoli = $(this).attr("data-file");
    $("#renamefolder").hide();
    $("#renamefile").show();
    $("#openfilename").val(faylyoli);
    $("#newfolder").hide();
    $("#newfile").show();
    $("#delletefolder").hide();
    $("#delletefile").show();
    open_ace(faylyoli);
});

$(document).on('click', 'a[data-dir]', function(e) {
      var foldername = $(this).attr("data-dir");
      $("#renamefile").hide();
    $("#renamefolder").show();
      $("#newfolder").show();
      $("input#clickfoldername").val(foldername);
      $("#newfile").show();
      $("#delletefile").hide();
      $("#delletefolder").show();
     console.log(foldername);
});

function oynacha(html, faylyoli) {
var winbox = new WinBox({
    title: faylyoli,
    // background: "#ff005d",
    border: 2,
    html: html,
    width: '41.3%',
    height: '100%',
    y: "center",
    x: "center",
    /*
     * Bu narsa winboxni yopmoqchi bo`lsa chiqadi siz haqiqatdan oynani yopasizmi deb
    onclose: function(force) {
      return !confirm("Close window?");
    }
    */
  });
  // winbox.fullscreen(false);
}

function kursor_keldi(id) {
  $('#ochilganeditor').val(id);
}

var i = 0;
function open_ace(faylyoli) {
$.ajax({
  url: API_URL,
  type: "POST",
  data: {
    action: "open-file",
    faylyoli: faylyoli
  },
  dataType: "JSON",
  beforeSend: function() {
   // $('textarea#adsafadsfasd').text("");
  },
  success: function(a) {
    if (a.data.faylturi) {
      ++i;
      oynacha(`<div class="outer-div" id="custom-popover">
      <div class="inner-div">
        <div class="savebackupedix"  >
          <img src="/themes/default/assets/editor/icons/svg/savefile.svg" alt="" onclick="save_file(`+ i +`);" style="display:block;width: 100%;">
          <br>
          <img src="/themes/default/assets/editor/icons/svg/backup.svg" idbu="`+ i +`" onclick="makeBackup(`+ i +`);" style="display:block;width: 100%;"><br>
          <img src="/themes/default/assets/editor/icons/svg/prloader.svg" alt="" id="bajarilmoqda_` + i + `" style="display:none;width: 100%;"><br>
          <img src="/themes/default/assets/editor/icons/svg/warning.svg" alt="The file was not saved. Refresh the page" title="The file was not saved. Refresh the page" id="error-message_` + i + `" style="display:none;width: 100%;"><br>
        </div>
        <textarea name="editor_`+i+`" id="adsafadsfasd_`+i+`" style="width: 100%;height: 10%; display:none;">`+ a.data.file +`</textarea>
        <input type="text"  style="visibility:hidden;position: absolute;" value="` + faylyoli + `" id="fayl_yoli_`+ i +`"  name="fayl_yoli_`+ i +`">
        <pre id="editor_`+i+`" onmouseover="kursor_keldi(` + i + `)" style="width: 95%;height: 99.7%;font-size: 14px;color: #e3e3e3;" class="acepre"></pre>
      </div>
    </div>`, faylyoli);
    require.config({
      paths: {
        "ace": "/themes/default/assets/editor/js/lib/ace"
      }
    });
    require(["ace/ace", "ace/ext/emmet", "ace/ext/settings_menu", "ace/ext/language_tools"], function(ace) {
      var editor = ace.edit("editor_" + i);
      editor.setOptions({
        copyWithEmptySelection: true,
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,
        fontSize: "14px",
        enableEmmet: true,
        wrap: true,
      });
      editor.setTheme("ace/theme/tomorrow_night_eighties");
      ace.require('ace/ext/settings_menu').init(editor);
      editor.session.setMode("ace/mode/" + a.data.faylturi);
      editor.setValue($('textarea#adsafadsfasd_'+ i).val());
      editor.getSession().on('change', function() {
        var $qiymat = $("#ochilganeditor").val();
        if ($qiymat != '') {
          $('textarea#adsafadsfasd_'+ $qiymat).val(editor.getSession().getValue());
        }            
      });
      editor.commands.addCommand({
        name: "showKeyboardShortcuts",
        bindKey: {
          win: "Ctrl-Alt-h",
          mac: "Command-Alt-h"
        },
        exec: function(editor) {
          ace.config.loadModule("ace/ext/keybinding_menu", function(module) {
            module.init(editor);
            editor.showKeyboardShortcuts()
          })
        }
      })
    });
    } else if (a.data.boshqacha) {
      $(location).attr('href', a.data.fayl_yoli);
    } else {
      alert(a.message);
    }
  }
});
};

function delletefile() {
var fayl = $("#clickfilename").val();
var clickfoldername = $("#clickfoldername").val();
var proceed = confirm("Are you sure you want to delete this " + fayl + " file?");
if (proceed) {
  $.ajax({
    url: API_URL,
    type: "POST",
    data: {
      action: "dellete-file",
      fayl: fayl
    },
    dataType: "JSON",
    beforeSend: function() {
      $('textarea#adsafadsfasd').text("");
    },
    success: function(a) {
      if (a.success) {
        reloadFiles(clickfoldername);
      } else {
        alert(a.message);
        reloadFiles(clickfoldername);
      }
    }
  })
}
}

function delletefolder() {
var fayl = $("#clickfoldername").val();
var proceed = confirm("Are you sure you want to delete this " + fayl + " folder?");
if (proceed) {
  $.ajax({
    url: API_URL,
    type: "POST",
    data: {
      action: "dellete-folder",
      folder: fayl
    },
    dataType: "JSON",
    beforeSend: function() {
      $('textarea#adsafadsfasd').text("");
    },
    success: function(a) {
      if (a.success) {
        reloadFiles();
      } else {
        alert(a.message);
        reloadFiles();
      }
    }
  })
}
}

function renamefolder() {
  var oldname = $("#clickfoldername").val();
var filename = prompt("Enter the folder new name:", oldname);
if (filename == null || filename == "") {
  console.log("The file was not named")
} else {
  $.ajax({
    url: API_URL,
    type: "POST",
    data: {
      action: 'rename-folder',
      newname: filename,
      oldname: oldname
    },
    dataType: "JSON",
    beforeSend: function() {},
    success: function(a) {
      if (a.success) {
        reloadFiles(filename);
      } else {
        alert(a.message)
        reloadFiles(oldname);
      }
    }
  })
}
}

function renamefile() {
  var oldname = $("#clickfilename").val();
var filename = prompt("Enter the file new name:", oldname);
if (filename == null || filename == "") {
  console.log("The file was not named")
} else {
  $.ajax({
    url: API_URL,
    type: "POST",
    data: {
      action: 'rename-file',
      newname: filename,
      oldfilename: oldname
    },
    dataType: "JSON",
    beforeSend: function() {},
    success: function(a) {
      if (a.success) {
        reloadFiles(filename);
      } else {
        alert(a.message);
        reloadFiles(oldfilename);
      }
    }
  })
}
}

function newfile() {
var filename = prompt("Enter the file name:", "newfile.php");
var foldername = $("#clickfoldername").val();
if (filename == null || filename == "") {
  console.log("The file was not named")
} else {
  $.ajax({
    url: API_URL,
    type: "POST",
    data: {
      action: 'new-file',
      filename: filename,
      foldername: foldername
    },
    dataType: "JSON",
    beforeSend: function() {},
    success: function(a) {
      if (a.success) {
        reloadFiles(foldername);
        open_ace(a.data.fileopen);
        $("#openfilename").val(a.data.faylyoli);
        var hash = window.location.hash;
        if (hash) {
          $("#files a[data-file=\"" + hash + "\"], #files a[data-dir=\"" + hash + "\"]").click();
        }
      }else{
      reloadFiles(foldername);
        alert(a.message);
      }
    }
  })
}
}

function newfolder() {
var newfoldername = prompt("Enter the folder name:", "newfolder");
var foldername = $("#clickfoldername").val();
if (newfoldername == null || newfoldername == "") {
  console.log("The folder was not named")
} else {
  $.ajax({
    url: API_URL,
    type: "POST",
    data: {
      action: 'new-folder',
      folder: newfoldername,
      foldername: foldername
    },
    dataType: "JSON",
    success: function(a) {
      if (a.success) {
        reloadFiles(foldername);
    var hash = window.location.hash;
              if (hash) {
                  $("#files a[data-file=\"" + hash + "\"], #files a[data-dir=\"" + hash + "\"]").click();
              }
    }else{
        reloadFiles(foldername);
        alert(a.message);
      }
    }
  })
}
}

$('#do-backup').on('click', function(evt) {
  var idbu = $("#ochilganeditor").val();
  evt.preventDefault();
  makeBackup(idbu);
});

shortcut.add("Ctrl+s", function() {
  var idbu = $("#ochilganeditor").val();
  save_file(idbu);
}, {
  'type': 'keydown',
  'propagate': false,
  'disable_in_input': false,
  'target': document
});

shortcut.add("Shift+f12", function() {
  var idbu = $("#ochilganeditor").val();
  save_file(idbu);
}, {
  'type': 'keydown',
  'propagate': false,
  'disable_in_input': false,
  'target': document
});
shortcut.add("ctrl+r", function() {
  reloadFiles();
  }, {
  'type': 'keydown',
  'propagate': false,
  'disable_in_input': false,
  'target': document
  });

  shortcut.add("shift+delete", function() {
    delletefile();
    }, {
    'type': 'keydown',
    'propagate': false,
    'disable_in_input': false,
    'target': document
    });

    shortcut.add("f2", function() {
      renamefile();
      }, {
      'type': 'keydown',
      'propagate': false,
      'disable_in_input': false,
      'target': document
      });
      shortcut.add("f3", function() {
        renamefolder();
        }, {
        'type': 'keydown',
        'propagate': false,
        'disable_in_input': false,
        'target': document
        });

    shortcut.add("ctrl+delete", function() {
      delletefolder();
      }, {
      'type': 'keydown',
      'propagate': false,
      'disable_in_input': false,
      'target': document
      });

/*
      shortcut.add("Shift+f", function() {
        newfile();
      }, {
        'type': 'keydown',
        'propagate': false,
        'disable_in_input': false,
        'target': document
      });
      shortcut.add("Shift+p", function() {
        newfolder();
      }, {
        'type': 'keydown',
        'propagate': false,
        'disable_in_input': false,
        'target': document
      });
      */