import $ from 'jquery'

export function getNavs () {
  return $('#blog-data-nav > ul > li > a').map((i, e) => {
    var $e = $(e)
    return {
      name: $e.text(),
      href: $e.attr('href'),
      icon: $e.attr('class').split(' ').filter((e) => /^icon-/.test(e))[0].replace(/^icon-/, '')
    }
  }).toArray()
}

let contentId = 0

export function getBlogPageData () {
  var e = $('#blog-data-content > div')
  return {
    id: contentId++,
    type: e.attr('class'),
    content: e.html(),
    globalDataObject: window.blogPageData !== undefined ? window.blogPageData : null
  }
}

export function refreshBlogData (data) {
  $('title').html($('title', $('<div></div>').append($(data))).html())
  $('#blog-data').html($('#blog-data', $('<div></div>').append($(data))).html())
}

export const log = {
  d: (tag, msg) => console.debug('[' + tag + '] ' + msg), // eslint-disable-line no-undef
  i: (tag, msg) => console.info('[' + tag + '] ' + msg),
  w: (tag, msg) => console.warn('[' + tag + '] ' + msg),
  e: (tag, msg) => console.error('[' + tag + '] ' + msg)
}

export function rgb2Hex (rgb) {
  return '#' + rgb.replace(/rgb\((\d*), (\d*), (\d*)\)/, '$1 $2 $3').split(' ').map((n) => ('0' + parseInt(n, 10).toString(16)).slice(-2)).join('')
}
