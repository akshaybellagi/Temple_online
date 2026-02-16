# Mobile Responsive Testing Checklist

## Quick Visual Test Guide

### 📱 Home Page
- [ ] Hero slider displays correctly on mobile
- [ ] Hero text is readable (not too small/large)
- [ ] Hero CTA button is touch-friendly
- [ ] Stats cards stack vertically on mobile
- [ ] Service buttons are properly sized and spaced
- [ ] Project buttons display in single column
- [ ] Audio buttons are touch-friendly
- [ ] Info buttons stack on mobile
- [ ] Testimonials display one per row
- [ ] All icons scale appropriately

### 📖 About Page
- [ ] Hero section height is appropriate
- [ ] Content grid stacks on mobile
- [ ] Stats display in single column
- [ ] Mission cards stack vertically
- [ ] Timeline is readable on mobile
- [ ] CTA buttons stack and are full-width
- [ ] All text is readable without zooming

### 🛏️ Booking Pages
- [ ] Service selection cards display properly
- [ ] Calendar grid shows 2 columns on mobile
- [ ] Calendar dates are touch-friendly
- [ ] Room cards stack vertically
- [ ] Room type cards display properly
- [ ] Booking form fields are full-width
- [ ] Form inputs don't cause zoom on iOS
- [ ] Seva cards display in single column
- [ ] Confirmation screen is mobile-friendly

### 📰 Services Pages (News, Live Status, History, etc.)
- [ ] News cards stack in single column
- [ ] History tabs are full-width
- [ ] Tables scroll horizontally with touch
- [ ] Schedule items stack properly
- [ ] Panchanga details display in single column
- [ ] Donation list items stack vertically
- [ ] Donation inputs are full-width
- [ ] All forms are touch-friendly

### 📞 Contact Page
- [ ] Contact info and form stack vertically
- [ ] Form inputs are properly sized
- [ ] Map placeholder displays correctly
- [ ] All text is readable
- [ ] Form submission button is touch-friendly

### 🖼️ Gallery Page
- [ ] Gallery filters stack on mobile
- [ ] Gallery grid shows 1 column on small screens
- [ ] Images load and display properly
- [ ] Filter buttons are touch-friendly

### 🔐 Admin Pages
- [ ] Login form is centered and readable
- [ ] Dashboard stats stack vertically
- [ ] Management cards display properly
- [ ] Tables scroll horizontally
- [ ] Modal dialogs fit on screen
- [ ] All admin forms are mobile-friendly
- [ ] Action buttons are properly sized

## 🎯 Key Things to Check

### Navigation
- [ ] Hamburger menu appears on mobile
- [ ] Menu slides in from right
- [ ] Menu overlay works correctly
- [ ] Close button functions properly
- [ ] All menu items are touch-friendly

### Forms
- [ ] All inputs have 16px font size (prevents iOS zoom)
- [ ] Input fields are at least 48px tall
- [ ] Labels are clearly visible
- [ ] Submit buttons are full-width on mobile
- [ ] Form validation messages display properly

### Buttons & Links
- [ ] All buttons are at least 44-48px tall
- [ ] Buttons have proper spacing
- [ ] Touch feedback is visible
- [ ] No buttons are too close together

### Typography
- [ ] All text is readable without zooming
- [ ] Headings scale appropriately
- [ ] Line height is comfortable for reading
- [ ] No text overflow issues

### Images & Icons
- [ ] Icons scale properly
- [ ] Images don't overflow containers
- [ ] Image placeholders display correctly
- [ ] Icons maintain aspect ratio

### Layout
- [ ] No horizontal scrolling
- [ ] Proper spacing between elements
- [ ] Cards and containers fit within viewport
- [ ] Grids adapt to screen size

### Performance
- [ ] Smooth scrolling
- [ ] No lag when opening menus
- [ ] Transitions are smooth
- [ ] Touch interactions are responsive

## 📐 Test at These Widths

- [ ] 320px (iPhone SE, older devices)
- [ ] 360px (Samsung Galaxy S20)
- [ ] 375px (iPhone 12/13 Mini)
- [ ] 390px (iPhone 12/13/14)
- [ ] 414px (iPhone Plus models)
- [ ] 430px (iPhone 14 Pro Max)
- [ ] 768px (iPad Portrait)
- [ ] 1024px (iPad Landscape)

## 🔄 Test Orientations

- [ ] Portrait mode (primary)
- [ ] Landscape mode (secondary)
- [ ] Rotation transitions smoothly

## 🌐 Test Browsers

- [ ] Safari (iOS)
- [ ] Chrome (Android)
- [ ] Firefox (Android)
- [ ] Samsung Internet
- [ ] Chrome (iOS)

## ✅ Final Checks

- [ ] All pages load without errors
- [ ] No console errors in browser
- [ ] All interactive elements work
- [ ] Forms can be submitted
- [ ] Navigation works throughout site
- [ ] Back button functions correctly
- [ ] External links open properly

---

## 🐛 Common Issues to Watch For

1. **Text too small**: Minimum 14px for body text
2. **Buttons too small**: Minimum 44-48px touch targets
3. **Horizontal scroll**: Check for overflow-x issues
4. **Input zoom on iOS**: Ensure 16px font size on inputs
5. **Menu not closing**: Check overlay click handler
6. **Images not loading**: Verify image paths
7. **Tables not scrolling**: Check overflow-x: auto
8. **Forms not submitting**: Check button types
9. **Spacing issues**: Verify padding/margin on mobile
10. **Z-index conflicts**: Check modal and menu layers

---

**Pro Tip**: Use Chrome DevTools Device Mode to test multiple screen sizes quickly!
