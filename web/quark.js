var selectedEntry = "home";
var selectedCategory = "automation";
var transitioning = false;

$(function() {
	var changed = false;
	if(window.location.hash) {
		var target = window.location.hash.substring(1);
		if($(`.navbar-link[data-entry=${target}]`).length > 0 && target != selectedEntry) {
			selectedEntry = target;
			changed = true;
		}
	}

	updateEntry(changed, false);
	updateCategory(false);
	updateBtt();

	var images = $('#big-branding-background img');
	shuffle(images);
	for(var i = 0; i < 4; i++)
		$(images[i]).addClass('displayed-image');
});

$(window).scroll(updateBtt);

$('.data-entry-changer').click(function() {
	if(transitioning)
		return;

	var newEntry = $(this).attr('data-entry')
	var changed = newEntry != selectedEntry;

	transitioning = true;

	var top = window.pageYOffset || document.documentElement.scrollTop;
	$("html, body").animate({ scrollTop: 0 }, Math.min(top, 500), function() {
		selectedEntry = newEntry;
		updateEntry(changed, true);	
		transitioning = false;
	});
});

$('.data-category-changer').click(function() {
	if(transitioning)
		return;

	var newCategory = $(this).attr('data-category')
	var changed = newCategory != selectedCategory;

	transitioning = true;

	var top = window.pageYOffset || document.documentElement.scrollTop;
	$("html, body").animate({ scrollTop: 0 }, Math.min(top, 500), function() {
		selectedCategory = newCategory;
		updateCategory(changed);	
		transitioning = false;
	});
});

$('.feature-expand-button').click(function() {
	flipFlopCollapsible($(this), $(this).parent().find('.feature-expand'), 'ᕕ( ᐛ )ᕗ', 'More Info', 'Less Info', '50px');
});

$('#install-instructions-button').click(function() {
	flipFlopCollapsible($(this), $('#install-instructions'), '', 'Show How to Install', 'Hide How to Install', 0);
});

function flipFlopCollapsible(button, contents, textAnimating, textShow, textHide, targetMarginBottom) {
	if(contents.attr('data-animating') == 'true')
		return;

	var title = button.find('.button-title');
	if(textAnimating)
		title.text(textAnimating);

	if(contents.attr('data-expanded') == 'true') {
		contents.attr('data-animating', 'true');
		var height = contents.css('height');
		contents.animate({'height': 0, 'margin-bottom': 0}, 500, function() {
			title.text(textShow);
			contents.hide();
			contents.css('height', height);
			contents.attr('data-expanded', 'false');	
			contents.attr('data-animating', 'false');
		});
	} else {
		var height = contents.css('height');
		contents.css({'height': 0, 'margin-bottom': 0});

		contents.show();
		contents.attr('data-animating', 'true');
		contents.animate({'height': height, 'margin-bottom': targetMarginBottom}, 500, function() {
			title.text(textHide);
			contents.attr('data-expanded', 'true');
			contents.attr('data-animating', 'false');
		});
	}
}

$('#button-btt').click(function() {
	$("html, body").animate({ scrollTop: 0 }, 500);
});

function updateEntry(changed, setHash) {
	var dataSelector = `[data-entry=${selectedEntry}]`;

	$(`.navbar-link${dataSelector}`).addClass('navbar-selected');
	$(`.navbar-link:not(${dataSelector})`).removeClass('navbar-selected');

	if(changed) {
		if(selectedEntry == 'features')
			updateCategory(false);

		var next = $(`.content-holder${dataSelector}`);
		next.css({opacity: 0, 'margin-left': '150px'});

		$('.active-holder').animate({opacity: 0, 'margin-left': '-150px'}, 250, function() {
			$(this).removeClass('active-holder');	
			next.addClass('active-holder');
			next.animate({opacity: 1, 'margin-left': '0px'}, 250);
		});

		if(setHash)
			window.location.hash = `#${selectedEntry}`;
	}
}

function updateCategory(changed) {
	var dataSelector = `[data-category=${selectedCategory}]`;

	$(`.category-navbar-link${dataSelector}`).addClass('navbar-selected');
	$(`.category-navbar-link:not(${dataSelector})`).removeClass('navbar-selected');

	if(changed) {
		var next = $(`.feature-category${dataSelector}`);
		next.css({opacity: 0, 'margin-left': '150px'});

		$('.active-category').animate({opacity: 0, 'margin-left': '-150px'}, 250, function() {
			$(this).removeClass('active-category');	
			next.addClass('active-category');
			next.animate({opacity: 1, 'margin-left': '0px'}, 250);
		});
	}
}

function updateBtt() {
	var top = window.pageYOffset || document.documentElement.scrollTop;
	var bttVisible = top > 200;
	$('#btt-holder').attr('data-enabled', bttVisible);
}

// https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}