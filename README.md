# jquery.tweetable.js

A simple li'l plugin that lets you make site content easily tweetable.

Inspired (and by 'inspired' I mean 'I stole this') from a recent [New York Times article](http://www.nytimes.com/2013/08/25/arts/television/the-god-of-snl-will-see-you-now.html?partner=rss&emc=rss&_r=0) doing the exact same thing.

## Usage

### The Basics

Using the plugin is super duper easy:

```javascript
$('[data-tweetable]').tweetable();
```

That will grab all elements with the `data-tweetable` attribute and create clickable links out of them.  They're unstyled by default, but those links also are created with a given class (by default `tweetable`) so you can style them to your heart's content.

### Options

Options are pretty simple.

```javascript
// Defaults
{
	dataAttr: 'data-tweetable',
	linkClass: 'tweetable',
	via: null,
	related: null,
	url: window.location.pathname
}
```

The first two should be fairly obvious: `via`, `related`, and `url` all correspond to what you're passing to Twitter in terms of data.