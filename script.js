// Sample Properties Data
const sampleProperties = [
  {
    id: 1,
    title: "Premium 3BHK Apartment",
    description: "Spacious 3BHK apartment with modern amenities and city view. Perfect for families looking for comfort and convenience.",
    type: "residential",
    location: "Sector 82, Landran",
    address: "Sector 82, Landran, Mohali, Punjab",
    rent: 25000,
    area: 1200,
    bedrooms: 3,
    bathrooms: 2,
    amenities: ["Parking", "Balcony", "Lift", "Security", "Power Backup"],
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
    contactNumber: "8840023904",
    isActive: true
  },
  {
    id: 2,
    title: "Corporate Office Space",
    description: "Modern office space with contemporary interiors, perfect for growing businesses and startups.",
    type: "commercial",
    location: "Phase 8B, Landran",
    address: "Phase 8B, Landran, Mohali, Punjab",
    rent: 45000,
    area: 2000,
    bedrooms: null,
    bathrooms: 2,
    amenities: ["Conference Room", "AC", "Parking", "Wi-Fi", "Security"],
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
    contactNumber: "8840023904",
    isActive: true
  },
  {
    id: 3,
    title: "Luxury Villa",
    description: "Stunning 4BHK villa with garden, swimming pool, and premium finishes in a prime location.",
    type: "residential",
    location: "Sector 80, Landran",
    address: "Sector 80, Landran, Mohali, Punjab",
    rent: 65000,
    area: 3500,
    bedrooms: 4,
    bathrooms: 3,
    amenities: ["Garden", "Swimming Pool", "Parking", "Security", "Gym"],
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
    contactNumber: "8840023904",
    isActive: true
  },
  {
    id: 4,
    title: "Modern Studio Apartment",
    description: "Compact yet comfortable studio apartment with modern furnishing and all essential amenities.",
    type: "apartment",
    location: "Sector 81, Landran",
    address: "Sector 81, Landran, Mohali, Punjab",
    rent: 12000,
    area: 450,
    bedrooms: 1,
    bathrooms: 1,
    amenities: ["Furnished", "Gym", "Security", "Power Backup"],
    images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
    contactNumber: "8840023904",
    isActive: true
  },
  {
    id: 5,
    title: "Prime Retail Space",
    description: "High-visibility retail space in main market area with excellent footfall and modern amenities.",
    type: "commercial",
    location: "Main Market, Landran",
    address: "Main Market, Landran, Mohali, Punjab",
    rent: 35000,
    area: 800,
    bedrooms: null,
    bathrooms: 1,
    amenities: ["Ground Floor", "Display Windows", "Parking", "High Footfall"],
    images: ["https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
    contactNumber: "8840023904",
    isActive: true
  },
  {
    id: 6,
    title: "Spacious 2BHK Apartment",
    description: "Well-designed 2BHK apartment with balcony and city view, ideal for small families or working professionals.",
    type: "residential",
    location: "Sector 79, Landran",
    address: "Sector 79, Landran, Mohali, Punjab",
    rent: 18000,
    area: 950,
    bedrooms: 2,
    bathrooms: 2,
    amenities: ["Balcony", "Lift", "Security", "Parking"],
    images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"],
    contactNumber: "8840023904",
    isActive: true
  }
];

// Global State
let properties = [...sampleProperties];
let currentFilters = {};
let currentSort = 'price-low';
let editingPropertyId = null;

// Contact Information
const CONTACT_INFO = {
  phone: "8840023904",
  whatsapp: "https://chat.whatsapp.com/Kc4QBLMSB2SBkseUPAcrpe",
  instagram: "https://www.instagram.com/securestay_09?igsh=bGNuYXppaHZyZmhz"
};

// Property Types
const PROPERTY_TYPES = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "apartment", label: "Apartment" },
  { value: "office", label: "Office Space" }
];

// Utility Functions
function formatCurrency(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function getTypeColor(type) {
  switch (type) {
    case "residential":
      return "type-residential";
    case "commercial":
      return "type-commercial";
    case "apartment":
      return "type-apartment";
    case "office":
      return "type-office";
    default:
      return "type-residential";
  }
}

function getTypeLabel(type) {
  const typeObj = PROPERTY_TYPES.find(t => t.value === type);
  return typeObj ? typeObj.label : type.charAt(0).toUpperCase() + type.slice(1);
}

// Navigation Functions
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show selected page
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add('active');
  }
  
  // Update navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.remove('active');
  });
  
  document.querySelectorAll(`[href="#${pageId}"]`).forEach(link => {
    link.classList.add('active');
  });

  // Close mobile menu
  document.querySelector('.mobile-menu').classList.remove('active');

  // Load page-specific content
  if (pageId === 'properties') {
    loadAllProperties();
  } else if (pageId === 'admin') {
    loadAdminData();
  }
}

// Property Card Creation
function createPropertyCard(property) {
  const card = document.createElement('div');
  card.className = 'property-card';
  card.onclick = () => showPropertyDetails(property.id);
  
  const bedroomsInfo = property.bedrooms ? `
    <div class="feature-badge">
      <i class="fas fa-bed"></i>
      ${property.bedrooms} Bedrooms
    </div>
  ` : '';
  
  const bathroomsInfo = property.bathrooms ? `
    <div class="feature-badge">
      <i class="fas fa-bath"></i>
      ${property.bathrooms} Bathrooms
    </div>
  ` : '';
  
  const parkingInfo = property.amenities.includes("Parking") ? `
    <div class="feature-badge">
      <i class="fas fa-car"></i>
      Parking
    </div>
  ` : '';

  card.innerHTML = `
    <div class="property-image">
      <img src="${property.images[0] || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${property.title}">
      <div class="property-type-badge ${getTypeColor(property.type)}">
        ${getTypeLabel(property.type)}
      </div>
    </div>
    <div class="property-content">
      <h3 class="property-title">${property.title}</h3>
      <div class="property-location">
        <i class="fas fa-map-marker-alt"></i>
        ${property.location}
      </div>
      <div class="property-price-area">
        <div class="property-price">${formatCurrency(property.rent)}/month</div>
        <div class="property-area">${property.area} sq ft</div>
      </div>
      <div class="property-features">
        ${bedroomsInfo}
        ${bathroomsInfo}
        ${parkingInfo}
      </div>
      <div class="property-actions">
        <button class="view-details-btn" onclick="event.stopPropagation(); showPropertyDetails(${property.id})">
          View Details
        </button>
        <a href="tel:${property.contactNumber}" class="contact-link" onclick="event.stopPropagation()">
          <i class="fas fa-phone"></i>
          ${property.contactNumber}
        </a>
      </div>
    </div>
  `;
  
  return card;
}

// Property Details Modal
function showPropertyDetails(propertyId) {
  const property = properties.find(p => p.id === propertyId);
  if (!property) return;

  const modal = document.getElementById('property-modal');
  const detailsContainer = document.getElementById('property-details');
  
  const amenitiesGrid = property.amenities.map(amenity => {
    let icon = 'fas fa-home';
    if (amenity.toLowerCase().includes('parking')) icon = 'fas fa-car';
    else if (amenity.toLowerCase().includes('bed')) icon = 'fas fa-bed';
    else if (amenity.toLowerCase().includes('bath')) icon = 'fas fa-bath';
    else if (amenity.toLowerCase().includes('gym')) icon = 'fas fa-dumbbell';
    else if (amenity.toLowerCase().includes('pool')) icon = 'fas fa-swimming-pool';
    else if (amenity.toLowerCase().includes('garden')) icon = 'fas fa-leaf';
    else if (amenity.toLowerCase().includes('security')) icon = 'fas fa-shield-alt';
    else if (amenity.toLowerCase().includes('lift')) icon = 'fas fa-arrows-alt-v';
    else if (amenity.toLowerCase().includes('balcony')) icon = 'fas fa-building';
    else if (amenity.toLowerCase().includes('wifi')) icon = 'fas fa-wifi';
    else if (amenity.toLowerCase().includes('ac')) icon = 'fas fa-snowflake';

    return `
      <div class="amenity-item">
        <i class="${icon}"></i>
        <span>${amenity}</span>
      </div>
    `;
  }).join('');

  const bedroomsCard = property.bedrooms ? `
    <div class="stat-card">
      <div class="stat-number">${property.bedrooms}</div>
      <div class="stat-label">bedrooms</div>
    </div>
  ` : '';

  const bathroomsCard = property.bathrooms ? `
    <div class="stat-card">
      <div class="stat-number">${property.bathrooms}</div>
      <div class="stat-label">bathrooms</div>
    </div>
  ` : '';

  detailsContainer.innerHTML = `
    <div class="property-details-grid">
      <div>
        <img src="${property.images[0] || 'https://via.placeholder.com/800x400?text=No+Image'}" 
             alt="${property.title}" class="property-main-image">
        
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
          <h1 class="property-details-title">${property.title}</h1>
          <button onclick="shareProperty()" class="action-btn" title="Share Property">
            <i class="fas fa-share"></i>
          </button>
        </div>
        
        <div class="property-details-location">
          <i class="fas fa-map-marker-alt"></i>
          <span>${property.address}</span>
        </div>
        
        <div class="property-stats-grid">
          <div class="stat-card">
            <div class="stat-number">${formatCurrency(property.rent)}</div>
            <div class="stat-label">per month</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">${property.area}</div>
            <div class="stat-label">sq ft</div>
          </div>
          ${bedroomsCard}
          ${bathroomsCard}
        </div>
        
        <div class="property-description">
          <h3>Description</h3>
          <p>${property.description}</p>
        </div>
        
        <div>
          <h3 style="margin-bottom: 1rem;">Amenities</h3>
          <div class="amenities-grid">
            ${amenitiesGrid}
          </div>
        </div>
      </div>
      
      <div class="contact-sidebar">
        <h3>Contact Information</h3>
        <div class="contact-info-item">
          <i class="fas fa-phone"></i>
          <div>
            <div style="font-weight: 500;">Call Us</div>
            <a href="tel:${property.contactNumber}" style="color: var(--primary);">
              ${property.contactNumber}
            </a>
          </div>
        </div>
        
        <div class="contact-info-item">
          <i class="fab fa-whatsapp" style="color: var(--secondary);"></i>
          <div>
            <div style="font-weight: 500;">WhatsApp</div>
            <a href="${CONTACT_INFO.whatsapp}" target="_blank" style="color: var(--secondary);">
              Chat with us
            </a>
          </div>
        </div>
        
        <div class="contact-actions">
          <a href="tel:${property.contactNumber}" class="contact-btn primary">
            <i class="fas fa-phone"></i>
            Call Now
          </a>
          <a href="${CONTACT_INFO.whatsapp}" target="_blank" class="contact-btn secondary">
            <i class="fab fa-whatsapp"></i>
            WhatsApp
          </a>
        </div>
        
        <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: 0.5rem; padding: 1.5rem; margin-top: 2rem;">
          <h4 style="color: #1E40AF; margin-bottom: 0.5rem;">Schedule a Visit</h4>
          <p style="color: #1E40AF; font-size: 0.875rem; margin-bottom: 1rem;">
            Contact us to schedule a property visit at your convenience.
          </p>
          <button onclick="requestVisit(${property.id})" style="width: 100%; padding: 0.75rem; border: 1px solid #3B82F6; background: white; color: #3B82F6; border-radius: 0.5rem; font-weight: 500; cursor: pointer;">
            <i class="fas fa-calendar"></i>
            Request Visit
          </button>
        </div>
      </div>
    </div>
  `;
  
  modal.classList.add('active');
}

function shareProperty() {
  if (navigator.share) {
    navigator.share({
      title: 'Check out this property',
      text: 'Found this amazing property on SecureStay',
      url: window.location.href,
    });
  } else {
    navigator.clipboard.writeText(window.location.href).then(() => {
      alert('Property link copied to clipboard!');
    });
  }
}

function requestVisit(propertyId) {
  const property = properties.find(p => p.id === propertyId);
  const message = `Hi! I'm interested in visiting the property: ${property.title} located at ${property.location}. Could you please schedule a visit for me? Thank you!`;
  const whatsappUrl = `https://wa.me/918840023904?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// Search and Filter Functions
function filterProperties(searchFilters = {}) {
  let filtered = properties.filter(property => {
    if (!property.isActive) return false;
    
    if (searchFilters.type && property.type !== searchFilters.type) return false;
    if (searchFilters.location && !property.location.toLowerCase().includes(searchFilters.location.toLowerCase())) return false;
    if (searchFilters.minRent && property.rent < searchFilters.minRent) return false;
    if (searchFilters.maxRent && property.rent > searchFilters.maxRent) return false;
    
    return true;
  });
  
  return filtered;
}

function sortProperties(propertiesList, sortBy) {
  return [...propertiesList].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.rent - b.rent;
      case 'price-high':
        return b.rent - a.rent;
      case 'area-large':
        return b.area - a.area;
      case 'area-small':
        return a.area - b.area;
      default:
        return 0;
    }
  });
}

function performSearch(searchType = 'home') {
  const locationInput = document.getElementById(searchType === 'home' ? 'search-location' : 'properties-search-location');
  const typeSelect = document.getElementById(searchType === 'home' ? 'search-type' : 'properties-search-type');
  const priceSelect = document.getElementById(searchType === 'home' ? 'search-price' : 'properties-search-price');
  
  const filters = {};
  
  if (locationInput.value.trim()) {
    filters.location = locationInput.value.trim();
  }
  
  if (typeSelect.value) {
    filters.type = typeSelect.value;
  }
  
  if (priceSelect.value) {
    if (priceSelect.value === "50000+") {
      filters.minRent = 50000;
    } else {
      const [min, max] = priceSelect.value.split("-").map(Number);
      filters.minRent = min;
      filters.maxRent = max;
    }
  }
  
  currentFilters = filters;
  
  if (searchType === 'home') {
    showPage('properties');
  } else {
    loadAllProperties();
  }
}

// Property Loading Functions
function loadFeaturedProperties(filterType = 'all') {
  const grid = document.getElementById('properties-grid');
  if (!grid) return;
  
  let filtered = properties.filter(property => {
    if (!property.isActive) return false;
    if (filterType === 'all') return true;
    return property.type === filterType;
  });
  
  // Show only first 6 properties for featured section
  filtered = filtered.slice(0, 6);
  
  grid.innerHTML = '';
  filtered.forEach(property => {
    grid.appendChild(createPropertyCard(property));
  });
}

function loadAllProperties() {
  const grid = document.getElementById('all-properties-grid');
  const resultsCount = document.getElementById('results-count');
  const activeFiltersContainer = document.getElementById('active-filters-container');
  const clearFiltersBtn = document.getElementById('clear-filters');
  
  if (!grid) return;
  
  let filtered = filterProperties(currentFilters);
  let sorted = sortProperties(filtered, currentSort);
  
  // Update results count
  if (resultsCount) {
    resultsCount.innerHTML = `<p>${sorted.length} properties found</p>`;
  }
  
  // Update active filters display
  if (activeFiltersContainer) {
    activeFiltersContainer.innerHTML = '';
    
    if (currentFilters.type) {
      const typeLabel = getTypeLabel(currentFilters.type);
      const tag = document.createElement('div');
      tag.className = 'filter-tag';
      tag.textContent = typeLabel;
      activeFiltersContainer.appendChild(tag);
    }
    
    if (currentFilters.location) {
      const tag = document.createElement('div');
      tag.className = 'filter-tag';
      tag.textContent = `"${currentFilters.location}"`;
      activeFiltersContainer.appendChild(tag);
    }
    
    if (currentFilters.minRent || currentFilters.maxRent) {
      const tag = document.createElement('div');
      tag.className = 'filter-tag';
      tag.textContent = `₹${currentFilters.minRent || 0} - ₹${currentFilters.maxRent || "∞"}`;
      activeFiltersContainer.appendChild(tag);
    }
    
    if (clearFiltersBtn) {
      clearFiltersBtn.style.display = Object.keys(currentFilters).length > 0 ? 'block' : 'none';
    }
  }
  
  // Load properties
  grid.innerHTML = '';
  
  if (sorted.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;">
        <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">No properties found</h3>
        <p style="color: var(--muted-foreground); margin-bottom: 2rem;">
          Try adjusting your search criteria or browse all properties.
        </p>
        <button onclick="clearAllFilters()" class="view-all-btn">View All Properties</button>
      </div>
    `;
  } else {
    sorted.forEach(property => {
      grid.appendChild(createPropertyCard(property));
    });
  }
}

function clearAllFilters() {
  currentFilters = {};
  
  // Clear search inputs
  const locationInput = document.getElementById('properties-search-location');
  const typeSelect = document.getElementById('properties-search-type');
  const priceSelect = document.getElementById('properties-search-price');
  
  if (locationInput) locationInput.value = '';
  if (typeSelect) typeSelect.value = '';
  if (priceSelect) priceSelect.value = '';
  
  loadAllProperties();
}

// Admin Functions
function loadAdminData() {
  loadAdminStats();
  loadAdminTable();
}

function loadAdminStats() {
  const totalListings = document.getElementById('admin-total-listings');
  const activeRentals = document.getElementById('admin-active-rentals');
  const pendingApprovals = document.getElementById('admin-pending-approvals');
  
  if (totalListings) totalListings.textContent = properties.length;
  if (activeRentals) activeRentals.textContent = properties.filter(p => p.isActive).length;
  if (pendingApprovals) pendingApprovals.textContent = properties.filter(p => !p.isActive).length;
}

function loadAdminTable() {
  const tableContainer = document.getElementById('admin-properties-table');
  if (!tableContainer) return;
  
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Property</th>
        <th>Type</th>
        <th>Rent</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      ${properties.map(property => `
        <tr>
          <td>
            <div class="property-cell">
              <img src="${property.images[0] || 'https://via.placeholder.com/48x48?text=No+Image'}" 
                   alt="${property.title}" class="property-thumbnail">
              <div class="property-info">
                <h4>${property.title}</h4>
                <p>${property.location}</p>
              </div>
            </div>
          </td>
          <td>
            <div class="property-type-badge ${getTypeColor(property.type)}">
              ${getTypeLabel(property.type)}
            </div>
          </td>
          <td style="font-weight: 600;">${formatCurrency(property.rent)}</td>
          <td>
            <div class="badge ${property.isActive ? 'active' : 'inactive'}">
              ${property.isActive ? 'Active' : 'Inactive'}
            </div>
          </td>
          <td>
            <div class="action-buttons">
              <button class="action-btn edit" onclick="editProperty(${property.id})" title="Edit">
                <i class="fas fa-edit"></i>
              </button>
              <button class="action-btn delete" onclick="deleteProperty(${property.id})" title="Delete">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      `).join('')}
    </tbody>
  `;
  
  tableContainer.innerHTML = '';
  tableContainer.appendChild(table);
}

// Property Management Functions
function showPropertyForm(property = null) {
  const modal = document.getElementById('property-form-modal');
  const title = document.getElementById('property-form-title');
  const form = document.getElementById('property-form');
  
  editingPropertyId = property ? property.id : null;
  title.textContent = property ? 'Edit Property' : 'Add New Property';
  
  // Reset form
  form.reset();
  document.getElementById('amenities-list').innerHTML = '';
  document.getElementById('images-list').innerHTML = '';
  
  if (property) {
    // Fill form with property data
    document.getElementById('property-title').value = property.title;
    document.getElementById('property-type').value = property.type;
    document.getElementById('property-description').value = property.description;
    document.getElementById('property-location').value = property.location;
    document.getElementById('property-address').value = property.address;
    document.getElementById('property-rent').value = property.rent;
    document.getElementById('property-area').value = property.area;
    document.getElementById('property-bedrooms').value = property.bedrooms || '';
    document.getElementById('property-bathrooms').value = property.bathrooms || '';
    document.getElementById('property-contact').value = property.contactNumber;
    
    // Add amenities
    property.amenities.forEach(amenity => {
      addAmenityTag(amenity);
    });
    
    // Add images
    property.images.forEach(image => {
      addImagePreview(image);
    });
  } else {
    // Set default contact number
    document.getElementById('property-contact').value = '8840023904';
  }
  
  modal.classList.add('active');
}

function addAmenityTag(amenity) {
  const container = document.getElementById('amenities-list');
  const tag = document.createElement('div');
  tag.className = 'tag';
  tag.innerHTML = `
    <span>${amenity}</span>
    <span class="tag-remove" onclick="this.parentElement.remove()">×</span>
  `;
  container.appendChild(tag);
}

function addImagePreview(imageUrl) {
  const container = document.getElementById('images-list');
  const preview = document.createElement('div');
  preview.className = 'image-preview';
  preview.innerHTML = `
    <img src="${imageUrl}" alt="Property Image" onerror="this.src='https://via.placeholder.com/200x100?text=Invalid+Image'">
    <div class="image-preview-url">${imageUrl}</div>
    <button type="button" class="image-remove" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(preview);
}

function saveProperty() {
  const form = document.getElementById('property-form');
  const formData = new FormData(form);
  
  // Get amenities
  const amenities = Array.from(document.querySelectorAll('#amenities-list .tag span:first-child'))
    .map(span => span.textContent);
  
  // Get images
  const images = Array.from(document.querySelectorAll('#images-list .image-preview-url'))
    .map(div => div.textContent);
  
  const propertyData = {
    title: formData.get('title'),
    type: formData.get('type'),
    description: formData.get('description'),
    location: formData.get('location'),
    address: formData.get('address'),
    rent: parseInt(formData.get('rent')),
    area: parseInt(formData.get('area')),
    bedrooms: formData.get('bedrooms') ? parseInt(formData.get('bedrooms')) : null,
    bathrooms: formData.get('bathrooms') ? parseInt(formData.get('bathrooms')) : null,
    contactNumber: formData.get('contactNumber'),
    amenities: amenities,
    images: images,
    isActive: true
  };
  
  if (editingPropertyId) {
    // Update existing property
    const index = properties.findIndex(p => p.id === editingPropertyId);
    if (index !== -1) {
      properties[index] = { ...properties[index], ...propertyData };
    }
  } else {
    // Add new property
    const newId = Math.max(...properties.map(p => p.id), 0) + 1;
    properties.push({ id: newId, ...propertyData });
  }
  
  // Close modal and refresh data
  document.getElementById('property-form-modal').classList.remove('active');
  loadAdminData();
  loadFeaturedProperties();
  
  alert(editingPropertyId ? 'Property updated successfully!' : 'Property added successfully!');
}

function editProperty(id) {
  const property = properties.find(p => p.id === id);
  if (property) {
    showPropertyForm(property);
  }
}

function deleteProperty(id) {
  if (confirm('Are you sure you want to delete this property?')) {
    const index = properties.findIndex(p => p.id === id);
    if (index !== -1) {
      properties.splice(index, 1);
      loadAdminData();
      loadFeaturedProperties();
      alert('Property deleted successfully!');
    }
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
  // Navigation
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const pageId = this.getAttribute('href').substring(1);
      showPage(pageId);
    });
  });
  
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
    });
  }
  
  // Search functionality
  const searchBtn = document.getElementById('search-btn');
  const propertiesSearchBtn = document.getElementById('properties-search-btn');
  
  if (searchBtn) {
    searchBtn.addEventListener('click', () => performSearch('home'));
  }
  
  if (propertiesSearchBtn) {
    propertiesSearchBtn.addEventListener('click', () => performSearch('properties'));
  }
  
  // Enter key search
  document.querySelectorAll('#search-location, #properties-search-location').forEach(input => {
    input.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const searchType = this.id.includes('properties') ? 'properties' : 'home';
        performSearch(searchType);
      }
    });
  });
  
  // Property filters
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filterType = this.getAttribute('data-filter');
      loadFeaturedProperties(filterType);
    });
  });
  
  // View all properties button
  const viewAllBtn = document.getElementById('view-all-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', function() {
      showPage('properties');
    });
  }
  
  // Sort functionality
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      currentSort = this.value;
      loadAllProperties();
    });
  }
  
  // Clear filters
  const clearFiltersBtn = document.getElementById('clear-filters');
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', clearAllFilters);
  }
  
  // Modal close buttons
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
    });
  });
  
  // Modal background click to close
  document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.remove('active');
      }
    });
  });
  
  // Admin functionality
  const addPropertyBtn = document.getElementById('add-property-btn');
  if (addPropertyBtn) {
    addPropertyBtn.addEventListener('click', () => showPropertyForm());
  }
  
  // Property form
  const propertyForm = document.getElementById('property-form');
  if (propertyForm) {
    propertyForm.addEventListener('submit', function(e) {
      e.preventDefault();
      saveProperty();
    });
  }
  
  // Cancel button
  document.querySelectorAll('.cancel-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.closest('.modal').classList.remove('active');
    });
  });
  
  // Add amenity
  const addAmenityBtn = document.getElementById('add-amenity-btn');
  const newAmenityInput = document.getElementById('new-amenity');
  
  if (addAmenityBtn && newAmenityInput) {
    addAmenityBtn.addEventListener('click', function() {
      const amenity = newAmenityInput.value.trim();
      if (amenity) {
        addAmenityTag(amenity);
        newAmenityInput.value = '';
      }
    });
    
    newAmenityInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addAmenityBtn.click();
      }
    });
  }
  
  // Add image
  const addImageBtn = document.getElementById('add-image-btn');
  const newImageInput = document.getElementById('new-image');
  
  if (addImageBtn && newImageInput) {
    addImageBtn.addEventListener('click', function() {
      const imageUrl = newImageInput.value.trim();
      if (imageUrl) {
        addImagePreview(imageUrl);
        newImageInput.value = '';
      }
    });
    
    newImageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addImageBtn.click();
      }
    });
  }
  
  // Footer property type links
  document.querySelectorAll('a[data-filter]').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const filterType = this.getAttribute('data-filter');
      currentFilters = { type: filterType };
      showPage('properties');
    });
  });
  
  // Initialize the application
  loadFeaturedProperties();
  
  // Show home page by default
  showPage('home');
});

// Global functions for onclick handlers
window.showPropertyDetails = showPropertyDetails;
window.editProperty = editProperty;
window.deleteProperty = deleteProperty;
window.shareProperty = shareProperty;
window.requestVisit = requestVisit;
window.clearAllFilters = clearAllFilters;