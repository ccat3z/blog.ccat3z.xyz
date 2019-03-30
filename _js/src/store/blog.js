import $ from 'jquery'

function getBlogData () {
  return $('#blog-data')
}

function refreshBlogData (doc) {
  let $blogData = getBlogData()

  let $doc = $('<div></div>').append($(doc))
  $('title').html($('title', $doc).html())
  $blogData.html($('#blog-data', $doc).html())

  return $blogData
}

function getBlogContent (data) {
  let $blogContent = $('#blog-data-content > div', data)

  return {
    pageType: $blogContent.attr('class'),
    content: $blogContent.html()
  }
}

function getPagination (data) {
  var pagination = $('#blog-data-page-pagination > ul > li > a', data).toArray().map((e) => {
    var $e = $(e)
    var type
    if ($e.hasClass('pagination-pager-prev')) type = 'prev'
    else if ($e.hasClass('pagination-pager-next')) type = 'next'
    else if ($e.hasClass('pagination-pager-current')) type = 'current'
    else type = 'page'

    return {
      type,
      name: $e.text(),
      href: $e.attr('href')
    }
  }).filter((e) => ['current', 'page'].includes(e.type))
    .sort((a, b) => parseInt(a.name) > parseInt(b.name))
    .map((e) => e.href)

  // if no pagination
  if (pagination.length === 0) {
    pagination[0] = '#'
  }

  return pagination
}

function getNav (data) {
  return $('#blog-data-nav > ul > li > a', data).map((i, e) => {
    var $e = $(e)
    return {
      name: $e.text(),
      href: $e.attr('href'),
      icon: $e.attr('class').split(' ').filter((e) => /^icon-/.test(e))[0].replace(/^icon-/, '')
    }
  }).toArray()
}

const state = {
  _blogData: getBlogData()
}

const getters = {
  _blogContent: state => getBlogContent(state._blogData),
  pageType: (state, getters) => getters._blogContent.pageType,
  content: (state, getters) => getters._blogContent.content,
  pagination: (state) => getPagination(state._blogData),
  nav: (state) => getNav(state._blogData)
}

const mutations = {
  reloadBlogData: (state, doc) => {
    state._blogData = refreshBlogData(doc)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
