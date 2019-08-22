Kenzap Features
Contributors: kenzap
Tags: features, info, services, about
Requires at least: 5.1
Tested up to: 5.2
Stable tag: 1.1.1
Donate link: https://kenzap.com/wordpress-plugin-donation-page/
Requires PHP: 5.6
License: GPL2+
License URI: http://www.gnu.org/licenses/gpl-2.0.txt

== Description ==

A beautiful and easy customizable set of Gutenberg blocks to create features section for the new editor. Easily adjust the following parameters:

List features as carousel
Assign links
Custom icons (JPG, PNG, SVG)
Increase offset between items
Set background color or image
Wide and narrow layout support

== Installation ==

This plugin can be installed directly from your site.

1. Log in and navigate to _Plugins &rarr; Add New_.
2. Type "Kenzap Features” into the Search and hit Enter.
3. Locate the Kenzap Features plugin in the list of search results and click **Install Now**.
4. Once installed, click the Activate link.
5. Go to Pages > Add New > Find Kenzap Feature List block.
6. Adjust Container > Max width setting if elements are not displayed properly. 


It can also be installed manually.

1. Download the Kenzap Features plugin from WordPress.org.
2. Unzip the package and move to your plugins directory.
3. Log into WordPress and navigate to the Plugins screen.
4. Once installed, click the Activate link.
5. Go to Pages > Add New > Find Kenzap Feature List blocks.
6. Adjust Container > Max width setting if elements are not displayed properly. 


== Frequently Asked Questions ==

1. What is this plugin for?
To extend your current theme with Features section

2. Why columns look narrow?
Depending on your front page container layout type you may need to reduce Max width property in Inspector container


== Upgrade Notice ==

This is a first release

== Screenshots ==
1. Features layout variation 1
2. Features layout variation 2
2. Features layout variation 3


== Changelog ==

= v1.0.1 =
New: Localization support. Files affected:
plugin.php
src/init.php

New: Text Domain added to translatable strings. Files affected:
src/feature-list-1/block.js
src/feature-list-1/edit.js
src/feature-list-2/block.js
src/feature-list-2/edit.js
src/feature-list-3/block.js
src/feature-list-3/edit.js

New: Minimal plugin requirements check added. Files affected:
plugin.php

New: New Inspector control feature added called "Responsive paddings". Files affected:
src/feature-list-2/style.scss
src/commonComponents/containercontainer.js
src/feature-list-2/block.js
src/feature-list-2/edit.js

= v1.0.0 =
New: Initial release

= v1.1.0 =
New: Typography settings introduced
Update: More settings available under Background and Container panes 

= v1.1.1 =
Update: vulnerability update