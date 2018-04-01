function highlightButton() {
	document.button.src='http://file.gimp.blog.shinobi.jp/SubmitOnMouse081120.jpg';
}

function pushButton() {
	document.button.src='http://file.gimp.blog.shinobi.jp/SubmitOnClick081120.jpg';
}

function darkenButton() {
	document.button.src='http://file.gimp.blog.shinobi.jp/SubmitNormal081120.jpg';
}

function submitForm() {
	document.CommentForm.submit();
}

$(document).ready(function(){
	$("table#ShortCut tr:even").css("background-color", "#f0f0f0");
});
