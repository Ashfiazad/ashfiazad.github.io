import './style.css'

// ===== 1. Dismissible Spotlight Alert =====
const alertBox = document.getElementById('spotlight-alert')
const closeAlertBtn = document.getElementById('close-alert')
if (closeAlertBtn && alertBox) {
  closeAlertBtn.addEventListener('click', () => {
    alertBox.style.marginTop = `-${alertBox.offsetHeight}px`
    alertBox.style.opacity = '0'
    setTimeout(() => alertBox.remove(), 300)
  })
}

// ===== 2. Mobile Menu Toggle =====
const mobileBtn = document.getElementById('mobile-menu-btn')
const mobileNav = document.getElementById('mobile-nav')
if (mobileBtn && mobileNav) {
  mobileBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden')
    mobileNav.classList.toggle('flex')
  })
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden')
      mobileNav.classList.remove('flex')
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

// ===== 5. Active nav link highlighting on scroll =====
const navLinks = document.querySelectorAll('.nav-link')
const sections = document.querySelectorAll('section[id]')

const activateNavOnScroll = () => {
  const scrollY = window.scrollY + 120

  sections.forEach(section => {
    const top = section.offsetTop
    const height = section.offsetHeight
    const id = section.getAttribute('id')
    
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active')
        }
      })
    }
  })
}
window.addEventListener('scroll', activateNavOnScroll, { passive: true })
activateNavOnScroll()

// ===== 6. Header shadow on scroll =====
const header = document.getElementById('site-header')
const handleHeaderScroll = () => {
  if (window.scrollY > 50) {
    header?.classList.add('scrolled')
  } else {
    header?.classList.remove('scrolled')
  }
}
window.addEventListener('scroll', handleHeaderScroll, { passive: true })

// ===== 7. Hero parallax =====
const heroBg = document.getElementById('hero-bg')
const heroSection = document.getElementById('home')
const handleParallax = () => {
  if (!heroBg || !heroSection) return
  const rect = heroSection.getBoundingClientRect()
  if (rect.bottom > 0) {
    const scrolled = -rect.top * 0.3
    heroBg.style.transform = `translateY(${scrolled}px) scale(1.1)`
  }
}
window.addEventListener('scroll', handleParallax, { passive: true })

// ===== 8. Back to top button =====
const backToTop = document.getElementById('back-to-top')
const handleBackToTop = () => {
  if (window.scrollY > 600) {
    backToTop?.classList.add('visible')
  } else {
    backToTop?.classList.remove('visible')
  }
}
window.addEventListener('scroll', handleBackToTop, { passive: true })
backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

// ===== Mock Data =====
const portfolioData = [
  { id: 1, type: 'painting', title: 'Urban Decay', desc: 'Oil on canvas, 24x36"', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 2, type: 'digital', title: 'Neon Dreams', desc: 'Digital Illustration', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 3, type: 'painting', title: 'Serenity', desc: 'Acrylic on wood, 18x24"', img: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 4, type: 'sketch', title: 'Study of Hands', desc: 'Charcoal on paper', img: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 5, type: 'digital', title: 'Cyber City', desc: 'Digital 3D render', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
  { id: 6, type: 'painting', title: 'Abstract Thought', desc: 'Mixed media on canvas', img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
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
  { id: 101, title: 'Echoes - Original', price: '$2,500', type: 'Original', img: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 102, title: 'Serenity - Print', price: '$150', type: 'Print', img: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 103, title: 'Urban Decay - Print', price: '$150', type: 'Print', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' },
  { id: 104, title: 'Neon Dreams - Print', price: '$120', type: 'Print', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80' }
]

// ===== 9. Render Events =====
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
      <div class="mt-2 sm:mt-0 font-mono text-sm tracking-wider uppercase text-brand-accent">${ev.date}</div>
    `
    container.appendChild(el)
  })
}
renderEvents(upcomingEvents, 'upcoming-events')
renderEvents(pastEvents, 'past-events')

// ===== 10. Render Store (split by category) =====
const renderStoreItem = (item) => {
  const el = document.createElement('div')
  el.className = 'bg-gray-800/80 rounded-xl overflow-hidden group border border-gray-700/50 hover:border-brand-accent/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-accent/10'
  el.innerHTML = `
    <div class="relative h-56 overflow-hidden">
      <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
      <div class="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-dark text-xs font-bold px-3 py-1 uppercase rounded-full tracking-wider">${item.type}</div>
    </div>
    <div class="p-5">
      <h4 class="font-bold mb-1 text-white">${item.title}</h4>
      <p class="text-brand-accent font-semibold text-lg mb-4">${item.price}</p>
      <button class="w-full bg-white/10 backdrop-blur-sm text-white font-semibold py-2.5 rounded-lg border border-white/20 hover:bg-brand-accent hover:text-brand-dark hover:border-brand-accent transition-all duration-300" onclick="showToast('Added ${item.title} to cart')">Add to Cart</button>
    </div>
  `
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

// ===== 11. Toast Notification =====
window.showToast = (message) => {
  const container = document.getElementById('toast-container')
  if (!container) return
  
  const toast = document.createElement('div')
  toast.className = 'bg-brand-dark text-white px-6 py-3.5 rounded-xl shadow-2xl transform translate-y-10 opacity-0 transition-all duration-300 flex items-center gap-3 border border-gray-700'
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

// ===== 12. Portfolio Filtering & Rendering =====
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
    el.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <span class="text-brand-accent text-xs uppercase tracking-[0.2em] font-semibold mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${item.type}</span>
        <h3 class="text-white font-serif text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${item.title}</h3>
        <p class="text-gray-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">${item.desc}</p>
      </div>
    `
    
    el.addEventListener('click', () => openModal(item))
    portfolioGrid.appendChild(el)
  })
}

renderPortfolio()

filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    filterBtns.forEach(b => {
      b.classList.remove('bg-brand-dark', 'text-white', 'shadow-sm')
      b.classList.add('bg-white', 'text-brand-dark')
    })
    
    const target = e.currentTarget
    target.classList.remove('bg-white', 'text-brand-dark')
    target.classList.add('bg-brand-dark', 'text-white', 'shadow-sm')
    
    renderPortfolio(target.dataset.filter)
  })
})

// ===== 13. Modal Logic =====
const modal = document.getElementById('portfolio-modal')
const closeModalBtn = document.getElementById('close-modal')
const modalImg = document.getElementById('modal-img')
const modalTitle = document.getElementById('modal-title')
const modalDesc = document.getElementById('modal-desc')
const modalMeta = document.getElementById('modal-meta')
const modalContent = document.getElementById('modal-content')

const openModal = (item) => {
  modalImg.src = item.img
  modalTitle.textContent = item.title
  modalDesc.textContent = item.desc
  modalMeta.textContent = item.type
  
  modal.classList.remove('hidden')
  void modal.offsetWidth
  modal.classList.remove('opacity-0')
  modalContent.classList.remove('scale-95')
  modalContent.classList.add('scale-100')
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  modal.classList.add('opacity-0')
  modalContent.classList.remove('scale-100')
  modalContent.classList.add('scale-95')
  setTimeout(() => {
    modal.classList.add('hidden')
    document.body.style.overflow = 'auto'
  }, 300)
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
  })
}
