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

export function getContent () {
  var e = $('#blog-data-content > div')
  return {
    id: contentId++,
    type: e.attr('class'),
    content: e.html()
  }
}

// home page

export function getAuthorInfo (content) {
  if (content.type === 'home') {
    var author = $(content.content).filter('div.author')
    return {
      name: $('.name', author).text(),
      avatar: $('img.avatar', author).attr('src'),
      description: $('.description', author).text()
    }
  } else {
    return null
  }
}

export function getRealContent (content) {
  if (content.type === 'home') {
    return $(content.content).filter('div.message').html()
  } else {
    return content.content
  }
}

// posts list

export function getPostList (content) {
  if (content.type === 'posts-list') {
    return $('#blog-data-content > div > ul > li').map((i, e) => ({
      title: $('a.post-title', e).html(),
      href: $('a.post-title', e).attr('href'),
      date: $('.post-date', e).text(),
      shortDescription: $('.post-short-description', e).text(),
      tags: $('.post-tags > li > a.post-tag', e).map((i, e) => ({
        name: $(e).text(),
        href: $(e).attr('href')
      })).toArray()
    })).toArray()
  } else {
    return null
  }
}

window.f = () => getPostList(getContent())

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
