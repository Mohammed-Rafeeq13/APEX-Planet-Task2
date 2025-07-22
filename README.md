# Task 2: Intermediate HTML, CSS, and JavaScript

## Objective
Enhance HTML and CSS skills, and learn JavaScript for DOM manipulation.

## Timeline
9 Days

## Steps Completed

### 1. Create a Contact Form Using HTML and CSS ✅
- **Objective**: Build forms with various input fields
- **Actions**: Created a form with input types like text, email, and submit buttons; styled it with CSS
- **Features Implemented**:
  - Complete contact form with multiple input types (text, email, tel, select, textarea)
  - Custom checkbox styling with CSS
  - Responsive form layout
  - Modern form styling with focus states and transitions
  - Form validation indicators (error states)
  - Success message display

### 2. Add JavaScript Form Validation ✅
- **Objective**: Use JavaScript to ensure form data is valid
- **Actions**: Implemented form validation that checks for required fields and correct email format
- **Features Implemented**:
  - Real-time form validation on blur and input events
  - Email format validation using regex
  - Phone number validation (optional field)
  - Required field validation
  - Minimum length validation for text fields
  - Visual feedback with error messages and border colors
  - Form submission handling with success feedback
  - Form reset functionality

### 3. Create a Responsive Layout Using Flexbox and CSS Grid ✅
- **Objective**: Build layouts that adapt to different screen sizes
- **Actions**: Structured a webpage using Flexbox for navigation and CSS Grid for content areas, and applied media queries for mobile responsiveness
- **Features Implemented**:
  - **Flexbox Layout**: Responsive navigation bar and feature cards
  - **CSS Grid Layout**: Complex grid layout with header, sidebar, main, aside, and footer areas
  - **Responsive Design**: Mobile-first approach with media queries
  - **Mobile Navigation**: Hamburger menu for mobile devices
  - **Adaptive Grid**: Grid layout changes to single column on mobile
  - **Flexible Cards**: Feature cards stack vertically on smaller screens

### 4. Develop a Dynamic To-Do List or Image Gallery Using JavaScript ✅
- **Objective**: Learn DOM manipulation with JavaScript
- **Actions**: Created a to-do list or image gallery where users can add and remove tasks or images dynamically
- **Features Implemented**:
  
  **Dynamic To-Do List**:
  - Add new tasks with Enter key or button click
  - Mark tasks as complete/incomplete with checkboxes
  - Delete individual tasks
  - Filter tasks by status (All, Pending, Completed)
  - Task statistics display (total, completed, pending)
  - Local storage persistence
  - Clear completed tasks functionality
  - Clear all tasks functionality
  - Real-time task counter
  
  **Dynamic Image Gallery**:
  - Add sample images dynamically
  - Responsive grid layout for images
  - Image modal/lightbox functionality
  - Click to view full-size images
  - Image information display (title, description)
  - Clear gallery functionality
  - Smooth animations and transitions
  - Keyboard navigation (ESC to close modal)

## Files Structure
```
Task 2/
├── index.html          # Main HTML file with all sections
├── styles.css          # Comprehensive CSS with responsive design
├── script.js           # JavaScript with all interactive functionality
└── README.md           # This documentation file
```

## Key Features

### Contact Form
- **Validation Types**: Required fields, email format, phone format, minimum length
- **User Experience**: Real-time validation, visual feedback, success messages
- **Accessibility**: Proper labels, error messages, keyboard navigation

### Responsive Layout
- **Flexbox**: Navigation, feature cards, form layouts
- **CSS Grid**: Complex page layouts with named grid areas
- **Media Queries**: Breakpoints for tablet and mobile devices
- **Mobile Navigation**: Collapsible hamburger menu

### To-Do Application
- **CRUD Operations**: Create, Read, Update, Delete tasks
- **Data Persistence**: Local storage for task persistence
- **Filtering**: View all, pending, or completed tasks
- **Statistics**: Real-time task counters

### Image Gallery
- **Dynamic Content**: Add images programmatically
- **Modal Interface**: Full-screen image viewing
- **Responsive Grid**: Adaptive image layout
- **User Interaction**: Click events, keyboard shortcuts

## How to Run
1. Open `index.html` in a web browser
2. Navigate through different sections using the navigation menu
3. Test the contact form with various inputs to see validation
4. Use the to-do list to add, complete, and filter tasks
5. Add images to the gallery and click to view in modal
6. Test responsive design by resizing the browser window

## Technologies Used
- **HTML5**: Semantic elements, form inputs, accessibility features
- **CSS3**: Flexbox, Grid, animations, transitions, media queries
- **JavaScript ES6+**: DOM manipulation, event handling, local storage, arrow functions
- **Modern CSS**: Custom properties, backdrop-filter, box-shadow
- **Responsive Design**: Mobile-first approach, flexible layouts

## Browser Compatibility
- Works in all modern browsers (Chrome, Firefox, Safari, Edge)
- Responsive design tested on desktop, tablet, and mobile devices
- Uses modern CSS features with graceful degradation

## Learning Outcomes
- Advanced form handling and validation techniques
- Responsive design with Flexbox and CSS Grid
- DOM manipulation and event handling
- Local storage for data persistence
- Modern JavaScript practices and ES6+ features
- User experience design principles
- Mobile-first responsive design approach
