export type Nav = {
  name: string,
  href: string,
  icon: string
}

export type Page = {
  name: string,
  href: string,
  current: boolean
}

export type BlogData = {
  nav?: Nav[],
  pagination?: Page[],
  content?: Element,
  type: string
}

export async function fetchBlogData(url?: string): Promise<BlogData> {
  let html: string
  if (!url) {
    html = document.getElementsByTagName('html')[0].innerHTML
  } else {
    const resp = await fetch(url)
    html = await resp.text()
  }

  return await parseBlogData(html)
}

export async function parseBlogData(html: string): Promise<BlogData> {
  const el = document.createElement('html')
  el.innerHTML = html
  const blogData = el.querySelector('[id=blog-data]') || document.createElement('div')
  const context = extractContent(blogData)

  return {
    nav: extractNav(blogData),
    pagination: extractPagination(blogData),
    content: context?.element,
    type: context?.type || 'empty'
  }
}

function extractNav(element: Element): Nav[] | undefined {
  const nav = Array.from(element.querySelectorAll('#blog-data-nav > ul > li > a'))
    .map(e => ({
      name: e.textContent,
      href: e.getAttribute('href'),
      icon: (
        (e.getAttribute('class') || '')
          .split(' ')
          .filter((e) => /^icon-/.test(e))[0] || 'icon-default'
      ).replace(/^icon-/, '')
    } as Nav))

  if (nav.length === 0) return
  return nav
}

function extractPagination(element: Element): Page[] | undefined {
  const pages = Array.from(element.querySelectorAll('#blog-data-page-pagination > ul > li > a'))
    .map((e) => {
      let current: boolean
      if (e.classList.contains('pagination-pager-current')) {
        current = true
      } else if (e.classList.contains('pagination-pager')) {
        current = false
      } else {
        return undefined
      }

      return {
        name: e.textContent,
        href: e.getAttribute('href') || '#',
        current
      } as Page
    })
    .filter(Boolean) as Page[]

  if (pages.length === 0) {
    return
  }

  return pages
}

function extractContent(element: Element) {
  const e = element.querySelector('#blog-data-content > div')
  if (!e) return
  
  return {
    type: e.className,
    element: e
  }
}