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
  { id: 1, type: 'painting', title: 'Urban Decay', desc: 'Oil on canvas, 24×36″', img: '/images/portfolio/urban-decay.jpg' },
  { id: 2, type: 'digital', title: 'Neon Dreams', desc: 'Digital Illustration', img: '/images/portfolio/neon-dreams.jpg' },
  { id: 3, type: 'painting', title: 'Serenity', desc: 'Acrylic on wood, 18×24″', img: '/images/portfolio/serenity.jpg' },
  { id: 4, type: 'sketch', title: 'Study of Hands', desc: 'Charcoal on paper', img: '/images/portfolio/study-of-hands.jpg' },
  { id: 5, type: 'digital', title: 'Cyber City', desc: 'Digital 3D render', img: '/images/portfolio/cyber-city.jpg' },
  { id: 6, type: 'painting', title: 'Abstract Thought', desc: 'Mixed media on canvas', img: '/images/portfolio/abstract-thought.jpg' }
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
  { id: 101, title: 'Echoes — Original', price: '$2,500', type: 'Original', img: '/images/hero-bg.jpg' },
  { id: 102, title: 'Serenity — Print', price: '$150', type: 'Print', img: '/images/portfolio/serenity.jpg' },
  { id: 103, title: 'Urban Decay — Print', price: '$150', type: 'Print', img: '/images/portfolio/urban-decay.jpg' },
  { id: 104, title: 'Neon Dreams — Print', price: '$120', type: 'Print', img: '/images/portfolio/neon-dreams.jpg' }
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
