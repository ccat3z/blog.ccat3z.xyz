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

export function getContent () {
  log.i('utils', 'get content')
  var e = $('#blog-data-content > div')
  return {
    type: e.attr('class'),
    content: e.html()
  }
}

// home page

export function getAuthorInfoInHome (content = null) {
  if (content === null) content = getContent()

  if (content.type === 'home') {
    var author = $(content.content).filter('div.author')
    return {
      name: $('.name', author).text(),
      avatar: $('img.avatar', author).attr('src'),
      description: $('.description', author).text()
    }
  }
}

export function getRealContentInHome (content = null) {
  if (content === null) content = getContent()

  if (content.type === 'home') {
    return $(content.content).filter('div.message').html()
  }
}

export function refreshBlogData (data) {
  $('#blog-data').html($('#blog-data', $('<div></div>').append($(data))).html())
}

export const log = {
  i: (tag, msg) => console.log('[' + tag + '] ' + msg),
  e: (tag, msg) => console.error('[' + tag + '] ' + msg)
}
