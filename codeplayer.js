function updateOutput() {
	//Allows user input HTML and CSS to be represented in the 'Output' panel 
	$("iframe").contents().find("html").html("<html><head><style type='text/css'>" + $("#cssPanel").val() + "</style></head><body>" + $("#htmlPanel").val() + "</body></html>");
	
	/*Allows user input JS to be represented -- 
	Would need to run javascript on a static page in a separate domain to 
	close security issue caused by eval() function that allows malicious code to be run potentially*/
	document.getElementById("outputPanel").contentWindow.eval($("#javascriptPanel").val());
}	

$(".toggleButton").hover(
	function() {
		$(this).addClass("highlighted");
	},
	function() {
		$(this).removeClass("highlighted");
	});	
	
$(".toggleButton").click(function () {
	$(this).toggleClass("active");
	
	$(this).removeClass("highlighted");
	
	//Get panel id(s)
	var panelId = $(this).attr("id") + "Panel"
	
	//Append # to id(s)
	$("#" + panelId).toggleClass("hidden");
	
	//Used to properly determine the width of each panel based on active panels
	var numPanelsActive = 4 - $(".hidden").length;
	
	$(".panel").width(($(window).width() / numPanelsActive) - 10); //Subtrct 10px to handle extra padding
});

$(".panel").height($(window).height() - $("#topbar").height() - 15); //Subtract 15px to handle extra padding

$(".panel").width(($(window).width() / 2) - 10); //Subtract 10px to handle extra padding 

updateOutput(); //Updates output based on user input

$("textarea").on('change keyup paste', function() {
	//Updates 'Output' panel based on user input
    updateOutput();
});