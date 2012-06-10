// Generated by CoffeeScript 1.3.3

/*global Enumerator: false, ActiveXObject: false
*/


(function() {
  "use strict";

  var ClippableBehavior, Staminia;

  window.Staminia = window.Staminia || {};

  Staminia = window.Staminia;

  ClippableBehavior = (function() {

    function ClippableBehavior(element) {
      var _this = this;
      this.element = $(element);
      if (!this.detectFlashSupport()) {
        return;
      }
      this.initializeBridge();
      this.element.on("mouseover", function() {
        return _this.handleHover();
      });
    }

    ClippableBehavior.prototype.handleHover = function() {
      this.htmlBridge.text(this.element.attr("data-clipboard-text"));
      this.flashBridge.attr("data-original-title", this.element.attr("data-copy-hint"));
      this.flashBridge.attr("data-copy-hint", this.element.attr("data-copy-hint"));
      this.flashBridge.attr("data-copied-hint", this.element.attr("data-copied-hint"));
      return this.flashBridge.css({
        top: this.element.offset().top + "px",
        left: this.element.offset().left + "px"
      });
    };

    ClippableBehavior.prototype.initializeBridge = function() {
      var content;
      this.htmlBridge = $("#global-clippy-instance");
      if (this.htmlBridge.length === 0) {
        this.htmlBridge = $("<div></div>").attr("id", "global-clippy-instance").hide();
        $(document.body).append(this.htmlBridge);
      }
      this.flashBridge = $("#global-clippy-flash-bug");
      if (this.flashBridge.length === 0) {
        content = "<object classid=\"clsid:d27cdb6e-ae6d-11cf-96b8-444553540000\" id=\"global-clippy-object-tag\" width=\"100%\" height=\"100%\">\n  <param name=\"movie\" value=\"flash/clippy.swf\"/>\n  <param name=\"FlashVars\" value=\"id=global-clippy-instance\">\n  <param name=\"allowScriptAccess\" value=\"always\" />\n  <param name=\"scale\" value=\"exactfit\">\n  <embed src=\"flash/clippy.swf\"\n         width=\"100%\" height=\"100%\"\n         name=\"global-clippy-object-tag\"\n         FlashVars=\"id=global-clippy-instance\"\n         allowScriptAccess=\"always\"\n         scale=\"exactfit\">\n  </embed>\n</object>";
        this.flashBridge = $("<div>" + content + "</div>").attr("id", "global-clippy-flash-bug");
        this.flashBridge.css({
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          "z-index": "9998",
          width: "14px",
          height: "14px"
        });
        this.flashBridge.attr("data-original-title", Staminia.messages.copy_to_clipboard);
        this.flashBridge.attr("data-copied-hint", Staminia.messages.copied_to_clipboard);
        this.flashBridge.attr("data-copy-hint", Staminia.messages.copy_to_clipboard);
        this.flashBridge.tooltip({
          trigger: "manual",
          placement: "bottom"
        });
        this.flashBridge.on("mouseover", function() {
          var $element;
          $element = $(this);
          $element.attr("data-original-title", $element.attr("data-copy-hint"));
          $element.tooltip("show");
          return $element;
        });
        this.flashBridge.on("mouseout", function() {
          var $element;
          $element = $(this);
          $element.tooltip("hide");
          return $element.css({
            left: "-9999px",
            top: "-9999px"
          });
        });
        this.flashBridge.on("clippable:copied", function() {
          var $element;
          $element = $(this);
          $element.attr("data-original-title", $element.attr("data-copied-hint"));
          $element.tooltip("show");
          return Staminia.ClippableBehavior.handleCopied();
        });
        $(document.body).append(this.flashBridge);
      }
    };

    ClippableBehavior.prototype.detectFlashSupport = function() {
      var flashSupported;
      flashSupported = false;
      try {
        new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
        flashSupported = true;
      } catch (error) {
        if ((navigator.mimeTypes["application/x-shockwave-flash"] != null) && (navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin != null)) {
          flashSupported = true;
        }
      }
      if (!flashSupported) {
        this.element.addClass("clippy-disabled");
        this.element.tooltip({
          "title": Staminia.messages.no_flash,
          "placement": "bottom"
        });
      }
      return flashSupported;
    };

    return ClippableBehavior;

  })();

  Staminia.ClippableBehavior = ClippableBehavior;

  Staminia.ClippableBehavior.handleCopied = function() {
    return $("#global-clippy-flash-bug");
  };

  window.clippyCopiedCallback = function() {
    return $("#global-clippy-flash-bug").trigger("clippable:copied");
  };

  $(function() {
    return $(this).find(".js-clippy").each(function() {
      return new Staminia.ClippableBehavior(this);
    });
  });

}).call(this);