import { Component, AfterViewInit } from '@angular/core';

declare var $: any;
declare var skel: any;

import '../../public/js/jquery.scrollex.min.js';
@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements AfterViewInit {

  //declare var $:JQueryStatic;

  constructor() {
    // Do stuff
  }

  ngAfterViewInit() {
    // Menu initialization. Since the menu element is dynamic (does not exist at startup, since it is a decendent of the
    // angular zone) we need to initialize it's jquery after the view is finished rendering. The code below will init the
    // menu so that it properly propagates.

    // get reference to body and #menu element
    let $menu = $('#menu');
    let $body = $('body');
    let	$window = $(window);
    let $header = $('#header');
    let $banner = $('#banner');

    // Header.
    if (skel.vars.IEVersion < 9)
      $header.removeClass('alt');

    if ($banner.length > 0
    &&	$header.hasClass('alt')) {

      $window.on('resize', function() { $window.trigger('scroll'); });

      $banner.scrollex({
        bottom:		$header.outerHeight(),
        terminate:	function() { $header.removeClass('alt'); },
        enter:		function() { $header.addClass('alt'); },
        leave:		function() { $header.removeClass('alt'); }
      });
    }

    // Stops the menu from being opened again.
    $menu._locked = false;

    $menu._lock = function() {
      if ($menu._locked) {
        return false;
      }
      $menu._locked = true;

      window.setTimeout(function() {
        $menu._locked = false;
      }, 350);

      return true;
    };

    // grabs a lock then displays the menu
    $menu._show = function() {
      if ($menu._lock())
        $body.addClass('is-menu-visible');
    };

    // removes a lock then hides the menu
    $menu._hide = function() {
      if ($menu._lock())
        $body.removeClass('is-menu-visible');
    };

    // same thing as above, alternate function
    $menu._toggle = function() {
      if ($menu._lock())
        $body.toggleClass('is-menu-visible');
    };

    $menu
      .appendTo($body)
      .on('click', function(event) {
        // prevent element from bubbling up propagation tree
        event.stopPropagation();
        // hide
        $menu._hide();
      })
      .find('.inner')
      .on('click', '.close', function(event) {
        // stop all dat propagation
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();
        // hide
        $menu._hide();
      })
      .on('click', function(event) {
        // we really hate propagation if you haven't noticed
        event.stopPropagation();
      })
      .on('click', 'a', function(event) {
        // TODO use angular router here instead of jquery href
        if ($(this).attr('href')) {
        
          let href = $(this).attr('href');

          event.preventDefault();
          event.stopPropagation();

          // hide
          $menu._hide();

          // redirect
          window.setTimeout(function() {
            window.location.href = href;
          }, 350);
        }
      });

      $body
        .on('click', 'a[href="#menu"]', function(event) {
          event.stopPropagation();
          event.preventDefault();
          // toggle.
        $menu._toggle();
        })
        .on('keydown', function(event) {
          // Hide on escape.
            if (event.keyCode == 27)
              $menu._hide();
        });
  }


}
