# 🎨 Visual Guide - Unified Detail Page

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     🏔️ HERO SECTION                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                                                       │   │
│  │              LARGE MAIN IMAGE                        │   │
│  │           (with zoom on hover)                       │   │
│  │                                                       │   │
│  │  ┌──────────────────────────────────────────┐       │   │
│  │  │  🎫 [TOUR/PACKAGE Badge]                │       │   │
│  │  │                                          │       │   │
│  │  │  Gradient Title Text (3.5rem)           │       │   │
│  │  │                                          │       │   │
│  │  │  📅 3D/2N  📍 Location  ⭐ Featured     │       │   │
│  │  └──────────────────────────────────────────┘       │   │
│  │                                        📸 3 / 8      │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                             │
│  [Thumbnail Gallery: ▶️ img1 | img2 | img3 | img4 | ... ]  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                     MAIN CONTENT AREA                        │
│  ┌─────────────────────────┐    ┌──────────────────────┐   │
│  │   LEFT: Content         │    │  RIGHT: Booking      │   │
│  │                         │    │  (Sticky Sidebar)    │   │
│  ├─────────────────────────┤    ├──────────────────────┤   │
│  │ 📝 About Section        │    │ Book This [Type]     │   │
│  │                         │    │ ⭐ Trusted by 1000+  │   │
│  │ Full description text   │    │                      │   │
│  │ with highlights box     │    │ PRICING OPTIONS:     │   │
│  │                         │    │ [Solo] [Couple] [Dlx]│   │
│  ├─────────────────────────┤    │                      │   │
│  │ 📑 TABBED CONTENT       │    │ BOOKING FORM:        │   │
│  │                         │    │ [Name Input]         │   │
│  │ ┌─┬─┬─┬─┐              │    │ [Email Input]        │   │
│  │ │1│2│3│4│ <-- Tabs     │    │ [Phone Input]        │   │
│  │ └─┴─┴─┴─┘              │    │ [Travelers Select]   │   │
│  │                         │    │ [Message Textarea]   │   │
│  │ Tab 1: Highlights       │    │                      │   │
│  │ ✓ Item 1  ✓ Item 2     │    │ Total: PKR 45,000   │   │
│  │ ✓ Item 3  ✓ Item 4     │    │                      │   │
│  │                         │    │ [Confirm Booking 🚀] │   │
│  │ Tab 2: Itinerary        │    │                      │   │
│  │ [Day 1]  Description    │    │ Need Help?           │   │
│  │ [Day 2]  Description    │    │ 📞 0317-777-3141    │   │
│  │                         │    │ Available 24/7       │   │
│  │ Tab 3: Inclusions       │    │                      │   │
│  │ ✓ Included | ✗ Excluded│    └──────────────────────┘   │
│  │                         │                               │
│  │ Tab 4: Details (pkg)    │                               │
│  │ [Accommodation] [Trans] │                               │
│  └─────────────────────────┘                               │
└─────────────────────────────────────────────────────────────┘
```

## Color Coding

```
🟧 Primary Actions (Orange Gradient)
  - Booking button
  - Day badges
  - Active states
  - Hover effects

🟦 Secondary Elements (Blue Gradient)
  - Info boxes
  - Detail cards
  - Tab indicators

⬜ Background Layers
  - White cards
  - Soft gradient backdrop
  - Glassmorphic overlays
```

## Interaction States

### Gallery
```
[Thumbnail 1] [Thumbnail 2] [Thumbnail 3]
     ↑              ↑             ↑
  Active       Hover         Default
  (Orange)    (Lifted)      (Normal)
```

### Pricing Options (Tours Only)
```
┌────────────┐  ┌────────────┐  ┌────────────┐
│ 👤 Solo    │  │ 👥 Couple  │  │ ⭐ Deluxe  │
│ PKR 14,000 │  │ PKR 31,500 │  │ PKR 45,000 │
└────────────┘  └────────────┘  └────────────┘
     ↑               ↑               ↑
  Selected       Hover          Default
  (Orange bg)   (Lifted)      (Gray bg)
```

### Day Cards (Itinerary)
```
┌────┐  ┌──────────────────────────────────────┐
│Day │  │ Day Title                            │
│ 1  │  │ Description text here...             │
└────┘  │ → Activity 1                         │
Orange  │ → Activity 2                         │
Badge   │ 🍽️ Meals: Breakfast, Dinner         │
        └──────────────────────────────────────┘
```

## Responsive Behavior

### Desktop (>1200px)
```
┌─────────────────────────────────────────────┐
│               2-Column Layout                │
│  ┌───────────────┐    ┌───────────────┐    │
│  │   Content     │    │   Sidebar     │    │
│  │   (70%)       │    │   (Sticky)    │    │
│  └───────────────┘    └───────────────┘    │
└─────────────────────────────────────────────┘
```

### Tablet (768px-1199px)
```
┌─────────────────────────────────────┐
│       Single Column Layout           │
│  ┌─────────────────────────────┐    │
│  │        Content               │    │
│  └─────────────────────────────┘    │
│  ┌─────────────────────────────┐    │
│  │        Sidebar               │    │
│  │     (Not Sticky)             │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

### Mobile (<768px)
```
┌─────────────────────┐
│   Mobile Layout     │
│  ┌───────────────┐  │
│  │  Hero Section │  │
│  │  (Height:400) │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │   Thumbnails  │  │
│  │  (Scrollable) │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │    Content    │  │
│  │ (Padding:1.5) │  │
│  └───────────────┘  │
│  ┌───────────────┐  │
│  │    Sidebar    │  │
│  └───────────────┘  │
└─────────────────────┘
```

## Animation Timeline

### Page Load
```
0ms    → Spinner appears
        ↓
500ms  → Data fetched
        ↓
600ms  → Hero image fades in
        ↓
700ms  → Title card slides up
        ↓
800ms  → Thumbnails appear
        ↓
900ms  → Content cards fade in
        ↓
1000ms → Sidebar appears
```

### Card Hover
```
Hover  → Transform: translateY(-12px)
       → Box-shadow increases
       → Image scales to 1.15x
       → Duration: 0.5s cubic-bezier
```

### Tab Switch
```
Click  → Active tab color changes
       → Ink bar slides to new position
       → Old content fades out
       → New content fades in
       → Duration: 0.3s ease
```

## Component Hierarchy

```
UnifiedDetailPage
│
├── Hero Section
│   ├── Main Image Wrapper
│   │   ├── Main Image
│   │   ├── Overlay
│   │   └── Hero Content
│   │       └── Title Card
│   │           ├── Badge (Ribbon)
│   │           ├── Title
│   │           └── Quick Stats
│   └── Image Counter
│
├── Thumbnail Gallery
│   └── Thumbnail × N
│
└── Container
    └── Content Layout
        │
        ├── Main Content
        │   ├── Description Card
        │   └── Tabs Card
        │       ├── Tab 1: Highlights/Destinations
        │       ├── Tab 2: Itinerary
        │       ├── Tab 3: Inclusions/Exclusions
        │       └── Tab 4: Details (conditional)
        │
        └── Sidebar (Sticky)
            └── Booking Card
                ├── Header (with trust badge)
                ├── Pricing Options/Price Tag
                ├── Booking Form
                │   ├── Name Input
                │   ├── Email Input
                │   ├── Phone Input
                │   ├── Travelers Select
                │   └── Message Textarea
                ├── Total Section
                ├── Booking Button
                └── Support Section
```

## CSS Architecture

```
detailPage.module.css (900+ lines)
│
├── Layout
│   ├── .detailPage (page wrapper)
│   ├── .container (max-width 1600px)
│   └── .contentLayout (grid: 1fr 450px)
│
├── Hero
│   ├── .heroSection
│   ├── .mainImageWrapper
│   ├── .heroOverlay
│   └── .thumbnailGallery
│
├── Cards
│   ├── .card (base card styles)
│   ├── .dayCard (itinerary)
│   ├── .destCard (destinations)
│   └── .detailBox (info boxes)
│
├── Booking
│   ├── .bookingCard
│   ├── .pricingOptions
│   ├── .bookingForm
│   └── .supportSection
│
└── Responsive
    ├── @media (max-width: 1200px)
    ├── @media (max-width: 768px)
    └── @media (max-width: 480px)
```

## Key Class Names

### Structure
- `.detailPage` - Root wrapper
- `.container` - Max-width container
- `.contentLayout` - 2-column grid
- `.mainContent` - Left column
- `.sidebar` - Right column (sticky)

### Cards
- `.card` - White card with shadow
- `.bookingCard` - Booking sidebar card
- `.dayCard` - Itinerary day item
- `.destCard` - Destination card

### Interactive
- `.priceOption` - Pricing selector button
- `.activeOption` - Selected price option
- `.thumbnail` - Gallery thumbnail
- `.activeThumbnail` - Selected thumbnail
- `.bookBtn` - Main booking button

### Content
- `.mainTitle` - Hero title
- `.cardTitle` - Card section title
- `.description` - Body text
- `.highlight` - Highlighted info box

## Usage Examples

### Accessing a Tour
```
URL: /details/tour/neelum-valley-3-days
Type: tour
Slug: neelum-valley-3-days
Data Source: http://localhost:5000/tours
```

### Accessing a Package
```
URL: /details/package/north-pakistan-explorer
Type: package
Slug: north-pakistan-explorer
Data Source: http://localhost:5000/packages
```

### Linking to Detail Page
```typescript
// From any component
router.push(`/details/tour/${tourSlug}`);
router.push(`/details/package/${packageSlug}`);
```

---

## 🎉 Result

A **beautiful, unified, professional detail page** that seamlessly handles both tours and packages with:
- ✨ Stunning visual design
- 🎯 Intuitive user experience
- 📱 Perfect responsiveness
- 🚀 Smooth animations
- 💼 Professional appearance
- 🔧 Easy to maintain

**Ready to impress users!** 🌟

