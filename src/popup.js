// jquery required
var $ = window.$

var markup = '<div class="popup-overlay"></div>\
<div class="popup-alert">\
  <div class="icon custom"></div>\
  <div class="icon info"></div>\
  <div class="icon success">\
    <span class="line tip"></span>\
    <span class="line long"></span>\
    <div class="placeholder"></div>\
    <div class="fix"></div>\
  </div>\
  <div class="icon warn">\
    <span class="body"></span>\
    <span class="dot"></span>\
  </div>\
  <div class="icon error">\
    <span class="line left"></span>\
    <span class="line right"></span>\
  </div>\
  <h2></h2>\
  <p></p>\
  <button class="cancel"></button>\
  <button class="ok"></button>\
</div>'
$(function(){
  $('body').append(markup)
})

var _defaults = {
  icon: null,
  image: null,
  okBtn: 'OK',
  cancelBtn: 'Cancel',
  hasOK: true,
  hasCancel: false,
  timeout: null
}
popup.defaults = defaults
window.popup = popup

function defaults(settings){
  $.extend(_defaults, settings)
}

function popup(options, callback){
  var opt = $.extend({}, _defaults, options)
  if (options.cancelBtn) { // options.cancelBtn
    opt.hasCancel = true
  }
  if (opt.timeout) {
    opt.hasOK = false
    opt.hasCancel = false
  }
  if (opt.image) {
    opt.icon = 'custom'
  }
  var $overlay = $('.popup-overlay')
  var $alert = $('.popup-alert')
  var $icons = $alert.find('.icon')

  function onRespond(ok){
    popOut()
    if (callback) callback(ok)
  }
  function popIn(){
    $overlay.show()
    $alert.show()
  }
  function popOut(){
    $alert.hide()
    $overlay.hide()
  }

  $alert.undelegate('.ok', 'click')
    .undelegate('.cancel', 'click')
    .delegate('.ok', 'click', function onOK(){
      onRespond(true)
    })
    .delegate('.cancel', 'click', function onCancel(){
      onRespond(false)
    })
  $alert.find('h2').text(opt.title)
  $alert.find('p').text(opt.text)
  $alert.find('.icon').hide()
  $alert.find('button').hide()

  if (opt.icon) {
    var $icon = $icons.filter('.' + opt.icon)
    if (opt.image) {
      $icon.css({
        'background-image': 'url(' + opt.image + ')'
      })
    }
    $icon.show()
  }
  if (opt.hasOK) {
    $alert.find('.ok')
      .text(opt.okBtn)
      .show()
  }
  if (opt.hasCancel) {
    $alert.find('.cancel')
      .text(opt.cancelBtn)
      .show()
  }
  if (opt.timeout) setTimeout(popOut, opt.timeout)
  popIn()
}
