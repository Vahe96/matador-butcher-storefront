import React, { useEffect } from 'react'
import { CartDrawer, Footer, Header, useCart } from './SiteChrome.jsx'
import {
  AboutPage,
  BoxDetailPage,
  BoxesPage,
  BusinessPage,
  CatalogPage,
  ContactPage,
  HomePage,
  ProductPage,
  QualityPage,
  usePageMeta,
} from './Pages.jsx'
import { currentPage } from './paths.js'

const pages = {
  home: HomePage,
  catalog: CatalogPage,
  boxes: BoxesPage,
  box: BoxDetailPage,
  product: ProductPage,
  business: BusinessPage,
  quality: QualityPage,
  about: AboutPage,
  contact: ContactPage,
}

const navPage = page => page === 'product' ? 'catalog' : page === 'box' ? 'boxes' : page

function useRevealMotion() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced || !('IntersectionObserver' in window)) return undefined

    const observed = new WeakSet()
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    const observe = root => root.querySelectorAll?.('.reveal').forEach(element => {
      if (observed.has(element)) return
      observed.add(element)
      observer.observe(element)
    })

    observe(document)
    document.documentElement.classList.add('motion-ready')
    const mutationObserver = new MutationObserver(records => records.forEach(record =>
      record.addedNodes.forEach(node => node.nodeType === 1 && observe(node))
    ))
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])
}

export default function App() {
  const requestedPage = currentPage()
  const page = pages[requestedPage] ? requestedPage : 'home'
  const Page = pages[page]
  const cart = useCart()

  usePageMeta(page)
  useRevealMotion()

  return <>
    <Header cart={cart} page={navPage(page)} />
    <main id="main-content" tabIndex="-1">
      <Page cart={cart} />
    </main>
    <Footer />
    <CartDrawer cart={cart} />
  </>
}
