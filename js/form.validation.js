$(function() {
	// Initially Hide this
	$("#status").hide();

	// Live Form Validation
    $(".contact-form").validate({
        // Specify validation rules
        rules: {
            // The key name on the left side is the name attribute
            // of an input field. Validation rules are defined
            // on the right side
            name: "required",
            EMAIL: {
                required: true,
                // Specify that email should be validated
                // by the built-in "email" rule
                email: true
            },
            message: {
                required: true,
                minlength: 5
            }
        },
        // Specify validation error messages
        messages: {
          name: "Please enter your name",
          message: {
            required: "Please send some message",
            minlength: "Your message must be at least 5 characters long"
          },
          EMAIL: "Please enter a valid email address"
        },
        // Make sure the form is submitted to the destination defined
        // in the "action" attribute of the form when valid
        submitHandler: function(form) {
          	form.click();
        }
    });

    // Disable submit button if there are error
    $(".contact-form input").on("keyup blur", function () {
        if ($(".contact-form").valid()) {
            $("button#submit").prop("disabled", false);
        } else {
            $("button#submit").prop("disabled", "disabled");
        }
    });

	$("button#submit").click(function() {
	    $.ajax({
	        //type: "POST",
	        url: "http://127.0.0.1:8000/eden/cap/coming?callback?", //process to mail
	        data: $('.contact-form').serialize(),
	        dataType: 'jsonp',
	        async: false,
	        success: function(status) {
	        	if (status.code == 200) {
	        		$("#status").css("color", "green");
	            	$("#statusInfo").text("Thank you for your message. We will get back to you quickly :)");
	            	$("#status").show();
    				$("#form-container").hide();
	        	} else {
	        		$("#status").css("color", "red");
            		$("#statusInfo").text("OOPS!!! Looks like mail server is down. Please try again later or write to us at geoinfo@ait.ac.th");
            		$("#status").show();
					$("#form-container").hide();
	        	}
	        },
	        error: function (response) {
            	$("#status").css("color", "red");
            	$("#statusInfo").text("OOPS!!! Looks like mail server is down. Please try again later or write to us at geoinfo@ait.ac.th");
            	$("#status").show();
				$("#form-container").hide();
	        },
	    });
	});
});