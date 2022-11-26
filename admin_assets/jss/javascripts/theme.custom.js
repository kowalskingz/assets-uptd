/* Add here all your JS customizations */
$function() {
	$('#nav a[href~="' + location.href + '"]').parents('li').addClass('active');
}