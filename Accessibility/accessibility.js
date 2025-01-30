// this code is designed to be placed into your theme javascript
// if you have customized your javascript before, this should be familiar to you

function accessibilityChecking(){
	function checkAlly(e){
		// console.log('checking ally');
		var allyButtonFlagExists = (document.querySelector("[data-btn-id='rce-a11y-btn']").nextSibling != null) ? true : false;
		var allyDialogIsHidden = (document.querySelector('div[role="dialog"][aria-label="Accessibility Checker"]') != null) ? false : true;
		if (allyButtonFlagExists &&	allyDialogIsHidden && !allySeen){
			// console.log('show accessibility pane');
			document.querySelector("[data-btn-id='rce-a11y-btn']").click();
			allySeen = true;
		}
	}

	var allySeen = false;

	function addListener(selector, path){
		if (! path.test(window.location.pathname) ){
			return false;
		}
		var target = document.querySelector(selector);
		if (target != null && target.getAttribute('listener') !== 'true'){
			console.log('adding ally check');
			target.addEventListener('mouseover', checkAlly);
			target.setAttribute('listener', 'true');
			return true;
		}
		return false;
	}

	// global announcements
	addListener('#tab-announcements form button[type="submit"]',/accounts\/\d+\/settings/);
	// pages
	addListener('form .page-edit__action_buttons .save_and_publish',/courses\/\d+\/pages/);
	addListener('form .page-edit__action_buttons .submit',/courses\/\d+\/pages/);
	// course announcements
	addListener("[data-testid='announcement-submit-button']",/courses\/\d+\/discussion_topics/);
}

// Triggering any code can be challenging due to the way that Canvas renders pages
// below is a general approach

// these are all called by the mutation observer
// it's a bit of overkill, but React makes it hard.
function myCallback(mutations) {
	accessibilityChecking();
    // you could place other functions here that do not get triggered by a document ready functions
}

// this is a generic mutation observer
// and various functions can be called in the myCallback function
function docMonitor(){
	// create an instance of `MutationObserver` named `observer`, 
	// passing it the callback function

	var observer = new MutationObserver(myCallback);

	// because react has the whole dom in memory, I think document is the most reliable option
	observer.observe(document, {subtree: true, childList: true});
}

// this is the ready stuff
function ready(fn) {
    if (document.readyState !== 'loading') {
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  
  // when the document is loaded we kick things off
  ready(function () {
      // establish the mutation observer once the document is ready
      docMonitor();
  });
  