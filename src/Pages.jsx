import React, { useEffect, useMemo, useState } from 'react'
import {
  ArrowDown, ArrowRight, Beef, Box, Building2, Check, ChefHat, Clock3,
  Flame, Handshake, Leaf, PackageCheck, Scale, Search,
  ShieldCheck, ShoppingBag, SlidersHorizontal, Snowflake, Sparkles
} from 'lucide-react'
import { assetPath, sitePath } from './paths.js'
import { boxes, categories, formatPrice, grillFacts, products } from './data.js'
import { BoxCard, ProductCard, SectionHeading } from './SiteChrome.jsx'

const pageMeta = {
  home: ['Matador մսամթերքի խանութ | Թարմ միս և Picnic Box-եր', 'Թարմ տավարի, գառան, խոզի և թռչնամիս, պատրաստի Picnic Box-եր ու կայուն մատակարարումներ ռեստորանների համար։'],
  catalog: ['Թարմ մսի տեսականի | Matador Butcher Shop', 'Ընտրեք թարմ միսը, կտրվածքը, քաշը և պատրաստման եղանակը Matador-ի մանրամասն տեսականուց։'],
  boxes: ['Picnic Box-եր 2, 5 և 10 հոգու համար | Matador', 'Միս, միանգամյա մինի գրիլ՝ ածուխով, սոուսներ և ամբողջ անհրաժեշտը՝ մեկ Matador Picnic Box-ում։'],
  box: ['Picnic Box-ի ամբողջական կազմ | Matador', 'Բացահայտեք Matador Picnic Box-ի միսը, գրիլը, սոուսները և բոլոր անհրաժեշտ պարագաները։'],
  product: ['Թարմ մսի մանրամասներ | Matador', 'Տեսեք Matador-ի կտրվածքի նկարագրությունը, գինը, քաշը և պատրաստման խորհուրդը։'],
  business: ['Մսի մատակարարում ռեստորաններին | Matador for Business', 'Համաձայնեցված կտրվածք, ճշգրիտ քաշ և կանխատեսելի մատակարարում ռեստորանային խոհանոցների համար։'],
  quality: ['Matador-ի որակի մոտեցումը | Հստակ կտրվածք և կայուն չափանիշ', 'Ինչպես է Matador-ը մոտենում մսի ընտրությանը, կտրվածքին, փաթեթավորմանն ու պատվերի ճշտմանը։'],
  about: ['Matador-ի մասին | Best meat, real taste', 'Matador-ը ստեղծված է թարմ միսը, մսագործի խորհուրդն ու կանխատեսելի սպասարկումը մեկ տեղում միավորելու համար։'],
  contact: ['Կապ և պատվերի հարցում | Matador Butcher Shop', 'Ուղարկեք Matador-ին մանրածախ պատվերի կամ ռեստորանային մատակարարման հարցում։'],
}

export function usePageMeta(page) {
  useEffect(() => {
    const [title, description] = pageMeta[page] || pageMeta.home
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
  }, [page])
}

function PageHero({ eyebrow, title, copy, image, imageAlt = '', children, compact = false }) {
  const [imageWidth, imageHeight] = image?.includes('/box-') ? [1200, 900] : image?.includes('/restaurant-') ? [1536, 1024] : [1920, 1080]
  return <section className={`page-hero ${compact ? 'page-hero-compact' : ''}`}>
    {image && <img src={assetPath(image)} width={imageWidth} height={imageHeight} alt={imageAlt} fetchPriority="high" />}
    <div className="page-hero-shade" />
    <div className="shell page-hero-copy"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1><p>{copy}</p>{children}</div>
  </section>
}

export function HomePage({ cart }) {
  return <>
    <section className="home-hero" aria-labelledby="home-title">
      <picture><source media="(max-width: 700px)" srcSet={assetPath('/images/hero-butcher-mobile-525.avif')} width="525" height="700" /><img className="home-hero-image" src={assetPath('/images/hero-butcher.avif')} width="1920" height="1080" alt="Մսագործը դասավորում է թարմ ռիբայ սթեյքերը մուգ աշխատանքային սեղանի վրա" fetchPriority="high" /></picture>
      <div className="home-hero-shade" />
      <div className="shell home-hero-copy">
        <div className="hero-brand-stamp"><span>EST.</span><img src={assetPath('/images/matador-bull-mark-sm.webp')} width="80" height="68" alt="" /><span>FRESH</span></div>
        <p className="eyebrow light hero-line"><span /> Թարմ միս · Կայուն որակ</p>
        <h1 id="home-title"><span>Միս, որին</span><em>վստահում են</em><span>խոհարարները</span></h1>
        <p>Ընտրված կտրվածքներ ձեր սեղանի և ռեստորանային խոհանոցի համար՝ ամեն օր նույն հստակ չափանիշով։</p>
        <div className="hero-actions"><a className="button button-red" href={sitePath('catalog/')}>Ընտրել միսը <ArrowRight /></a><a className="button button-ghost" href={sitePath('boxes/')}>Դիտել Picnic Box-երը</a></div>
      </div>
      <div className="hero-scroll"><ArrowDown /><span>Բացահայտել</span></div>
      <div className="hero-facts"><div><strong>01</strong><span>Հստակ կտրվածք</span></div><div><strong>02</strong><span>Ճշգրիտ քաշ</span></div><div><strong>03</strong><span>Մսագործի խորհուրդ</span></div></div>
    </section>

    <section className="section category-section">
      <div className="shell">
        <SectionHeading eyebrow="Տեսականի" title={<>Ընտրեք ձեր <em>կտրվածքը</em></>} copy="Ամենօրյա պատրաստումից մինչև երկար երեկո գրիլի շուրջ՝ գտեք ճիշտ միսը ձեր բաղադրատոմսի համար։" />
        <div className="category-rail">{categories.slice(0, 5).map((category, index) => <a className="category-tile reveal" href={sitePath(`catalog/?category=${category.id}`)} key={category.id}><small>0{index + 1}</small><span><strong>{category.name}</strong><em>{category.note}</em></span><ArrowRight /></a>)}</div>
      </div>
    </section>

    <section className="section products-section">
      <div className="shell"><SectionHeading eyebrow="Մսագործի ընտրանի" title={<>Այս շաբաթ <em>ընտրում են</em></>} copy="Պահանջված կտրվածքներ՝ սեփական պատկերով, պատրաստման հստակ ուղղությամբ և քաշի արագ ընտրությամբ։" action={<a className="text-link" href={sitePath('catalog/')}>Ամբողջ տեսականին <ArrowRight /></a>} />
        <div className="product-grid home-product-grid">{products.slice(0, 4).map(product => <ProductCard key={product.id} product={product} onAdd={cart.add} />)}</div>
      </div>
    </section>

    <section className="quality-band">
      <div className="shell quality-band-grid">
        <div className="quality-band-intro reveal"><p className="eyebrow light">Matador standard</p><h2>Որակ, որը կարելի է <em>կրկնել</em></h2><p>Լավ սպասարկումը մեկ հաջող գնում չէ։ Այն նույն հստակ արդյունքն է՝ հաջորդ պատվերի ժամանակ ևս։</p><a href={sitePath('quality/')}>Ինչպես ենք աշխատում <ArrowRight /></a></div>
        <div className="quality-promise reveal"><span><Scale /></span><h3>Հստակ կտրվածք</h3><p>Ստանում եք հենց այն հատվածն ու քաշը, որը համաձայնեցրել եք։</p></div>
        <div className="quality-promise reveal"><span><ShieldCheck /></span><h3>Կայուն չափանիշ</h3><p>Նույն մոտեցումը՝ գնումից գնում և մատակարարումից մատակարարում։</p></div>
        <div className="quality-promise reveal"><span><ChefHat /></span><h3>Մսագործի խորհուրդ</h3><p>Օգնում ենք ընտրել ճիշտ հատվածն ու պատրաստման եղանակը։</p></div>
      </div>
    </section>

    <section className="section box-home-section">
      <div className="shell"><SectionHeading eyebrow="Կրակը ներառված է" title={<>Բացեք։ Վառեք։ <em>Պատրաստեք։</em></>} copy="Մեկ տուփում՝ ընտրված միս, միանգամյա գրիլ՝ ածուխով, սոուսներ և սեղանի համար անհրաժեշտ պարագաներ։" action={<a className="text-link" href={sitePath('boxes/')}>Համեմատել Box-երը <ArrowRight /></a>} />
        <div className="box-home-grid">{boxes.map((box, index) => <BoxCard key={box.id} box={box} onAdd={cart.add} featured={index === 1} />)}</div>
      </div>
    </section>

    <section className="business-home">
      <div className="shell business-home-grid">
        <div className="business-mark reveal"><img src={assetPath('/images/matador-logo.webp')} width="420" height="479" alt="Matador Butcher Shop" loading="lazy" /><span>FOR BUSINESS</span></div>
        <div className="business-home-copy reveal"><p className="eyebrow light">Matador for business</p><h2>Ձեր խոհանոցը չի կարող սպասել <em>պատահական որակի</em></h2><p>Համաձայնեցված կտրվածք, ճշգրիտ քաշ և կանխատեսելի պարբերականություն՝ մեկ պատասխանատու կապով։</p><ul><li><Check /> Կրկնվող պատվերի ձևաչափ</li><li><Check /> Համաձայնեցված օրեր և ծավալներ</li><li><Check /> Փորձնական մատակարարում</li></ul><a className="button button-brass" href={sitePath('business/')}>Ստանալ առաջարկ <ArrowRight /></a></div>
      </div>
    </section>

    <section className="partner-section"><div className="shell partner-wrap reveal"><div><p className="eyebrow">Ռեստորանային գործընկերություն</p><h2>Մատակարարում՝ ձեր տեխնոլոգիական քարտի ճշտությամբ</h2></div><p>Կտրվածքը, բաժնային քաշը և մատակարարման ռիթմը համաձայնեցվում են ձեր խոհանոցի իրական աշխատանքի շուրջ։</p><div className="partner-slots" aria-label="Matador-ի ռեստորանային ծառայության առավելությունները"><span>ՀԱՄԱՁԱՅՆԵՑՎԱԾ ՔԱՇ</span><span>ԿՐԿՆՎՈՂ ԿՏՐՎԱԾՔ</span><span>ՊԼԱՆԱՎՈՐՎԱԾ ԾԱՎԱԼ</span></div></div></section>
  </>
}

export function CatalogPage({ cart }) {
  const params = new URLSearchParams(window.location.search)
  const requestedCategory = params.get('category') || 'all'
  const validCategories = ['all', ...new Set(products.map(product => product.category))]
  const [category, setCategory] = useState(validCategories.includes(requestedCategory) ? requestedCategory : 'all')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('hy-AM')
    let result = products.filter(product => (category === 'all' || product.category === category) && (!needle || `${product.name} ${product.description} ${product.cooking}`.toLocaleLowerCase('hy-AM').includes(needle)))
    if (sort === 'low') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'high') result = [...result].sort((a, b) => b.price - a.price)
    return result
  }, [category, query, sort])
  return <>
    <PageHero compact eyebrow="Matador catalogue" title="Միս՝ ձեր պատրաստման ձևով" copy="Որոնեք անունով, կտրվածքով կամ պատրաստման եղանակով։ Յուրաքանչյուր ապրանք ունի իր սեփական լուսանկարը։" />
    <section className="catalog-page section" id="catalog-tools"><div className="shell">
      <div className="catalog-tools reveal"><label className="catalog-search"><Search /><span className="sr-only">Որոնել տեսականում</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Փնտրել միս, կտրվածք կամ box…" /></label><label className="catalog-sort"><SlidersHorizontal /><span className="sr-only">Դասավորել</span><select value={sort} onChange={event => setSort(event.target.value)}><option value="featured">Առաջարկվող</option><option value="low">Գին՝ ցածրից բարձր</option><option value="high">Գին՝ բարձրից ցածր</option></select></label></div>
      <div className="catalog-tabs" aria-label="Ապրանքների կատեգորիաներ"><button aria-pressed={category === 'all'} className={category === 'all' ? 'is-active' : ''} onClick={() => setCategory('all')}>Բոլորը <small>{products.length}</small></button>{categories.filter(item => item.id !== 'boxes').map(item => <button key={item.id} aria-pressed={category === item.id} className={category === item.id ? 'is-active' : ''} onClick={() => setCategory(item.id)}>{item.name}<small>{products.filter(product => product.category === item.id).length}</small></button>)}</div>
      <div className="catalog-result-head"><div><p className="eyebrow">Ընտրված տեսականի</p><h2>{category === 'all' ? 'Բոլոր կտրվածքները' : categories.find(item => item.id === category)?.name}</h2></div><span>{visible.length} ապրանք</span></div>
      {visible.length ? <div className="product-grid">{visible.map(product => <ProductCard key={product.id} product={product} onAdd={cart.add} />)}</div> : <div className="empty-state"><Search /><h3>Այս որոնմամբ ոչինչ չգտանք</h3><p>Փորձեք այլ բառ կամ վերականգնեք բոլոր կատեգորիաները։</p><button onClick={() => { setQuery(''); setCategory('all') }}>Մաքրել ֆիլտրերը</button></div>}
    </div></section>
  </>
}

export function ProductPage({ cart }) {
  const id = new URLSearchParams(window.location.search).get('id')
  const selectedProduct = products.find(item => item.id === id)
  const product = selectedProduct || products[0]
  const [weight, setWeight] = useState(product.unit === 'կգ' ? 1 : 1)
  const finalPrice = product.unit === 'կգ' ? product.price * weight : product.price
  const weightLabel = product.unit === 'կգ' ? (weight === .5 ? '500 գ' : weight === 1.5 ? '1.5 կգ' : '1 կգ') : product.unit
  const related = products.filter(item => item.category === product.category && item.id !== product.id).slice(0, 3)
  if (!selectedProduct) return <PageHero compact eyebrow="Տեսականի" title="Ապրանքը չգտնվեց" copy="Հղումը կարող է հնացած լինել։ Վերադարձեք ամբողջ տեսականի և ընտրեք հասանելի կտրվածքը։"><a className="button button-red" href={sitePath('catalog/')}>Բացել տեսականին <ArrowRight /></a></PageHero>
  return <>
    <section className="product-detail section"><div className="shell product-detail-grid">
      <div className="product-detail-media reveal"><picture><source media="(max-width: 600px)" srcSet={assetPath(product.smallImage)} /><img src={assetPath(product.image)} width="720" height="720" alt={product.alt} fetchPriority="high" /></picture><span>MATADOR · FRESH CUT</span></div>
      <div className="product-detail-copy reveal"><p className="eyebrow">{categories.find(item => item.id === product.category)?.name}</p><h1>{product.name}</h1><p className="product-detail-lead">{product.description}</p><div className="detail-specs"><span><Flame />{product.cooking}</span><span><Snowflake />Պահպանումը՝ ըստ փաթեթավորման</span><span><Scale />{product.unit === 'կգ' ? 'Կշռային ապրանք' : `Ֆիքսված փաթեթ՝ ${product.unit}`}</span></div>
        <div className="weight-picker"><p>Ընտրեք քաշը</p>{product.unit === 'կգ' ? <div>{[[.5, '500 գ'], [1, '1 կգ'], [1.5, '1.5 կգ']].map(([value, label]) => <button key={value} aria-pressed={weight === value} className={weight === value ? 'is-active' : ''} onClick={() => setWeight(value)}>{label}</button>)}</div> : <strong>{product.unit}</strong>}</div>
        <div className="detail-purchase"><p><small>Նախնական արժեք</small><strong>{formatPrice(finalPrice)}</strong></p><button onClick={() => cart.add({ id: product.id, key: `${product.id}-${weightLabel}`, name: `${product.name} · ${weightLabel}`, price: finalPrice, image: product.smallImage, meta: product.cooking })}><ShoppingBag /> Ավելացնել ցուցակում</button></div>
        <p className="detail-note">Վերջնական քաշն ու արժեքը կհաստատվեն պատվերը հավաքելուց առաջ։ Պահպանման ճշգրիտ պայմանները տեսեք ապրանքի փաթեթավորման վրա։</p>
      </div>
    </div></section>
    {related.length > 0 && <section className="section related-section"><div className="shell"><SectionHeading eyebrow="Նույն կատեգորիայից" title="Կարող է նաև հետաքրքրել" /><div className="product-grid">{related.map(item => <ProductCard key={item.id} product={item} onAdd={cart.add} />)}</div></div></section>}
  </>
}

export function BoxesPage({ cart }) {
  return <>
    <PageHero eyebrow="Կրակը ներառված է" title="Picnic Box՝ առանց ավելորդ ցուցակի" copy="Ընտրեք մարդկանց թիվը։ Միսը, մինի գրիլը, ածուխը, սոուսներն ու պարագաներն արդեն մեկ տուփում են։" image="/images/box-grande.avif"><a className="button button-red" href="#box-list">Ընտրել Box-ը <ArrowDown /></a></PageHero>
    <section className="section box-list-section" id="box-list"><div className="shell"><SectionHeading eyebrow="3 պատրաստ լուծում" title={<>2, 5 կամ 10 հոգու <em>համար</em></>} copy="Յուրաքանչյուր քարտում տեսնում եք ոչ միայն գինը, այլ նաև մսի ընդհանուր քաշն ու գրիլների քանակը։" /><div className="box-list-grid">{boxes.map((box, index) => <BoxCard key={box.id} box={box} onAdd={cart.add} featured={index === 1} />)}</div></div></section>
    <section className="grill-section"><div className="shell grill-grid"><div className="grill-copy reveal"><p className="eyebrow light">Ինչ կա յուրաքանչյուր գրիլում</p><h2>Բացօթյա պատրաստման <em>կոմպակտ հիմքը</em></h2><p>Box-ի մինի գրիլը ալյումինե տարա է՝ ցանցով, տակդիրով և ածուխով։ Այն թեթև է, հավաքված և նախատեսված է մեկ օգտագործման համար։</p><div className="grill-facts">{grillFacts.map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}</div></div><div className="grill-steps reveal"><h3>3 պարզ քայլ</h3><ol><li><span>01</span><p><strong>Բացել</strong>Բացեք փաթեթը և ամբողջությամբ բացեք տակդիրը։</p></li><li><span>02</span><p><strong>Վառել</strong>Տեղադրեք կայուն, չայրվող բացօթյա մակերեսի վրա։</p></li><li><span>03</span><p><strong>Պատրաստել</strong>Սպասեք կայուն ջերմությանը և հետևեք փաթեթի հրահանգներին։</p></li></ol><p className="safety-note"><Flame /> Միայն բացօթյա օգտագործման համար։ Այրման տևողությունը կախված է եղանակից և օգտագործման պայմաններից։</p></div></div></section>
  </>
}

export function BoxDetailPage({ cart }) {
  const id = new URLSearchParams(window.location.search).get('id')
  const box = boxes.find(item => item.id === id)
  if (!box) return <PageHero compact eyebrow="Picnic Box" title="Հավաքածուն չգտնվեց" copy="Հղումը կարող է հնացած լինել։ Դիտեք հասանելի 2, 5 և 10 հոգու հավաքածուները։"><a className="button button-red" href={sitePath('boxes/')}>Բացել Box-երը <ArrowRight /></a></PageHero>
  return <>
    <section className="box-detail"><div className="box-detail-media"><picture><source media="(max-width: 600px)" srcSet={assetPath(box.smallImage)} /><img src={assetPath(box.image)} width="1200" height="900" alt={box.alt} fetchPriority="high" /></picture></div><div className="box-detail-copy"><p className="eyebrow">Matador picnic collection</p><h1>{box.name}</h1><p>{box.tagline}</p><div className="box-detail-facts"><span><strong>{box.people}</strong> հոգի</span><span><strong>{box.meatWeight}</strong> միս</span><span><strong>{box.grills}</strong> գրիլ</span></div><div className="box-detail-price"><strong>{formatPrice(box.price)}</strong><button onClick={() => cart.add({ id: box.id, key: `box-${box.id}`, name: box.name, price: box.price, image: box.smallImage, meta: `${box.people} հոգու համար` })}><ShoppingBag /> Ավելացնել ցուցակում</button></div></div></section>
    <section className="section box-contents"><div className="shell box-contents-grid"><div className="reveal"><p className="eyebrow">Մսային ընտրանի</p><h2>Box-ի հիմնական կազմը</h2><ul>{box.meats.map(item => <li key={item}><Beef /><span>{item}</span></li>)}</ul></div><div className="reveal"><p className="eyebrow">Մնացած ամեն ինչը</p><h2>Կրակից մինչև սեղան</h2><ul>{box.extras.map(item => <li key={item}><PackageCheck /><span>{item}</span></li>)}</ul></div></div></section>
    <section className="box-safety"><div className="shell"><div><Flame /><span><strong>Անվտանգ օգտագործում</strong>Միայն բացօթյա տարածքում, կայուն ու չայրվող մակերեսի վրա։ Թողեք ամբողջությամբ սառչի՝ մինչև հեռացնելը։</span></div><div><Leaf /><span><strong>Ալերգեններ</strong>Սոուսների կազմն ու ալերգենները նշվում են յուրաքանչյուր տարայի պիտակի վրա։</span></div></div></section>
    <section className="section related-section"><div className="shell"><SectionHeading eyebrow="Այլ չափեր" title="Ընտրեք ձեր հավաքույթին համապատասխան" /><div className="box-list-grid">{boxes.filter(item => item.id !== box.id).map(item => <BoxCard key={item.id} box={item} onAdd={cart.add} />)}</div></div></section>
  </>
}

function RequestForm({ business = false }) {
  const [sent, setSent] = useState(false)
  if (sent) return <div className="form-success" role="status"><span><Check /></span><h2>Ձևը լրացված է</h2><p>Սա frontend demo է, ուստի տվյալը չի փոխանցվել։ Իրական կապի ալիքը միացնելուց հետո այստեղ կհաստատվի ուղարկումը։</p><button onClick={() => setSent(false)}>Նոր հարցում</button></div>
  return <form className="request-form" onSubmit={event => { event.preventDefault(); setSent(true) }}>
    <div>{business && <label>Ռեստորանի անուն<input required name="company" autoComplete="organization" /></label>}<label>{business ? 'Կոնտակտային անձ' : 'Անուն'}<input required name="name" autoComplete="name" /></label></div>
    <div><label>Հեռախոս<input required name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+374" /></label><label>Էլ․ հասցե<input name="email" type="email" autoComplete="email" /></label></div>
    {business && <div><label>Շաբաթական մոտավոր ծավալ<select name="volume" defaultValue=""><option value="" disabled>Ընտրել</option><option>մինչև 20 կգ</option><option>20–50 կգ</option><option>50–100 կգ</option><option>100 կգ-ից ավելի</option></select></label><label>Հաճախականություն<select name="frequency" defaultValue=""><option value="" disabled>Ընտրել</option><option>Շաբաթական 1 անգամ</option><option>Շաբաթական 2–3 անգամ</option><option>Ըստ պահանջի</option></select></label></div>}
    <label>{business ? 'Անհրաժեշտ տեսակներ և հատուկ կտրվածքներ' : 'Ինչո՞վ կարող ենք օգնել'}<textarea required name="message" rows="5" /></label>
    <button type="submit">{business ? 'Փորձարկել մատակարարման ձևը' : 'Փորձարկել հարցման ձևը'} <ArrowRight /></button><p>Frontend demo․ տվյալները չեն փոխանցվում և վճարում չի իրականացվում։</p>
  </form>
}

export function BusinessPage() {
  const partnershipStages = [
    {
      number: '01',
      label: 'Համաձայնեցում',
      title: 'Սկսում ենք ձեր ճաշացանկից',
      copy: 'Շեֆի հետ ճշտում ենք ուտեստը, ցանկալի հատվածը, ճարպայնությունն ու մշակման աստիճանը։ Այսպես առաջարկը կառուցվում է կիրառությունից, ոչ թե պատահական տեսականուց։',
      image: '/images/restaurant-consultation.avif',
      smallImage: '/images/restaurant-consultation-sm.webp',
      alt: 'Շեֆ-խոհարարն ու մսագործը ռեստորանի խոհանոցում քննարկում են տավարի կտրվածքը',
      points: ['Ուտեստ և պատրաստման եղանակ', 'Կտրվածք ու ճարպայնություն', 'Փորձնական քանակ'],
    },
    {
      number: '02',
      label: 'Պատրաստում',
      title: 'Մեկ չափ՝ ամբողջ խմբաքանակի համար',
      copy: 'Կտրվածքը բաժանվում, կշռվում և փաթեթավորվում է համաձայնեցված ձևաչափով, որպեսզի խոհանոցը ստանա պատրաստ աշխատանքի, ոչ թե նորից մշակելու նյութ։',
      image: '/images/restaurant-portions.avif',
      smallImage: '/images/restaurant-portions-sm.webp',
      alt: 'Մսագործը կշռում և միատեսակ չափաբաժիններով փաթեթավորում է ռեստորանի համար նախատեսված միսը',
      points: ['Բաժնային կամ ընդհանուր քաշ', 'Մշակման համաձայնեցված աստիճան', 'Փաթեթավորման ձևաչափ'],
    },
    {
      number: '03',
      label: 'Մատակարարում',
      title: 'Գրաֆիկ, որը հարմար է խոհանոցին',
      copy: 'Փորձնական փուլից հետո ամրագրում ենք մատակարարման օրերը, մոտավոր ծավալը և մեկ պատասխանատու կապը՝ ամեն պատվերի ժամանակ նույն շղթան չկրկնելու համար։',
      image: '/images/restaurant-delivery.avif',
      smallImage: '/images/restaurant-delivery-sm.webp',
      alt: 'Ռեստորանի շեֆը ստուգում է սառը տարաներով մատակարարված, փաթեթավորված մսի խմբաքանակը',
      points: ['Համաձայնեցված օրեր', 'Պլանավորված ծավալ', 'Մեկ պատասխանատու կապ'],
    },
  ]
  return <>
    <PageHero eyebrow="Matador for business" title="Միսը հասնում է խոհանոց՝ արդեն ձեր ձևաչափով" copy="Կտրվածքը, բաժնային քաշը, փաթեթավորումը և մատակարարման օրերը համաձայնեցնում ենք ձեր ճաշացանկի ու աշխատանքի ռիթմի շուրջ։" image="/images/restaurant-consultation.avif" imageAlt="Շեֆ-խոհարարն ու Matador-ի մսագործը քննարկում են ռեստորանի համար նախատեսված կտրվածքը"><a className="button button-brass" href="#business-form">Քննարկել մատակարարումը <ArrowDown /></a></PageHero>
    <section className="business-quick-facts" aria-label="Ռեստորանային մատակարարման հիմնական պայմանները"><div className="shell"><span><Scale />Ճշգրիտ քաշ</span><span><ChefHat />Կտրվածք՝ ըստ ուտեստի</span><span><PackageCheck />Հարմար փաթեթավորում</span><span><Clock3 />Պլանավորված օրեր</span></div></section>
    <section className="section business-story" id="business-process"><div className="shell">
      <SectionHeading eyebrow="Մեկ պատվերի ճանապարհը" title={<>Պահանջից մինչև <em>խոհանոց</em></>} copy="Երեք պարզ փուլով տեսեք՝ ինչն ենք համաձայնեցնում, ինչ է պատրաստվում և ինչ ձևաչափով է հասնում ձեր թիմին։" />
      <div className="business-story-list">{partnershipStages.map((stage, index) => <article className="business-story-card reveal" key={stage.number}>
        <picture><source media="(max-width: 700px)" srcSet={assetPath(stage.smallImage)} /><img src={assetPath(stage.image)} width="1536" height="1024" loading="lazy" alt={stage.alt} /></picture>
        <div className="business-story-copy"><div className="business-story-index"><span>{stage.number}</span><small>{stage.label}</small></div><h2>{stage.title}</h2><p>{stage.copy}</p><ul>{stage.points.map(point => <li key={point}><Check />{point}</li>)}</ul>{index === 0 && <a href="#business-form">Նկարագրել ձեր պահանջը <ArrowRight /></a>}</div>
      </article>)}</div>
    </div></section>
    <section className="business-fit"><div className="shell business-fit-grid"><div className="reveal"><p className="eyebrow light">Ում համար է</p><h2>Երբ նույն ուտեստը պետք է ամեն անգամ նույնը ստացվի</h2><p>Հարմար է այն խոհանոցներին, որտեղ կտրվածքի չափը, մշակման աստիճանն ու մատակարարման ժամանակը անմիջապես ազդում են արագության և վերջնական ափսեի վրա։</p></div><div className="business-fit-cards"><article className="reveal"><ChefHat /><span><strong>À la carte</strong>Բաժնային քաշ և կրկնվող կտրվածք</span></article><article className="reveal"><Flame /><span><strong>Գրիլ և սթեյք</strong>Ընտրված հատված ու ճարպայնություն</span></article><article className="reveal"><Building2 /><span><strong>Հյուրանոց և catering</strong>Նախապես պլանավորված խմբաքանակ</span></article><article className="reveal"><Snowflake /><span><strong>Կայուն պահեստավորում</strong>Համաձայնեցված փաթեթավորման ձև</span></article></div></div></section>
    <section className="section business-form-section" id="business-form"><div className="shell form-layout"><div><p className="eyebrow">Մատակարարման հայտ</p><h2>Պատմեք ձեր խոհանոցի պահանջների մասին</h2><p>Նշեք ցանկալի կտրվածքները, մոտավոր շաբաթական ծավալը և մատակարարման հաճախականությունը՝ համապատասխան առաջարկ կառուցելու համար։</p></div><RequestForm business /></div></section>
  </>
}

export function QualityPage() {
  const stages = [
    ['01', 'Պահանջի ճշտում', 'Կտրվածքը, քաշը և պատրաստման նպատակը ճշտվում են մինչև հավաքումը։'],
    ['02', 'Մսագործական մշակում', 'Յուրաքանչյուր կտրվածք ձևավորվում է իր կիրառությանը համապատասխան։'],
    ['03', 'Փաթեթավորում', 'Ապրանքը բաժանվում և փաթեթավորվում է համաձայնեցված չափով։'],
    ['04', 'Վերջնական հաստատում', 'Առկայությունը, քաշը և արժեքը հաստատվում են հաճախորդի հետ։'],
  ]
  return <>
    <PageHero compact eyebrow="Matador standard" title="Կայուն որակը սկսվում է հստակ գործընթացից" copy="Յուրաքանչյուր ապրանքի փաստացի ծագումը, կազմը և պահպանման պայմանները ներկայացվում են իր հաստատված պիտակի ու փաստաթղթերի համաձայն։" />
    <section className="section quality-page"><div className="shell"><div className="quality-story"><div className="quality-story-title reveal"><p className="eyebrow">Մեր մոտեցումը</p><h2>Չորս վերահսկելի քայլ</h2></div><div className="quality-stage-list">{stages.map(([num, title, copy]) => <article key={num} className="reveal"><span>{num}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></div></section>
    <section className="quality-dark"><div className="shell quality-dark-grid"><div className="reveal"><ShieldCheck /><h2>Հստակ խոստումներ, ստուգելի տվյալներ</h2><p>Մսի ծագումը, պահպանման վերջնաժամկետը և հատուկ սերտիֆիկացիաները ներկայացվում են միայն իրական փաստաթղթերով ու պիտակներով։</p></div><div className="quality-checks"><span><Check />Յուրաքանչյուր ապրանքի սեփական նկար</span><span><Check />Գինն ու միավորը՝ մեկ հայացքով</span><span><Check />Վերջնական քաշի հաստատում</span><span><Check />Պահպանումը՝ ըստ փաթեթավորման</span></div></div></section>
    <section className="section"><div className="shell faq-grid"><div><p className="eyebrow">Կարևոր է իմանալ</p><h2>Պահպանում և անվտանգություն</h2></div><div><details open><summary>Որտե՞ղ տեսնել պահպանման պայմանները</summary><p>Յուրաքանչյուր ապրանքի ճշգրիտ ջերմաստիճանն ու ժամկետը պետք է ստուգել հենց փաթեթավորման պիտակի վրա։</p></details><details><summary>Ինչպե՞ս է հաստատվում կշռային ապրանքի գինը</summary><p>Կայքում ցուցադրվում է նախնական արժեքը։ Վերջնական քաշն ու գումարը հաստատվում են հավաքումից հետո՝ մինչև պատվերի վերջնականացումը։</p></details><details><summary>Ինչպե՞ս օգտագործել Picnic Box-ի գրիլը</summary><p>Միայն բացօթյա, կայուն ու չայրվող մակերեսի վրա՝ հետևելով փաթեթի հրահանգներին։</p></details></div></div></section>
  </>
}

export function AboutPage() {
  return <>
    <PageHero compact eyebrow="Best meat · Real taste" title="Matador-ը պարզապես ցուցափեղկ չէ" copy="Այն մսագործի գիտելիքը, հստակ ընտրությունը և հաճախորդի իրական պատրաստման նպատակը մեկ տեղում միավորելու մոտեցում է։" />
    <section className="section about-story"><div className="shell about-story-grid"><div className="about-logo reveal"><img src={assetPath('/images/matador-logo.webp')} width="540" height="616" alt="Matador Butcher Shop ամբողջական տարբերանշան" /></div><div className="reveal"><p className="eyebrow">Բրենդի բնավորությունը</p><h2>Ուժեղ նշան։ Հանգիստ վստահություն։</h2><p>Կարմիր ցուլը ներկայացնում է ուժն ու բնավորությունը, իսկ սև, ոսկեգույն ու տաք սպիտակ գունային համակարգը՝ պրոֆեսիոնալ և պրեմիում սպասարկումը։</p><p>Matador-ի կայքը կառուցված է նույն սկզբունքով՝ ուժեղ պատկերներ, պարզ ընտրություն և ոչ մի ավելորդ խոստում։</p><a className="text-link" href={sitePath('quality/')}>Տեսնել որակի մոտեցումը <ArrowRight /></a></div></div></section>
    <section className="about-values"><div className="shell"><article className="reveal"><small>01</small><h3>Իրական կարիք</h3><p>Սկսում ենք ոչ թե ապրանքից, այլ նրանից, թե ինչ եք պատրաստելու։</p></article><article className="reveal"><small>02</small><h3>Հստակ ընտրություն</h3><p>Անուն, քաշ, գին և պատրաստման եղանակ՝ մեկ հասկանալի համակարգում։</p></article><article className="reveal"><small>03</small><h3>Երկար համագործակցություն</h3><p>Մանրածախ գնորդից մինչև ռեստորան՝ նույն պատասխանատու մոտեցմամբ։</p></article></div></section>
    <section className="section about-cta"><div className="shell"><div><Sparkles /><p><small>Հաջորդ քայլը</small><strong>Ընտրեք կտրվածքը կամ կազմեք մատակարարման առաջարկը</strong></p></div><div><a className="button button-red" href={sitePath('catalog/')}>Տեսականի <ArrowRight /></a><a className="button button-dark" href={sitePath('business/')}>Ռեստորաններին</a></div></div></section>
  </>
}

export function ContactPage() {
  return <>
    <PageHero compact eyebrow="Կապ" title="Սկսենք ձեր հարցից" copy="Մանրածախ պատվեր, Picnic Box կամ ռեստորանային մատակարարում՝ մեկ հստակ հարցման ձևով։" />
    <section className="section contact-section"><div className="shell contact-grid"><div className="contact-options"><article><ShoppingBag /><div><h2>Մանրածախ պատվեր</h2><p>Նշեք ցանկալի ապրանքը, քաշը և ստացման օրը։</p></div></article><article><Box /><div><h2>Picnic Box</h2><p>Ընտրեք մարդկանց թիվը և նշեք հավաքույթի օրը։</p></div></article><article><Building2 /><div><h2>Ռեստորանային մատակարարում</h2><p>Ծավալ, կտրվածք և մատակարարման պարբերականություն։</p></div></article><article><ChefHat /><div><h2>Հատուկ կտրվածք</h2><p>Պատմեք պատրաստման ձևի մասին՝ ճիշտ հատված ընտրելու համար։</p></div></article></div><div><p className="eyebrow">Ընդհանուր հարցում</p><h2>Գրեք մեզ</h2><RequestForm /></div></div></section>
  </>
}
