export const categories = [
  { id: 'beef', name: 'Տավարի միս', note: 'Սթեյքեր, կողեր և դասական կտրվածքներ' },
  { id: 'lamb', name: 'Գառան միս', note: 'Գրիլի և ջեռոցի համար' },
  { id: 'pork', name: 'Խոզի միս', note: 'Հյութալի, հավասար ճարպաշերտով' },
  { id: 'poultry', name: 'Թռչնամիս', note: 'Մաքրված և մարինացված տարբերակներ' },
  { id: 'ready', name: 'Գրիլի պատրաստ', note: 'Շամփուրներ, լյուլյա և նրբերշիկներ' },
  { id: 'boxes', name: 'Picnic Box', note: 'Կրակն ու ամբողջ սեղանը՝ մեկ տուփում' },
]

export const products = [
  {
    id: 'ribeye', category: 'beef', name: 'Տավարի ռիբայ սթեյք', price: 12900, unit: 'կգ',
    description: 'Հավասար ճարպաշերտով պրեմիում կտրվածք՝ գրիլի կամ թուջե թավայի համար։',
    image: '/images/product-ribeye.avif', smallImage: '/images/product-ribeye-sm.webp',
    alt: 'Թարմ տավարի ռիբայ սթեյքեր սև մսագործական թղթի վրա', cooking: 'Գրիլ · Թավա', badge: 'Chef’s cut',
  },
  {
    id: 'tenderloin', category: 'beef', name: 'Տավարի փափկամիս', price: 13900, unit: 'կգ',
    description: 'Նուրբ, մաքրված կտրվածք՝ մեդալիոնների և արագ պատրաստման համար։',
    image: '/images/product-tenderloin.avif', smallImage: '/images/product-tenderloin-sm.webp',
    alt: 'Թարմ տավարի փափկամիս և երկու մեդալիոն', cooking: 'Թավա · Ջեռոց',
  },
  {
    id: 'beef-ribs', category: 'beef', name: 'Տավարի կողեր', price: 6200, unit: 'կգ',
    description: 'Մսոտ կողեր՝ երկար եփման, BBQ-ի և դանդաղ ծխեցման համար։',
    image: '/images/product-beef-ribs.avif', smallImage: '/images/product-beef-ribs-sm.webp',
    alt: 'Թարմ մսոտ տավարի կողեր', cooking: 'BBQ · Դանդաղ եփում',
  },
  {
    id: 'lamb-chops', category: 'lamb', name: 'Գառան չալաղաջ', price: 9900, unit: 'կգ',
    description: 'Ոսկորով բաժնային կտրվածք՝ արագ գրիլի և համեմունքների նուրբ հավասարակշռության համար։',
    image: '/images/product-lamb-chops.avif', smallImage: '/images/product-lamb-chops-sm.webp',
    alt: 'Վեց թարմ գառան չալաղաջ', cooking: 'Գրիլ · Թավա', badge: 'Popular',
  },
  {
    id: 'pork-neck', category: 'pork', name: 'Խոզի վզամիս', price: 4600, unit: 'կգ',
    description: 'Հյութալի կտրվածք՝ բնական ճարպաշերտով, շամփուրի ու գրիլի համար։',
    image: '/images/product-pork-neck.avif', smallImage: '/images/product-pork-neck-sm.webp',
    alt: 'Երեք թարմ խոզի վզամսի կտրվածք', cooking: 'Գրիլ · Շամփուր',
  },
  {
    id: 'pork-ribs', category: 'pork', name: 'Խոզի կողիկներ', price: 4900, unit: 'կգ',
    description: 'Ամբողջական կողաշար՝ BBQ սոուսի, ջեռոցի կամ բաց կրակի համար։',
    image: '/images/product-pork-ribs.avif', smallImage: '/images/product-pork-ribs-sm.webp',
    alt: 'Թարմ խոզի ամբողջական կողաշար', cooking: 'BBQ · Ջեռոց',
  },
  {
    id: 'chicken-skewers', category: 'poultry', name: 'Հավի ազդրամսի շամփուրներ', price: 3900, unit: 'կգ',
    description: 'Առանց ոսկորի հավի ազդրամիս՝ պապրիկայով և թարմ պղպեղով մարինացված։',
    image: '/images/product-chicken-skewers.avif', smallImage: '/images/product-chicken-skewers-sm.webp',
    alt: 'Ութ հում մարինացված հավի շամփուր', cooking: 'Գրիլ · Շամփուր', badge: 'Grill ready',
  },
  {
    id: 'sausages', category: 'ready', name: 'Գրիլ նրբերշիկներ', price: 2600, unit: '500 գ',
    description: 'Բնական թաղանթով, համեմունքների հավասարակշռված խառնուրդով ութ նրբերշիկ։',
    image: '/images/product-sausages.avif', smallImage: '/images/product-sausages-sm.webp',
    alt: 'Ութ թարմ արհեստավորական գրիլ նրբերշիկ', cooking: 'Գրիլ · Թավա',
  },
]

export const boxes = [
  {
    id: 'duo', name: 'Duo Box', people: 2, price: 16900, meatWeight: '1.1 կգ', grills: 1,
    tagline: 'Փոքր կազմ, ամբողջական երեկո', image: '/images/box-duo.avif', smallImage: '/images/box-duo-sm.webp',
    alt: 'Matador Duo Box՝ մինի գրիլով, սթեյքերով, շամփուրներով և սոուսներով',
    meats: ['Խոզի վզամիս · 400 գ', 'Հավի ազդրամիս · 400 գ', 'Գրիլ նրբերշիկներ · 300 գ'],
    extras: ['Մինի գրիլ՝ ածուխով', 'Գրիլի բանջարեղեն · 500 գ', 'Լավաշ · 2 հատ', 'BBQ և սխտորային սոուս', '2 անձի սպասք և պարագաներ'],
  },
  {
    id: 'company', name: 'Company Box', people: 5, price: 34900, meatWeight: '2.8 կգ', grills: 1,
    tagline: 'Հինգ հոգի, մեկ տուփ, ոչ մի ավելորդ գնում', image: '/images/box-company.avif', smallImage: '/images/box-company-sm.webp',
    alt: 'Matador Company Box՝ հինգ հոգու համար մսով, գրիլով և ամբողջական պարագաներով',
    meats: ['Խոզի վզամիս · 800 գ', 'Հավի ազդրամիս · 800 գ', 'Տավարի լյուլյա · 700 գ', 'Գրիլ նրբերշիկներ · 500 գ'],
    extras: ['Մինի գրիլ՝ ածուխով', 'Գրիլի բանջարեղեն · 1 կգ', 'Լավաշ · 5 հատ', '3 տեսակի սոուս', '5 անձի սպասք և պարագաներ'],
  },
  {
    id: 'grande', name: 'Grande Box', people: 10, price: 69900, meatWeight: '5.4 կգ', grills: 2,
    tagline: 'Մեծ հավաքույթի ամբողջ կրակը՝ երկու գրիլում', image: '/images/box-grande.avif', smallImage: '/images/box-grande-sm.webp',
    alt: 'Matador Grande Box՝ տասը հոգու համար երկու գրիլով և մեծ մսային հավաքածուով',
    meats: ['Տավարի սթեյք · 1.2 կգ', 'Խոզի կողիկներ · 1.2 կգ', 'Հավի ազդրամիս · 1.2 կգ', 'Գառան և տավարի լյուլյա · 1 կգ', 'Գրիլ նրբերշիկներ · 800 գ'],
    extras: ['2 մինի գրիլ՝ ածուխով', 'Գրիլի բանջարեղեն · 2 կգ', 'Լավաշ · 10 հատ', '4 տեսակի սոուս', '10 անձի սպասք և պարագաներ'],
  },
]

export const grillFacts = [
  ['25×26×7 սմ', 'կոմպակտ չափ'],
  ['մոտ 490 գ', 'թեթև հավաքածու'],
  ['մինչև 2 ժամ', 'այրում՝ պայմաններից կախված'],
  ['4-ը 1-ում', 'ածուխ, ցանց, տակդիր, տարա'],
]

export const formatPrice = value => `${Number(value).toLocaleString('hy-AM')} ֏`
