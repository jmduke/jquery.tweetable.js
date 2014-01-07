// Copy-pasted boilerplate from dev.twitter.com because I am a bad programmer
(function() {
  if (window.__twitterIntentHandler) return;
  var intentRegex = /twitter\.com(\:\d{2,4})?\/intent\/(\w+)/,
      windowOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
      width = 550,
      height = 420,
      winHeight = screen.height,
      winWidth = screen.width;
 
  function handleIntent(e) {
    e = e || window.event;
    var target = e.target || e.srcElement,
        m, left, top;
 
    while (target && target.nodeName.toLowerCase() !== 'a') {
      target = target.parentNode;
    }
 
    if (target && target.nodeName.toLowerCase() === 'a' && target.href) {
      m = target.href.match(intentRegex);
      if (m) {
        left = Math.round((winWidth / 2) - (width / 2));
        top = 0;
 
        if (winHeight > height) {
          top = Math.round((winHeight / 2) - (height / 2));
        }
 
        window.open(target.href, 'intent', windowOptions + ',width=' + width +
                                           ',height=' + height + ',left=' + left + ',top=' + top);
        e.returnValue = false;
        e.preventDefault && e.preventDefault();
      }
    }
  }
 
  if (document.addEventListener) {
    document.addEventListener('click', handleIntent, false);
  } else if (document.attachEvent) {
    document.attachEvent('onclick', handleIntent);
  }
  window.__twitterIntentHandler = true;
}());

// Here's the real stuff.
(function($) {

	var options = {
		dataAttr: 'data-tweetable',
		linkClass: 'tweetable',
		via: null,
		related: null,
		url: window.location.pathname
	};

    // Tried to think of some sort of "options optional" pun.  Did not succeed.
 	$.tweetable = (function () {
    	return { options: options };
  	})();

    $.fn.tweetable = function(options) {

    	// Things I learned on a Thursday night: extend() is basically black magic
		$.extend($.tweetable.options, options);

    	var $elements = $(this);

    	return $elements.each(function () {

    		var $e = $(this);

      		// If the particular selector is 'blank', we default to the text within.
 			// Otherwise, we grab the value of the selector.
 		var tweetText = $e.attr($.tweetable.options.dataAttr);
	      	if (tweetText == "" || tweetText === undefined)
	    		var tweetText = $e.text();

	    	// Let's go ahead and be a stickler about enforcing that 140-char limit.
	    	if (tweetText.length > 140) {
	    		console.error("That's, like, more than 140 characters.  Do you even *get* Twitter?")
	    		return $e;
	    	}

	    	// %20 all the things
	    	tweetText = encodeURIComponent(tweetText);
	    	
	    	// Here we make the actual link.  Goodie.
	    	var twitterLink = 'https://twitter.com/intent/tweet?';
	    	twitterLink += "text=" + tweetText + "";
	    	twitterLink += "&url=" + encodeURIComponent($.tweetable.options.url)
	    	if($.tweetable.options.via)
	    		twitterLink += "&via=" + $.tweetable.options.via
	    	if($.tweetable.options.related)
	    		twitterLink += "&related=" + $.tweetable.options.related

	    	$e.wrap('<a class="' + $.tweetable.options.linkClass + '" href="' + twitterLink + '"/>');
	        return $e;
	    });
    };

}( jQuery ));
