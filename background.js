// Copyright (c) 2010 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// A generic onclick callback function.
function onMenuItemClick(info, tab) {
  chrome.extension.getBackgroundPage().console.log("item " + info.menuItemId + " was clicked");
  chrome.extension.getBackgroundPage().console.log("info: " + JSON.stringify(info));
  chrome.extension.getBackgroundPage().console.log("tab: " + JSON.stringify(tab));

  chrome.tabs.sendMessage(tab.id, "doTheThing", function(done) {
  	chrome.extension.getBackgroundPage().console.log('Done doing the thing: ', done)
	});
}

var id = chrome.contextMenus.create({
	"title": 'DERP',
	"contexts":['all'],
	"onclick": onMenuItemClick
});
console.log("'" + "all" + "' item:" + id);
