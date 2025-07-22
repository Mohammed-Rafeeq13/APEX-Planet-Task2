// Task 2: Intermediate HTML, CSS, and JavaScript
// Enhanced HTML and CSS skills, JavaScript for DOM manipulation

document.addEventListener('DOMContentLoaded', function() {
    console.log('Task 2: JavaScript loaded successfully!');
    
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Contact Form Validation
    initContactForm();
    
    // To-Do List Application
    initTodoApp();
    
    // Image Gallery
    initImageGallery();
    
    // Smooth Scrolling for Navigation
    initSmoothScrolling();
});

// Mobile Navigation
function initMobileNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Contact Form Validation
function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('form-success');
    
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        // Validate form
        const isValid = validateForm();
        
        if (isValid) {
            // Show success message
            form.style.display = 'none';
            successMessage.classList.remove('hidden');
            
            // Reset form after 3 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                successMessage.classList.add('hidden');
            }, 3000);
            
            console.log('Form submitted successfully!');
        }
    });
    
    // Real-time validation
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => {
            if (input.classList.contains('error')) {
                validateField(input);
            }
        });
    });
}

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // Validate name
    if (!validateField(name)) isValid = false;
    
    // Validate email
    if (!validateField(email)) isValid = false;
    
    // Validate phone (optional but if provided, must be valid)
    if (phone.value && !validateField(phone)) isValid = false;
    
    // Validate subject
    if (!validateField(subject)) isValid = false;
    
    // Validate message
    if (!validateField(message)) isValid = false;
    
    return isValid;
}

function validateField(field) {
    const fieldName = field.name;
    const value = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            if (!value) {
                errorMessage = 'Name is required';
                isValid = false;
            } else if (value.length < 2) {
                errorMessage = 'Name must be at least 2 characters';
                isValid = false;
            }
            break;
            
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                errorMessage = 'Email is required';
                isValid = false;
            } else if (!emailRegex.test(value)) {
                errorMessage = 'Please enter a valid email address';
                isValid = false;
            }
            break;
            
        case 'phone':
            const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
            if (value && !phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
                errorMessage = 'Please enter a valid phone number';
                isValid = false;
            }
            break;
            
        case 'subject':
            if (!value) {
                errorMessage = 'Please select a subject';
                isValid = false;
            }
            break;
            
        case 'message':
            if (!value) {
                errorMessage = 'Message is required';
                isValid = false;
            } else if (value.length < 10) {
                errorMessage = 'Message must be at least 10 characters';
                isValid = false;
            }
            break;
    }
    
    // Update UI
    if (errorElement) {
        errorElement.textContent = errorMessage;
    }
    
    if (isValid) {
        field.classList.remove('error');
        field.style.borderColor = '#28a745';
    } else {
        field.classList.add('error');
        field.style.borderColor = '#e74c3c';
    }
    
    return isValid;
}

function clearErrors() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(element => {
        element.textContent = '';
    });
    
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.classList.remove('error');
        input.style.borderColor = '';
    });
}

// To-Do List Application
let todos = [];
let currentFilter = 'all';

function initTodoApp() {
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-todo-btn');
    const todoList = document.getElementById('todo-list');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');
    const clearAllBtn = document.getElementById('clear-all-btn');
    
    if (!todoInput || !addBtn || !todoList) return;
    
    // Add new todo
    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTodo();
        }
    });
    
    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            renderTodos();
        });
    });
    
    // Clear buttons
    if (clearCompletedBtn) {
        clearCompletedBtn.addEventListener('click', clearCompleted);
    }
    
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAll);
    }
    
    // Load todos from localStorage
    loadTodos();
    renderTodos();
}

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const text = todoInput.value.trim();
    
    if (!text) {
        alert('Please enter a task!');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.unshift(todo);
    todoInput.value = '';
    
    saveTodos();
    renderTodos();
    updateStats();
    
    console.log('Todo added:', todo);
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    
    saveTodos();
    renderTodos();
    updateStats();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    
    saveTodos();
    renderTodos();
    updateStats();
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    if (!todoList) return;
    
    let filteredTodos = todos;
    
    switch (currentFilter) {
        case 'pending':
            filteredTodos = todos.filter(todo => !todo.completed);
            break;
        case 'completed':
            filteredTodos = todos.filter(todo => todo.completed);
            break;
    }
    
    todoList.innerHTML = '';
    
    if (filteredTodos.length === 0) {
        todoList.innerHTML = '<li class="todo-item"><span class="todo-text">No tasks found</span></li>';
        return;
    }
    
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} 
                   onchange="toggleTodo(${todo.id})">
            <span class="todo-text">${todo.text}</span>
            <button class="todo-delete" onclick="deleteTodo(${todo.id})">Delete</button>
        `;
        
        todoList.appendChild(li);
    });
}

function updateStats() {
    const totalTasks = document.getElementById('total-tasks');
    const completedTasks = document.getElementById('completed-tasks');
    const pendingTasks = document.getElementById('pending-tasks');
    
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    const pending = total - completed;
    
    if (totalTasks) totalTasks.textContent = `Total: ${total}`;
    if (completedTasks) completedTasks.textContent = `Completed: ${completed}`;
    if (pendingTasks) pendingTasks.textContent = `Pending: ${pending}`;
}

function clearCompleted() {
    if (confirm('Are you sure you want to clear all completed tasks?')) {
        todos = todos.filter(todo => !todo.completed);
        saveTodos();
        renderTodos();
        updateStats();
    }
}

function clearAll() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        todos = [];
        saveTodos();
        renderTodos();
        updateStats();
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
    }
}

// Image Gallery
const sampleImages = [
    {
        id: 1,
        url: 'https://picsum.photos/300/200?random=1',
        title: 'Beautiful Landscape',
        description: 'A stunning view of mountains and valleys with vibrant colors.'
    },
    {
        id: 2,
        url: 'https://picsum.photos/300/200?random=2',
        title: 'Modern Architecture',
        description: 'Contemporary building design with clean lines and geometric shapes.'
    },
    {
        id: 3,
        url: 'https://picsum.photos/300/200?random=3',
        title: 'Abstract Art',
        description: 'Colorful abstract composition with flowing forms and patterns.'
    },
    {
        id: 4,
        url: 'https://picsum.photos/300/200?random=4',
        title: 'Technology',
        description: 'Modern technology and innovation in digital design.'
    },
    {
        id: 5,
        url: 'https://picsum.photos/300/200?random=5',
        title: 'Urban Life',
        description: 'Dynamic city life with bustling streets and modern infrastructure.'
    },
    {
        id: 6,
        url: 'https://picsum.photos/300/200?random=6',
        title: 'Creative Design',
        description: 'Innovative design concepts with bold colors and creative elements.'
    }
];

function initImageGallery() {
    const addImagesBtn = document.getElementById('add-image-btn');
    const clearGalleryBtn = document.getElementById('clear-gallery-btn');
    const galleryContainer = document.getElementById('image-gallery-container');
    const modal = document.getElementById('image-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    if (!addImagesBtn || !clearGalleryBtn || !galleryContainer) {
        console.error('Image gallery elements not found');
        return;
    }

    console.log('Image gallery initialized successfully');

    // Add sample images immediately on load
    addSampleImages();

    // Add sample images
    addImagesBtn.addEventListener('click', function() {
        addSampleImages();
        this.textContent = 'Add More Images';
    });

    // Clear gallery
    clearGalleryBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear the gallery?')) {
            galleryContainer.innerHTML = '';
            addImagesBtn.textContent = 'Add Sample Images';
        }
    });

    // Modal functionality
    if (closeModal && modal) {
        closeModal.addEventListener('click', () => {
            modal.classList.add('hidden');
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
            }
        });
    }
}

function addSampleImages() {
    const galleryContainer = document.getElementById('image-gallery-container');
    if (!galleryContainer) return;

    // Add random images from the sample array
    const imagesToAdd = sampleImages.sort(() => 0.5 - Math.random()).slice(0, 3);

    imagesToAdd.forEach(imageData => {
        createGalleryItem(imageData);
    });
}

function createGalleryItem(imageData) {
    const galleryContainer = document.getElementById('image-gallery-container');
    if (!galleryContainer) return;

    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.innerHTML = `
        <img src="${imageData.url}" alt="${imageData.title}" loading="lazy">
        <div class="gallery-item-info">
            <h4>${imageData.title}</h4>
            <p>${imageData.description}</p>
        </div>
    `;

    // Add click event to open modal
    galleryItem.addEventListener('click', () => {
        openImageModal(imageData);
    });

    galleryContainer.appendChild(galleryItem);

    // Add animation
    setTimeout(() => {
        galleryItem.style.opacity = '0';
        galleryItem.style.transform = 'translateY(20px)';
        galleryItem.style.transition = 'all 0.5s ease';

        requestAnimationFrame(() => {
            galleryItem.style.opacity = '1';
            galleryItem.style.transform = 'translateY(0)';
        });
    }, 10);
}

function openImageModal(imageData) {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');

    if (modal && modalImage && modalTitle && modalDescription) {
        // Add loading state
        modalImage.style.opacity = '0';
        modalTitle.textContent = 'Loading...';
        modalDescription.textContent = '';

        // Show modal first
        modal.classList.remove('hidden');

        // Load image
        modalImage.onload = function() {
            modalImage.style.opacity = '1';
            modalTitle.textContent = imageData.title;
            modalDescription.textContent = imageData.description;
        };

        modalImage.onerror = function() {
            modalTitle.textContent = 'Error loading image';
            modalDescription.textContent = 'The image could not be loaded. Please try again.';
            modalImage.style.opacity = '1';
        };

        modalImage.src = imageData.url;
        modalImage.alt = imageData.title;
    }
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                console.log(`Scrolled to section: ${targetId}`);
            }
        });
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize animations on scroll
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initScrollAnimations, 100);
});

console.log('Task 2: All JavaScript functionality initialized successfully!');
