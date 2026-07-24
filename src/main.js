import './style.css'

// 1. Dismissible Spotlight Alert
const alertBox = document.getElementById('spotlight-alert')
const closeAlertBtn = document.getElementById('close-alert')
if (closeAlertBtn && alertBox) {
  closeAlertBtn.addEventListener('click', () => {
    alertBox.style.marginTop = `-${alertBox.offsetHeight}px`
    setTimeout(() => alertBox.remove(), 300)
  })
}

// 2. Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn')
const mobileNav = document.getElementById('mobile-nav')
if (mobileBtn && mobileNav) {
  mobileBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('hidden')
    mobileNav.classList.toggle('flex')
  })
  
  // Close menu on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.add('hidden')
      mobileNav.classList.remove('flex')
    })
  })
}

// 3. Set dynamic year in footer
const yearEl = document.getElementById('year')
if (yearEl) {
  yearEl.textContent = new Date().getFullYear()
}

// Mock Data
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

// 4. Render Events
const renderEvents = (events, containerId) => {
  const container = document.getElementById(containerId)
  if (!container) return
  
  events.forEach(ev => {
    const el = document.createElement('div')
    el.className = 'flex flex-col sm:flex-row sm:justify-between sm:items-baseline border-b border-gray-100 pb-4'
    el.innerHTML = `
      <div>
        <h4 class="font-bold text-lg text-brand-dark">${ev.title}</h4>
        <p class="text-sm italic">${ev.location}</p>
      </div>
      <div class="mt-2 sm:mt-0 font-mono text-sm tracking-wider uppercase text-brand-accent">${ev.date}</div>
    `
    container.appendChild(el)
  })
}
renderEvents(upcomingEvents, 'upcoming-events')
renderEvents(pastEvents, 'past-events')


// 5. Render Store
const storeGrid = document.getElementById('store-grid')
if (storeGrid) {
  storeData.forEach(item => {
    const el = document.createElement('div')
    el.className = 'bg-gray-800 rounded overflow-hidden group'
    el.innerHTML = `
      <div class="relative h-48 overflow-hidden">
        <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
        <div class="absolute top-2 right-2 bg-white text-brand-dark text-xs font-bold px-2 py-1 uppercase rounded">${item.type}</div>
      </div>
      <div class="p-4">
        <h4 class="font-bold mb-1">${item.title}</h4>
        <p class="text-brand-accent mb-4">${item.price}</p>
        <button class="w-full bg-white text-brand-dark font-bold py-2 hover:bg-brand-accent hover:text-white transition-colors" onclick="showToast('Added ${item.title} to cart')">Add to Cart</button>
      </div>
    `
    storeGrid.appendChild(el)
  })
}

// 6. Toast Notification
window.showToast = (message) => {
  const container = document.getElementById('toast-container')
  if (!container) return
  
  const toast = document.createElement('div')
  toast.className = 'bg-brand-dark text-white px-6 py-3 rounded shadow-lg transform translate-y-10 opacity-0 transition-all duration-300 flex items-center gap-3'
  toast.innerHTML = `
    <svg class="w-5 h-5 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
    <span>${message}</span>
  `
  container.appendChild(toast)
  
  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-10', 'opacity-0')
  }, 10)
  
  // Animate out
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2')
    setTimeout(() => toast.remove(), 300)
  }, 3000)
}

// 7. Portfolio Filtering & Rendering
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
    // Masonry effect alternative using different heights based on index
    const heightClass = index % 3 === 0 ? 'h-80' : (index % 2 === 0 ? 'h-64' : 'h-72')
    
    el.className = `relative ${heightClass} rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`
    el.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
        <h3 class="text-white font-serif text-xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">${item.title}</h3>
        <p class="text-gray-300 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">${item.desc}</p>
      </div>
    `
    
    // Open modal on click
    el.addEventListener('click', () => openModal(item))
    
    portfolioGrid.appendChild(el)
  })
}

// Initialize portfolio
renderPortfolio()

// Filter logic
filterBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Reset active states
    filterBtns.forEach(b => {
      b.classList.remove('bg-brand-dark', 'text-white')
      b.classList.add('bg-white', 'text-brand-dark')
    })
    
    // Set current active
    const target = e.currentTarget
    target.classList.remove('bg-white', 'text-brand-dark')
    target.classList.add('bg-brand-dark', 'text-white')
    
    renderPortfolio(target.dataset.filter)
  })
})

// 8. Modal Logic
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
  // trigger reflow
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
