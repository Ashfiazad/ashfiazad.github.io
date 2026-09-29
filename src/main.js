import './style.css'

// ===== 1. Dismissible Spotlight Alert (with sessionStorage persistence) =====
const alertBox = document.getElementById('spotlight-alert')
const closeAlertBtn = document.getElementById('close-alert')

if (alertBox && sessionStorage.getItem('alert-dismissed')) {
  alertBox.remove()
} else if (closeAlertBtn && alertBox) {
  closeAlertBtn.addEventListener('click', () => {
    alertBox.style.marginTop = `-${alertBox.offsetHeight}px`
    alertBox.style.opacity = '0'
    sessionStorage.setItem('alert-dismissed', 'true')
    setTimeout(() => alertBox.remove(), 300)
  })
}

// ===== 2. Mobile Menu Toggle (with ✕ animation + aria) =====
const mobileBtn = document.getElementById('mobile-menu-btn')
const mobileNav = document.getElementById('mobile-nav')
let menuOpen = false

if (mobileBtn && mobileNav) {
  mobileBtn.addEventListener('click', () => {
    menuOpen = !menuOpen
    mobileNav.classList.toggle('open', menuOpen)
    mobileBtn.classList.toggle('active', menuOpen)
    mobileBtn.setAttribute('aria-expanded', String(menuOpen))
  })
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false
      mobileNav.classList.remove('open')
      mobileBtn.classList.remove('active')
      mobileBtn.setAttribute('aria-expanded', 'false')
    })
  })
}

// ===== 3. Set dynamic year =====
const yearEl = document.getElementById('year')
if (yearEl) yearEl.textContent = new Date().getFullYear()

// ===== 4. Scroll-triggered reveal animations =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
  revealObserver.observe(el)
})

// ===== 5. Consolidated scroll handler (single rAF loop) =====
const navLinks = document.querySelectorAll('.nav-link')
const sections = document.querySelectorAll('section[id]')
const header = document.getElementById('site-header')
const heroBg = document.getElementById('hero-bg')
const heroSection = document.getElementById('home')
const backToTop = document.getElementById('back-to-top')

let ticking = false

const onScroll = () => {
  if (ticking) return
  ticking = true
  
  requestAnimationFrame(() => {
    const scrollY = window.scrollY

    // Active nav link highlighting
    const scrollPos = scrollY + 120
    sections.forEach(section => {
      const top = section.offsetTop
      const height = section.offsetHeight
      const id = section.getAttribute('id')
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active')
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active')
          }
        })
      }
    })

    // Header shadow
    if (header) {
      header.classList.toggle('scrolled', scrollY > 50)
    }

    // Hero parallax
    if (heroBg && heroSection) {
      const rect = heroSection.getBoundingClientRect()
      if (rect.bottom > 0) {
        const scrolled = -rect.top * 0.3
        heroBg.style.transform = `translateY(${scrolled}px) scale(1.1)`
      }
    }

    // Back to top button
    if (backToTop) {
      backToTop.classList.toggle('visible', scrollY > 600)
    }

    ticking = false
  })
}

window.addEventListener('scroll', onScroll, { passive: true })
onScroll()

// Back to top click handler
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// ===== Mock Data =====
const portfolioData = [
    {
        id: 1,
        title: 'Aftermath',
        type: 'painting',
        img: '/images/portfolio/aftermath.jpg',
        desc: 'Aftermath - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 2,
        title: 'Concrete Root',
        type: 'mixed-media',
        img: '/images/portfolio/concrete-root.jpg',
        desc: 'Concrete Root - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 3,
        title: 'Fault Lines',
        type: 'painting',
        img: '/images/portfolio/fault-lines.jpg',
        desc: 'Fault Lines - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 4,
        title: 'Liminal Presence',
        type: 'mixed-media',
        img: '/images/portfolio/liminal-presence.jpg',
        desc: 'Liminal Presence - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 5,
        title: 'Living Off, Living On',
        type: 'mixed-media',
        img: '/images/portfolio/living-off.jpg',
        desc: 'Living Off, Living On - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 6,
        title: 'Primordial',
        type: 'painting',
        img: '/images/portfolio/primordial.jpg',
        desc: 'Primordial - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 7,
        title: 'Ruins',
        type: 'painting',
        img: '/images/portfolio/ruins.jpg',
        desc: 'Ruins - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 8,
        title: 'Screen Empathy',
        type: 'painting',
        img: '/images/portfolio/screen-empathy.jpg',
        desc: 'Screen Empathy - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 9,
        title: 'The Ultimate Portrait',
        type: 'portrait',
        img: '/images/portfolio/tagore-portrait.jpg',
        desc: 'The Ultimate Portrait - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 10,
        title: 'Unseen',
        type: 'mixed-media',
        img: '/images/portfolio/unseen.jpg',
        desc: 'Unseen - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 11,
        title: 'War Code',
        type: 'painting',
        img: '/images/portfolio/war-code.jpg',
        desc: 'War Code - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 12,
        title: 'Fragments',
        type: 'mixed-media',
        img: '/images/portfolio/ep.jpg',
        desc: 'Fragments - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 13,
        title: 'Tangled Strings',
        type: 'portrait',
        img: '/images/portfolio/pp.jpg',
        desc: 'Tangled Strings - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 14,
        title: 'Monument Park',
        type: 'landscape',
        img: '/images/portfolio/land.jpg',
        desc: 'Monument Park - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 15,
        title: 'Still Life with Vases',
        type: 'still-life',
        img: '/images/portfolio/still-life-1.jpg',
        desc: 'Still Life with Vases - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 16,
        title: 'Still Life with Fruits',
        type: 'still-life',
        img: '/images/portfolio/still-life-2.jpg',
        desc: 'Still Life with Fruits - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 17,
        title: 'Business Burden',
        type: 'mixed-media',
        img: '/images/portfolio/kk.jpg',
        desc: 'Business Burden - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 18,
        title: 'Crimson Horizon',
        type: 'painting',
        img: '/images/portfolio/crimson-horizon.jpg',
        desc: 'Crimson Horizon - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 19,
        title: 'Glimpse',
        type: 'mixed-media',
        img: '/images/portfolio/glimpse.jpg',
        desc: 'Glimpse - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 20,
        title: 'Fragments II',
        type: 'mixed-media',
        img: '/images/portfolio/fragments-ii.jpg',
        desc: 'Fragments II - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 21,
        title: 'Core',
        type: 'mixed-media',
        img: '/images/portfolio/core.jpg',
        desc: 'Core - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 22,
        title: 'The Voice (Tagore)',
        type: 'mixed-media',
        img: '/images/portfolio/the-voice.jpg',
        desc: 'The Voice (Tagore) - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    },
    {
        id: 23,
        title: 'Urban Canvas',
        type: 'mixed-media',
        img: '/images/portfolio/urban-canvas.jpg',
        desc: 'Urban Canvas - Ashfi Azad',
        medium: 'Mixed Media/Painting'
    }
]

const upcomingEvents = [
  { date: 'Apr 10, 2026', title: 'Solo Exhibition: Echoes', location: 'Tate Modern, London' },
  { date: 'May 22, 2026', title: 'Group Show: New Voices', location: 'MoMA, New York' }
]

const pastEvents = [
  { date: 'Nov 15, 2025', title: 'Urban Landscapes', location: 'Gallery 1988, LA' },
  { date: 'Sep 05, 2025', title: 'Digital Frontiers', location: 'Ars Electronica, Linz' },
  { date: 'Mar 20, 2025', title: 'Beginnings', location: 'Local Arts Center' }
]

const storeData = [
    {
        id: 1,
        title: 'Aftermath (Print)',
        price: '$160.00',
        img: '/images/portfolio/aftermath.jpg',
        type: 'Print',
        description: 'High-quality art print of "Aftermath" on archival paper.'
    },
    {
        id: 2,
        title: 'Concrete Root (Print)',
        price: '$170.00',
        img: '/images/portfolio/concrete-root.jpg',
        type: 'Print',
        description: 'High-quality art print of "Concrete Root" on archival paper.'
    },
    {
        id: 3,
        title: 'Fault Lines (Print)',
        price: '$180.00',
        img: '/images/portfolio/fault-lines.jpg',
        type: 'Print',
        description: 'High-quality art print of "Fault Lines" on archival paper.'
    },
    {
        id: 4,
        title: 'Liminal Presence (Print)',
        price: '$190.00',
        img: '/images/portfolio/liminal-presence.jpg',
        type: 'Print',
        description: 'High-quality art print of "Liminal Presence" on archival paper.'
    },
    {
        id: 5,
        title: 'Living Off, Living On (Print)',
        price: '$200.00',
        img: '/images/portfolio/living-off.jpg',
        type: 'Print',
        description: 'High-quality art print of "Living Off, Living On" on archival paper.'
    },
    {
        id: 6,
        title: 'Primordial (Print)',
        price: '$210.00',
        img: '/images/portfolio/primordial.jpg',
        type: 'Print',
        description: 'High-quality art print of "Primordial" on archival paper.'
    },
    {
        id: 7,
        title: 'Ruins (Print)',
        price: '$220.00',
        img: '/images/portfolio/ruins.jpg',
        type: 'Print',
        description: 'High-quality art print of "Ruins" on archival paper.'
    },
    {
        id: 8,
        title: 'Screen Empathy (Print)',
        price: '$230.00',
        img: '/images/portfolio/screen-empathy.jpg',
        type: 'Print',
        description: 'High-quality art print of "Screen Empathy" on archival paper.'
    },
    {
        id: 9,
        title: 'The Ultimate Portrait (Print)',
        price: '$240.00',
        img: '/images/portfolio/tagore-portrait.jpg',
        type: 'Print',
        description: 'High-quality art print of "The Ultimate Portrait" on archival paper.'
    },
    {
        id: 10,
        title: 'Unseen (Print)',
        price: '$250.00',
        img: '/images/portfolio/unseen.jpg',
        type: 'Print',
        description: 'High-quality art print of "Unseen" on archival paper.'
    },
    {
        id: 11,
        title: 'War Code (Print)',
        price: '$260.00',
        img: '/images/portfolio/war-code.jpg',
        type: 'Print',
        description: 'High-quality art print of "War Code" on archival paper.'
    },
    {
        id: 12,
        title: 'Fragments (Print)',
        price: '$270.00',
        img: '/images/portfolio/ep.jpg',
        type: 'Print',
        description: 'High-quality art print of "Fragments" on archival paper.'
    },
    {
        id: 13,
        title: 'Tangled Strings (Print)',
        price: '$280.00',
        img: '/images/portfolio/pp.jpg',
        type: 'Print',
        description: 'High-quality art print of "Tangled Strings" on archival paper.'
    },
    {
        id: 14,
        title: 'Monument Park (Print)',
        price: '$290.00',
        img: '/images/portfolio/land.jpg',
        type: 'Print',
        description: 'High-quality art print of "Monument Park" on archival paper.'
    },
    {
        id: 15,
        title: 'Still Life with Vases (Print)',
        price: '$300.00',
        img: '/images/portfolio/still-life-1.jpg',
        type: 'Print',
        description: 'High-quality art print of "Still Life with Vases" on archival paper.'
    },
    {
        id: 16,
        title: 'Still Life with Fruits (Print)',
        price: '$310.00',
        img: '/images/portfolio/still-life-2.jpg',
        type: 'Print',
        description: 'High-quality art print of "Still Life with Fruits" on archival paper.'
    },
    {
        id: 17,
        title: 'Business Burden (Print)',
        price: '$320.00',
        img: '/images/portfolio/kk.jpg',
        type: 'Print',
        description: 'High-quality art print of "Business Burden" on archival paper.'
    },
    {
        id: 18,
        title: 'Crimson Horizon (Print)',
        price: '$330.00',
        img: '/images/portfolio/crimson-horizon.jpg',
        type: 'Print',
        description: 'High-quality art print of "Crimson Horizon" on archival paper.'
    },
    {
        id: 19,
        title: 'Glimpse (Print)',
        price: '$340.00',
        img: '/images/portfolio/glimpse.jpg',
        type: 'Print',
        description: 'High-quality art print of "Glimpse" on archival paper.'
    },
    {
        id: 20,
        title: 'Fragments II (Print)',
        price: '$350.00',
        img: '/images/portfolio/fragments-ii.jpg',
        type: 'Print',
        description: 'High-quality art print of "Fragments II" on archival paper.'
    },
    {
        id: 21,
        title: 'Core (Print)',
        price: '$360.00',
        img: '/images/portfolio/core.jpg',
        type: 'Print',
        description: 'High-quality art print of "Core" on archival paper.'
    },
    {
        id: 22,
        title: 'The Voice (Tagore) (Print)',
        price: '$370.00',
        img: '/images/portfolio/the-voice.jpg',
        type: 'Print',
        description: 'High-quality art print of "The Voice (Tagore)" on archival paper.'
    },
    {
        id: 23,
        title: 'Urban Canvas (Print)',
        price: '$380.00',
        img: '/images/portfolio/urban-canvas.jpg',
        type: 'Print',
        description: 'High-quality art print of "Urban Canvas" on archival paper.'
    }
]

// ===== 6. Render Events =====
const renderEvents = (events, containerId) => {
  const container = document.getElementById(containerId)
  if (!container) return
  
  events.forEach(ev => {
    const el = document.createElement('div')
    el.className = 'event-item flex flex-col sm:flex-row sm:justify-between sm:items-baseline border-b border-gray-100 pb-4 cursor-default'
    el.innerHTML = `
      <div>
        <h4 class="font-bold text-lg text-brand-dark">${ev.title}</h4>
        <p class="text-sm text-gray-500 italic mt-1 flex items-center gap-1">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          ${ev.location}
        </p>
      </div>
      <div class="mt-2 sm:mt-0 font-mono text-sm tracking-wider uppercase text-brand-accent-dark">${ev.date}</div>
    `
    container.appendChild(el)
  })
}
renderEvents(upcomingEvents, 'upcoming-events')
renderEvents(pastEvents, 'past-events')

// ===== 7. Render Store (with Inquire button, no fake cart) =====
const renderStoreItem = (item) => {
  const el = document.createElement('div')
  el.className = 'bg-gray-800/80 rounded-xl overflow-hidden group border border-gray-700/50 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-accent/10'
  
  const imgEl = document.createElement('div')
  imgEl.className = 'relative h-56 overflow-hidden'
  imgEl.innerHTML = `
    <img src="${item.img}" alt="${item.title} artwork" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async">
    <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-dark text-xs font-bold px-3 py-1 uppercase rounded-full tracking-wider">${item.type}</div>
  `
  
  const infoEl = document.createElement('div')
  infoEl.className = 'p-5'
  infoEl.innerHTML = `
    <h4 class="font-bold mb-1 text-white">${item.title}</h4>
    <p class="text-brand-accent font-semibold text-lg mb-4">${item.price}</p>
  `
  
  const btn = document.createElement('button')
  btn.className = 'w-full bg-white/10 backdrop-blur-sm text-white font-semibold py-2.5 rounded-lg border border-white/20 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all duration-300'
  btn.textContent = 'Inquire'
  btn.addEventListener('click', () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    showToast(`Inquiring about "${item.title}" — please send us a message below!`)
  })
  
  infoEl.appendChild(btn)
  el.appendChild(imgEl)
  el.appendChild(infoEl)
  return el
}

const storeOriginals = document.getElementById('store-originals')
const storePrints = document.getElementById('store-prints')

storeData.forEach(item => {
  if (item.type === 'Original' && storeOriginals) {
    storeOriginals.appendChild(renderStoreItem(item))
  } else if (item.type === 'Print' && storePrints) {
    storePrints.appendChild(renderStoreItem(item))
  }
})

// ===== 8. Toast Notification =====
const showToast = (message) => {
  const container = document.getElementById('toast-container')
  if (!container) return
  
  const toast = document.createElement('div')
  toast.className = 'bg-brand-dark text-white px-6 py-3.5 rounded-xl shadow-2xl transform translate-y-10 opacity-0 transition-all duration-300 flex items-center gap-3 border border-gray-700'
  toast.setAttribute('role', 'status')
  toast.innerHTML = `
    <div class="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center flex-shrink-0">
      <svg class="w-4 h-4 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    </div>
    <span class="text-sm">${message}</span>
  `
  container.appendChild(toast)
  
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0')
  }, 10)
  
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2')
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}

// Make showToast available globally for legacy inline usage
window.showToast = showToast

// ===== 9. Newsletter form =====
const newsletterForm = document.getElementById('newsletter-form')
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const emailInput = document.getElementById('newsletter-email')
    if (emailInput) {
      showToast('Thanks for subscribing! We\'ll keep you updated.')
      emailInput.value = ''
    }
  })
}

// ===== 10. Portfolio Filtering & Rendering =====
const portfolioGrid = document.getElementById('portfolio-grid')
const filterBtns = document.querySelectorAll('.filter-btn')

const renderPortfolio = (filter = 'all') => {
  if (!portfolioGrid) return
  
  portfolioGrid.innerHTML = ''
  
  const filteredData = filter === 'all' 
    ? portfolioData 
    : portfolioData.filter(item => item.type === filter)
    
  filteredData.forEach((item, index) => {
    const el = document.createElement('div')
    const heightClass = index % 3 === 0 ? 'h-80' : (index % 2 === 0 ? 'h-64' : 'h-72')
    
    el.className = `portfolio-item relative ${heightClass} rounded-xl overflow-hidden group cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300`
    el.style.opacity = '0' // Start hidden for animation
    el.setAttribute('tabindex', '0')
    el.setAttribute('role', 'button')
    el.setAttribute('aria-label', `View artwork: ${item.title} — ${item.desc}`)
    el.innerHTML = `
      <img src="${item.img}" alt="${item.title} — ${item.desc}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" decoding="async">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <span class="text-brand-accent text-xs uppercase tracking-[0.2em] font-semibold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${item.type}</span>
        <h3 class="text-white font-serif text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${item.title}</h3>
        <p class="text-gray-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">${item.desc}</p>
      </div>
    `
    
    el.addEventListener('click', () => openModal(item))
    el.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        openModal(item)
      }
    })
    portfolioGrid.appendChild(el)
  })
}

renderPortfolio()

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => {
      b.classList.remove('bg-brand-dark', 'text-white', 'shadow-sm')
      b.classList.add('bg-white', 'text-brand-dark')
      b.setAttribute('aria-selected', 'false')
    })
    
    const target = e.currentTarget
    target.classList.remove('bg-white', 'text-brand-dark')
    target.classList.add('bg-brand-dark', 'text-white', 'shadow-sm')
    target.setAttribute('aria-selected', 'true')
    
    renderPortfolio(target.dataset.filter)
  })
})

// ===== 11. Modal Logic (with focus trap) =====
const modal = document.getElementById('portfolio-modal')
const closeModalBtn = document.getElementById('close-modal')
const modalImg = document.getElementById('modal-img')
const modalTitle = document.getElementById('modal-title')
const modalDesc = document.getElementById('modal-desc')
const modalMeta = document.getElementById('modal-meta')
const modalContent = document.getElementById('modal-content')

let previouslyFocusedElement = null

const openModal = (item) => {
  previouslyFocusedElement = document.activeElement
  
  modalImg.src = item.img
  modalImg.alt = `${item.title} — ${item.desc}`
  modalTitle.textContent = item.title
  modalDesc.textContent = item.desc
  modalMeta.textContent = item.type
  
  modal.classList.remove('hidden')
  modal.classList.add('flex')
  void modal.offsetWidth
  modal.classList.remove('opacity-0')
  modalContent.classList.remove('scale-95')
  modalContent.classList.add('scale-100')
  document.body.style.overflow = 'hidden'
  
  // Focus the close button
  closeModalBtn?.focus()
}

const closeModal = () => {
  modal.classList.add('opacity-0')
  modalContent.classList.remove('scale-100')
  modalContent.classList.add('scale-95')
  setTimeout(() => {
    modal.classList.add('hidden')
    modal.classList.remove('flex')
    document.body.style.overflow = 'auto'
    // Restore focus to previously focused element
    previouslyFocusedElement?.focus()
  }, 300)
}

// Focus trap inside modal
const trapFocus = (e) => {
  if (modal.classList.contains('hidden')) return
  
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )
  const firstFocusable = focusableElements[0]
  const lastFocusable = focusableElements[focusableElements.length - 1]

  if (e.key === 'Tab') {
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        e.preventDefault()
        lastFocusable.focus()
      }
    } else {
      if (document.activeElement === lastFocusable) {
        e.preventDefault()
        firstFocusable.focus()
      }
    }
  }
}

if (closeModalBtn && modal) {
  closeModalBtn.addEventListener('click', closeModal)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal()
  })
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal()
    }
    trapFocus(e)
  })
}
