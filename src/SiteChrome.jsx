import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  ArrowRight, Check, ChevronDown, Menu, Minus, PackageCheck, Search,
  ShoppingBag, Trash2, X
} from 'lucide-react'
import { assetPath, sitePath } from './paths.js'
import { formatPrice } from './data.js'

const nav = [
  ['Տեսականի', 'catalog/'],
  ['Picnic Box', 'boxes/'],
  ['Ռեստորաններին', 'business/'],
  ['Մեր որակը', 'quality/'],
  ['Մեր մասին', 'about/'],
]

export function useCart() {
  const [items, setItems] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem('matador-cart') || '[]')
      return Array.isArray(parsed) ? parsed.filter(item => item && typeof item.key === 'string' && typeof item.name === 'string' && Number.isFinite(item.price) && Number.isFinite(item.quantity) && item.quantity > 0) : []
    }
    catch { return [] }
  })
  const [open, setOpen] = useState(false)
  const [lastAdded, setLastAdded] = useState('')

  useEffect(() => {
    try { localStorage.setItem('matador-cart', JSON.stringify(items)) }
    catch { /* Storage can be unavailable in private or restricted browsing modes. */ }
  }, [items])
  useEffect(() => {
    if (!lastAdded) return undefined
    const timeout = setTimeout(() => setLastAdded(''), 2600)
    return () => clearTimeout(timeout)
  }, [lastAdded])

  const add = item => {
    const key = item.key || item.id
    setItems(current => {
      const existing = current.find(entry => entry.key === key)
      return existing
        ? current.map(entry => entry.key === key ? { ...entry, quantity: entry.quantity + 1 } : entry)
        : [...current, { ...item, key, quantity: 1 }]
    })
    setLastAdded(item.name)
  }
  const change = (key, delta) => setItems(current => current
    .map(item => item.key === key ? { ...item, quantity: item.quantity + delta } : item)
    .filter(item => item.quantity > 0))
  const remove = key => setItems(current => current.filter(item => item.key !== key))
  const clear = () => setItems([])
  const count = items.reduce((sum, item) => sum + item.quantity, 0)
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  return { items, add, change, remove, clear, count, total, open, setOpen, lastAdded }
}

export function Header({ cart, page }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const mobileRef = useRef(null)
  const mobileTriggerRef = useRef(null)
  useEffect(() => {
    if (!mobileOpen) return undefined
    const inertTargets = [...document.querySelectorAll('.site-header, #main-content, .site-footer')]
    inertTargets.forEach(element => { element.inert = true })
    requestAnimationFrame(() => mobileRef.current?.querySelector('button')?.focus())
    const onKey = event => {
      if (event.key === 'Escape') setMobileOpen(false)
      if (event.key !== 'Tab') return
      const focusable = [...mobileRef.current.querySelectorAll('a[href], button:not([disabled])')]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    document.body.classList.add('nav-open')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('nav-open')
      inertTargets.forEach(element => { element.inert = false })
      mobileTriggerRef.current?.focus()
    }
  }, [mobileOpen])

  return <>
    <a className="skip-link" href="#main-content">Անցնել բովանդակությանը</a>
    <header className="site-header">
      <div className="shell header-inner">
        <a className="brand" href={sitePath('')} aria-label="Matador — գլխավոր էջ">
          <img src={assetPath('/images/matador-bull-mark-sm.webp')} width="54" height="46" alt="" />
          <span><strong>MATADOR</strong><small>BUTCHER SHOP</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Հիմնական նավիգացիա">
          {nav.map(([label, href]) => <a key={href} aria-current={page === href.split('/')[0] ? 'page' : undefined} className={page === href.split('/')[0] ? 'is-current' : ''} href={sitePath(href)}>{label}</a>)}
        </nav>
        <div className="header-actions">
          <a className="header-search" href={sitePath('catalog/#catalog-tools')} aria-label="Որոնել տեսականում"><Search /></a>
          <button className="cart-trigger" type="button" onClick={() => cart.setOpen(true)} aria-label={`Բացել պատվերի ցուցակը․ ${cart.count} ապրանք`}>
            <ShoppingBag /><span>{cart.count}</span>
          </button>
          <button ref={mobileTriggerRef} className="mobile-trigger" type="button" aria-expanded={mobileOpen} aria-controls="mobile-navigation" aria-label="Բացել մենյուն" onClick={() => setMobileOpen(true)}><Menu /></button>
        </div>
      </div>
    </header>
    <div className={`mobile-scrim ${mobileOpen ? 'is-open' : ''}`} onClick={() => setMobileOpen(false)} />
    <aside ref={mobileRef} id="mobile-navigation" className={`mobile-nav ${mobileOpen ? 'is-open' : ''}`} aria-hidden={!mobileOpen}>
      <div className="mobile-nav-top"><span>MATADOR</span><button type="button" onClick={() => setMobileOpen(false)} aria-label="Փակել մենյուն"><X /></button></div>
      <nav aria-label="Բջջային նավիգացիա">
        {nav.map(([label, href], index) => <a key={href} aria-current={page === href.split('/')[0] ? 'page' : undefined} href={sitePath(href)}><small>0{index + 1}</small>{label}<ArrowRight /></a>)}
        <a aria-current={page === 'contact' ? 'page' : undefined} href={sitePath('contact/')}><small>06</small>Կապ<ArrowRight /></a>
      </nav>
      <p>Թարմ միս։ Կայուն չափանիշ։ Իրական համ։</p>
    </aside>
  </>
}

export function Footer() {
  return <footer className="site-footer">
    <div className="shell footer-top">
      <div className="footer-brand">
        <img src={assetPath('/images/matador-logo.webp')} width="360" height="411" alt="Matador Butcher Shop" loading="lazy" />
        <p>Թարմ միս, հստակ կտրվածք և կայուն որակ՝ ձեր սեղանի ու պրոֆեսիոնալ խոհանոցի համար։</p>
      </div>
      <div><h2>Բացահայտեք</h2><a href={sitePath('catalog/')}>Տեսականի</a><a href={sitePath('boxes/')}>Picnic Box-եր</a><a href={sitePath('quality/')}>Մեր որակը</a><a href={sitePath('about/')}>Մեր մասին</a></div>
      <div><h2>Բիզնես</h2><a href={sitePath('business/')}>Ռեստորաններին</a><a href={sitePath('business/#business-form')}>Մատակարարման հայտ</a><a href={sitePath('contact/')}>Կապ</a><span>Կտրվածք՝ ըստ տեխնոլոգիական քարտի</span></div>
      <div className="footer-cta"><p><small>Պատրա՞ստ եք ընտրել</small><strong>Ճիշտ միսը սկսվում է ճիշտ խորհրդից</strong></p><a className="button button-brass" href={sitePath('catalog/')}>Դիտել տեսականին <ArrowRight /></a></div>
    </div>
    <div className="shell footer-bottom"><span>© {new Date().getFullYear()} Matador Butcher Shop</span><span>Պատվերը հաստատվում է օպերատորի հետ · Առցանց վճարում չկա</span></div>
  </footer>
}

export function ProductCard({ product, onAdd }) {
  const [weight, setWeight] = useState(product.unit === 'կգ' ? .5 : 1)
  const finalPrice = product.unit === 'կգ' ? product.price * weight : product.price
  const weightLabel = product.unit === 'կգ' ? `${weight === .5 ? '500 գ' : '1 կգ'}` : product.unit
  const detailHref = sitePath(`product/?id=${encodeURIComponent(product.id)}`)
  return <article className="product-card reveal">
    <a className="product-media" href={detailHref} aria-label={`${product.name}․ դիտել մանրամասները`}>
      <picture>
        <source media="(max-width: 600px)" srcSet={assetPath(product.smallImage)} />
        <img src={assetPath(product.image)} width="720" height="720" alt={product.alt} loading="lazy" decoding="async" />
      </picture>
      {product.badge && <span>{product.badge}</span>}
    </a>
    <div className="product-copy">
      <p>{product.cooking}</p>
      <h3><a href={detailHref}>{product.name}</a></h3>
      <span>{product.description}</span>
      <div className="product-buy">
        <strong>{formatPrice(finalPrice)}<small>/ {weightLabel}</small></strong>
        {product.unit === 'կգ' && <label><span className="sr-only">Ընտրել քաշը</span><select value={weight} onChange={event => setWeight(Number(event.target.value))}><option value="0.5">500 գ</option><option value="1">1 կգ</option></select><ChevronDown /></label>}
        <button type="button" onClick={() => onAdd({
          id: product.id, key: `${product.id}-${weightLabel}`, name: `${product.name} · ${weightLabel}`,
          price: finalPrice, image: product.smallImage, meta: product.cooking,
        })} aria-label={`${product.name}, ${weightLabel}՝ ավելացնել պատվերի ցուցակում`}><ShoppingBag /><span>Ավելացնել</span></button>
      </div>
    </div>
  </article>
}

export function BoxCard({ box, onAdd, featured = false }) {
  const href = sitePath(`box/?id=${box.id}`)
  return <article className={`box-card reveal ${featured ? 'box-card-featured' : ''}`}>
    <a className="box-card-media" href={href} aria-label={`${box.name}․ դիտել ամբողջական կազմը`}>
      <picture><source media="(max-width: 600px)" srcSet={assetPath(box.smallImage)} /><img src={assetPath(box.image)} width="1200" height="900" alt={box.alt} loading="lazy" decoding="async" /></picture>
      <span>{box.people} հոգու համար</span>
    </a>
    <div className="box-card-copy">
      <div><p>{box.grills} գրիլ · {box.meatWeight} միս</p><strong>{formatPrice(box.price)}</strong></div>
      <h3><a href={href}>{box.name}</a></h3><p>{box.tagline}</p>
      <ul>{[...box.meats.slice(0, 2), ...box.extras.slice(0, 2)].map(item => <li key={item}>{item}</li>)}</ul>
      <div className="box-card-actions"><a href={href}>Ամբողջական կազմը <ArrowRight /></a><button type="button" aria-label={`${box.name}՝ ավելացնել պատվերի ցուցակում`} onClick={() => onAdd({ id: box.id, key: `box-${box.id}`, name: box.name, price: box.price, image: box.smallImage, meta: `${box.people} հոգու համար` })}><ShoppingBag /> Ավելացնել</button></div>
    </div>
  </article>
}

export function CartDrawer({ cart }) {
  const closeRef = useRef(null)
  const [formOpen, setFormOpen] = useState(false)
  const [sent, setSent] = useState(false)
  useEffect(() => {
    if (!cart.open) return undefined
    const previous = document.activeElement
    const inertTargets = [...document.querySelectorAll('.site-header, #main-content, .site-footer, .mobile-nav')]
    inertTargets.forEach(element => { element.inert = true })
    document.body.classList.add('cart-open')
    requestAnimationFrame(() => closeRef.current?.focus())
    const onKey = event => {
      if (event.key === 'Escape') cart.setOpen(false)
      if (event.key !== 'Tab') return
      const drawer = closeRef.current?.closest('.cart-drawer')
      const focusable = [...(drawer?.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled])') || [])]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable.at(-1)
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('cart-open')
      inertTargets.forEach(element => { element.inert = false })
      previous?.focus?.()
    }
  }, [cart.open])

  const submit = event => {
    event.preventDefault()
    setSent(true)
  }
  return <>
    <div className={`cart-scrim ${cart.open ? 'is-open' : ''}`} onClick={() => cart.setOpen(false)} />
    <aside className={`cart-drawer ${cart.open ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Պատվերի ցուցակ" aria-hidden={!cart.open}>
      <div className="cart-head"><div><small>Ձեր ընտրությունը</small><h2>Պատվերի ցուցակ</h2></div><button ref={closeRef} type="button" onClick={() => cart.setOpen(false)} aria-label="Փակել պատվերի ցուցակը"><X /></button></div>
      {sent ? <div className="cart-success"><span><Check /></span><h3>Հարցման ձևը լրացված է</h3><p>Սա frontend demo է․ տվյալը չի փոխանցվել։ Matador-ի իրական կապի ալիքը միացնելուց հետո այս քայլը կուղարկի հարցումը մասնագետին։</p><button type="button" onClick={() => { setSent(false); setFormOpen(false); cart.setOpen(false) }}>Փակել</button></div>
      : cart.items.length === 0 ? <div className="cart-empty"><ShoppingBag /><h3>Ցուցակը դեռ դատարկ է</h3><p>Ընտրեք միսը կամ պատրաստի Picnic Box-ը, հետո ուղարկեք մեկ ընդհանուր հարցում։</p><a href={sitePath('catalog/')} onClick={() => cart.setOpen(false)}>Ընտրել տեսականուց <ArrowRight /></a></div>
      : <>
        <div className="cart-list">{cart.items.map(item => <article key={item.key}>
          <img src={assetPath(item.image)} width="84" height="84" alt="" />
          <div><small>{item.meta}</small><h3>{item.name}</h3><strong>{formatPrice(item.price)}</strong><div><button type="button" onClick={() => cart.change(item.key, -1)} aria-label="Պակասեցնել քանակը"><Minus /></button><span>{item.quantity}</span><button type="button" onClick={() => cart.change(item.key, 1)} aria-label="Ավելացնել քանակը">+</button></div></div>
          <button type="button" onClick={() => cart.remove(item.key)} aria-label={`${item.name}․ հեռացնել`}><Trash2 /></button>
        </article>)}</div>
        <div className="cart-total"><span>Նախնական ընդհանուր</span><strong>{formatPrice(cart.total)}</strong><small>Վերջնական քաշն ու արժեքը կհաստատվեն պատվերը հավաքելուց առաջ։</small></div>
        {!formOpen ? <button className="cart-submit" type="button" onClick={() => setFormOpen(true)}>Շարունակել հարցումը <ArrowRight /></button>
        : <form className="cart-form" onSubmit={submit}><h3>Ինչպե՞ս կապվենք ձեզ հետ</h3><label>Անուն<input required name="name" autoComplete="name" /></label><label>Հեռախոս<input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+374" /></label><label>Մեկնաբանություն<textarea name="note" rows="3" placeholder="Ցանկալի օր, ժամ կամ հատուկ կտրվածք" /></label><button type="submit">Փորձարկել հարցման ձևը <PackageCheck /></button><p>Frontend demo․ տվյալները չեն փոխանցվում և վճարում չի իրականացվում։</p></form>}
      </>}
    </aside>
    <div className={`add-toast ${cart.lastAdded ? 'is-visible' : ''}`} role="status" aria-live="polite"><Check /><span><strong>{cart.lastAdded}</strong> ավելացվեց ցուցակում</span><button type="button" onClick={() => cart.setOpen(true)}>Դիտել</button></div>
  </>
}

export function SectionHeading({ eyebrow, title, copy, action }) {
  return <div className="section-heading reveal"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{copy && <p>{copy}</p>}{action}</div>
}
