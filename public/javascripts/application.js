var RapidFTR = {};

RapidFTR.backButton = function(selector){
	$(".back a").click(function(e){
		e.preventDefault();
		history.go(-1);	
	});
}
RapidFTR.tabControl = function() {
  $(".tab").hide();
  $(".tab-handles li:first").addClass("current").show();
  $(".tab:first").show();

  $(".tab-handles a").click(function() {

    $(".tab-handles li").removeClass("current");
    $(".tab").hide();

    var activeTab = $(this).attr("href");

    $(this).parent().addClass("current");
    $(activeTab).show();

    return false;
  });
}

RapidFTR.enableSubmitLinks = function() {
  $(".submit-form").click(function() {
    var formToSubmit = $(this).attr("href");
    $(formToSubmit).submit();
    return false;
  });
}

RapidFTR.activateToggleFormSectionLinks = function() {
  var toggleFormSection = function(action, message) {
    return function() {
            if(!$('#form_sections input:checked').length) {
                alert("Please select form(s) you want to show/hide.");
            } 
                else if(confirm(message)) {
    		    $("#enable_or_disable_form_section").attr("action", "form_section/" + action).submit();
    		return true;
			} else {
				return false;
			}
    };
  }
  
  $("#enable_form").click(toggleFormSection("enable", "Are you sure you want to make these form(s) visible?"));
  $("#disable_form").click(toggleFormSection("disable", "Are you sure you want to hide these form(s)?"));
}


RapidFTR.hideDirectionalButtons = function() {
  $("#formFields .up-link:first").hide();
  $("#formFields .down-link:last").hide();
}

RapidFTR.followTextFieldControl = function(selector, followSelector, transformFunction) {
  $(selector).keyup(function() {
    var val = $(this).val();
    var transformed = transformFunction(val);
    $(followSelector).val(transformed);
  });
}

RapidFTR.childPhotoRotation = {
    rotateClockwise: function(event) {
        RapidFTR.childPhotoRotation.childPicture().rotateRight(90, 'rel');
        self.photoOrientation.val((parseInt(self.photoOrientation.val()) + 90) % 360);
        event.preventDefault();
    },

    rotateAntiClockwise: function(event) {
        RapidFTR.childPhotoRotation.childPicture().rotateLeft(90, 'rel');
        self.photoOrientation.val((parseInt(self.photoOrientation.val()) - 90) % 360);
        event.preventDefault();
    },

    restoreOrientation: function(event) {
        RapidFTR.childPhotoRotation.childPicture().rotate(0, 'abs');
        self.photoOrientation.val(0);
        event.preventDefault();
    },

    childPicture : function(){
        return $("#child_picture");
    },

    init: function() {
        self.photoOrientation = $("#child_photo_orientation");
        $("#image_rotation_links .rotate_clockwise").click(this.rotateClockwise);
        $("#image_rotation_links .rotate_anti_clockwise").click(this.rotateAntiClockwise);
        $("#image_rotation_links .restore_image").click(this.restoreOrientation);
    }
};

RapidFTR.addAudioRecording = function() {
    $('#addRecording').unbind("click").click(function() {
        var fileItem = $('#files p:last').clone();
        fileItem.children().remove('a');
        fileItem.find('label').html("&nbsp;");
        var fileTypeElement = fileItem.find('input[type="file"]');
        fileTypeElement.val("");
        var temp = fileTypeElement.attr('name');
        var fileTypeIdToSet = temp.replace(/[^0-9\\.]/g, '').replace(/^(\d*\.\d*)\..*$/, "$1") * 1.0 +1;
        var fileTypeNameToSet = temp.replace(/[\d\.]+/g, '');
        fileTypeElement.attr('id',fileTypeIdToSet);
        fileTypeElement.attr('name',fileTypeNameToSet + fileTypeIdToSet);
        $("#files").append(fileItem);
        return false;
    });
}
$(document).ready(function() {
});

$(document).ready(function() {
  RapidFTR.tabControl();
  RapidFTR.enableSubmitLinks();
  RapidFTR.activateToggleFormSectionLinks();
  RapidFTR.hideDirectionalButtons();
  RapidFTR.backButton();
  RapidFTR.followTextFieldControl("#field_display_name", "#field_name", RapidFTR.Utils.dehumanize);
  RapidFTR.childPhotoRotation.init();
    $('#dialog').hide();
    if (window.location.href.indexOf('login') === -1) {
    IdleSessionTimeout.start();
  };
  RapidFTR.addAudioRecording();
});
