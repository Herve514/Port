document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Mobile Navigation
    // ======================
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if(window.innerWidth <= 768) {
                    navMenu.style.display = 'none';
                }
            }
        });
    });
    
    // ======================
    // Portfolio Filtering
    // ======================
    const filterButtons = document.querySelectorAll('.filter-buttons button');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            portfolioItems.forEach(item => {
                if(filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // ======================
    // Blog Functionality
    // ======================
    const blogForm = document.getElementById('blog-form');
    const postList = document.querySelector('.post-list');
    const newPostBtn = document.getElementById('new-post-btn');
    const postForm = document.querySelector('.post-form');
    
    if (blogForm && postList && newPostBtn && postForm) {
        // Toggle post form visibility
        newPostBtn.addEventListener('click', function() {
            postForm.style.display = postForm.style.display === 'none' ? 'block' : 'none';
        });
        
        // Handle form submission
        blogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const title = this.querySelector('input[type="text"]').value;
            const content = this.querySelector('textarea').value;
            const tags = this.querySelector('input[placeholder="Tags (comma separated)"]').value;
            const imageInput = this.querySelector('input[type="file"]');
            
            // Create new post element
            const postElement = document.createElement('div');
            postElement.className = 'post-item';
            postElement.innerHTML = `
                <div class="post-header">
                    <h4>${title}</h4>
                    <span class="post-date">${new Date().toLocaleDateString()}</span>
                </div>
                ${imageInput.files[0] ? `
                    <div class="post-image">
                        <img src="${URL.createObjectURL(imageInput.files[0])}" alt="${title}">
                    </div>
                ` : ''}
                <div class="post-content">
                    <p>${content}</p>
                </div>
                <div class="post-footer">
                    <div class="post-tags">
                        ${tags.split(',').map(tag => `<span class="tag">${tag.trim()}</span>`).join('')}
                    </div>
                    <div class="post-actions">
                        <button class="btn small edit-post">Edit</button>
                        <button class="btn small danger delete-post">Delete</button>
                    </div>
                </div>
            `;
            
            // Add to the beginning of post list
            postList.prepend(postElement);
            
            // Reset form and hide it
            this.reset();
            postForm.style.display = 'none';
            
            // Add event listeners to new post buttons
            addPostEventListeners(postElement);
        });
        
        // Function to add event listeners to post actions
        function addPostEventListeners(postElement) {
            postElement.querySelector('.edit-post').addEventListener('click', function() {
                // Get post data
                const postHeader = postElement.querySelector('.post-header h4');
                const postContent = postElement.querySelector('.post-content p');
                
                // Fill form with existing data
                blogForm.querySelector('input[type="text"]').value = postHeader.textContent;
                blogForm.querySelector('textarea').value = postContent.textContent;
                
                // Show form
                postForm.style.display = 'block';
                
                // Remove the post
                postElement.remove();
            });
            
            postElement.querySelector('.delete-post').addEventListener('click', function() {
                if (confirm('Are you sure you want to delete this post?')) {
                    postElement.remove();
                }
            });
        }
    }
    
    // ======================
    // Sticky Header
    // ======================
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if(window.scrollY > 100) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // ======================
    // Animations on Scroll
    // ======================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.about-stats .stat-item, .skill-category, .portfolio-item, .blog-container > div');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if(elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.about-stats .stat-item, .skill-category, .portfolio-item, .blog-container > div').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
});