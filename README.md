# 🍳 Recipe Sharing Platform - Frontend

A modern, responsive recipe sharing web application where users can discover, create, and share their favorite recipes with a vibrant community of food enthusiasts.

![Recipe Sharing Platform](https://via.placeholder.com/1200x600/FF6B6B/FFFFFF?text=Recipe+Sharing+Platform)

---

## 📖 Project Description

The Recipe Sharing Platform is a full-stack web application that enables users to:

- **Discover** thousands of delicious recipes from around the world
- **Create & Share** your own culinary masterpieces
- **Search & Filter** recipes by ingredients, categories, and more
- **AI Cooking Assistant** - Get instant recipe suggestions based on available ingredients
- **Admin Dashboard** - Manage users, moderate content, and feature exceptional recipes

Built with modern web technologies, this platform offers a seamless user experience with beautiful UI, real-time interactions, and intelligent features powered by AI.

---

## ✨ Features

### 🔐 User Authentication
- Secure user registration and login with JWT authentication
- Password hashing with bcrypt for security
- Protected routes and role-based access control
- Persistent sessions with localStorage

### 🍽️ Recipe Management
- **Create Recipes** - Easy-to-use form with image upload support
- **Edit Recipes** - Update your recipes anytime
- **Delete Recipes** - Remove recipes you no longer want to share
- **My Recipes** - View all your created recipes in one place
- **Recipe Details** - Beautiful detailed view with ingredients and instructions

### 🔍 Search & Discovery
- **Smart Search** - Search by recipe name, ingredients, or description
- **Category Filter** - Browse by Breakfast, Lunch, Dinner, Dessert, and more
- **Featured Recipes** - Curated collection of top recipes
- **Responsive Grid** - Beautiful card-based layout

### 🤖 AI Cooking Assistant
- **Floating Chatbot** - Always accessible from any page
- **Ingredient-Based Suggestions** - Get recipe ideas based on what you have
- **Full Recipe Details** - Complete instructions for 7+ dishes
- **Generic Fallback** - Smart responses for any ingredient
- **Cooking Tips** - Get help with techniques, timing, and substitutions

### 👑 Admin Dashboard (Admin Only)
- **User Management** - View, delete, and manage user roles
- **Recipe Moderation** - Delete inappropriate content
- **Featured Recipes** - Mark exceptional recipes as featured
- **Platform Statistics** - View user counts, recipe stats, and activity
- **Role-Based Access** - USER, MODERATOR, ADMIN roles

### 📱 Responsive Design
- Mobile-first approach
- Beautiful gradients and animations
- Smooth transitions and hover effects
- Optimized for all screen sizes (mobile, tablet, desktop)

### 🎨 Beautiful UI/UX
- Tailwind CSS with custom components
- Gradient backgrounds and shadows
- Animated elements and loading states
- Intuitive navigation and user flow

---

## 🛠️ Tech Stack Used

### Core Framework:
- **React** (v18.2+) - UI library for building component-based interfaces
- **Vite** (v5.0+) - Next-generation frontend build tool (fast HMR)

### Routing & State Management:
- **React Router DOM** (v6.21+) - Client-side routing
- **Context API** - Global state management for authentication

### Styling:
- **Tailwind CSS** (v3.4+) - Utility-first CSS framework
- **PostCSS** & **Autoprefixer** - CSS processing

### HTTP Client:
- **Axios** (v1.6+) - Promise-based HTTP client for API calls

### Development Tools:
- **ESLint** - Code linting and quality
- **Vite Dev Server** - Hot module replacement (HMR)

---

## 📁 Project Structure
```
client/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   ├── auth/
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── AdminRoute.jsx
│   │   ├── recipes/
│   │   │   ├── RecipeCard.jsx
│   │   │   ├── RecipeList.jsx
│   │   │   ├── RecipeDetail.jsx
│   │   │   ├── RecipeForm.jsx
│   │   │   └── SearchBar.jsx
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── UserManagement.jsx
│   │   │   ├── RecipeModeration.jsx
│   │   │   └── StatsCard.jsx
│   │   ├── ai/
│   │   │   └── AIChatbot.jsx
│   │   └── common/
│   │       ├── LoadingSpinner.jsx
│   │       └── ErrorMessage.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── MyRecipes.jsx
│   │   ├── CreateRecipe.jsx
│   │   ├── EditRecipe.jsx
│   │   ├── RecipeDetailPage.jsx
│   │   └── AdminPage.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── services/
│   │   └── api.js
│   ├── utils/
│   │   └── helpers.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
└── README.md
```

---

## ⚙️ Installation Steps

### Prerequisites:
- Node.js (v18 or higher)
- npm or yarn
- Backend API running (see [Backend Repository](https://github.com/yourusername/recipe-backend))

### Step 1: Clone Repository
```bash
git clone https://github.com/yourusername/recipe-frontend.git
cd recipe-frontend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables

Create `.env` file in root directory:
```env
# Backend API URL
VITE_API_URL=http://localhost:5000

# Or use deployed backend
# VITE_API_URL=https://your-backend.onrender.com
```

**Note:** Make sure your backend server is running at the specified URL.

### Step 4: Run Development Server
```bash
npm run dev
```

Application will start at `http://localhost:5173`

### Step 5: Build for Production
```bash
npm run build
```

Production-ready files will be in `dist/` folder.

### Step 6: Preview Production Build
```bash
npm run preview
```

Preview build at `http://localhost:4173`

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `./` (or `client/` if monorepo)
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

3. **Add Environment Variables:**
   - Go to Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend.onrender.com`

4. **Deploy:**
   - Click "Deploy"
   - Wait for deployment (1-2 minutes)
   - Get deployment URL

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build project
npm run build

# Deploy
netlify deploy --prod
```

### Deploy to GitHub Pages

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "homepage": "https://yourusername.github.io/recipe-frontend"
}
```

3. Deploy:
```bash
npm run deploy
```

---

## 🔗 Deployment Link

**Live Application:** [https://recipe-sharing-platform.vercel.app](https://recipe-sharing-platform.vercel.app)

**Demo Video:** [Watch Demo](https://youtube.com/your-demo-video)

---

## 🔌 Backend API Link

**Backend Repository:** [https://github.com/yourusername/recipe-backend](https://github.com/yourusername/recipe-backend)

**API Base URL:** 
- Development: `http://localhost:5000/api`
- Production: `https://your-backend.onrender.com/api`

**API Documentation:** See backend README for full API endpoints and usage.

---

## 🔑 Login Credentials

### Demo User Account:
```
Email: demo@example.com
Password: demo123
Role: USER
```

### Demo Admin Account:
```
Email: admin@example.com
Password: admin123
Role: ADMIN
```

**Note:** These are demo credentials for testing purposes. In production, please create your own account.

### Creating Your Own Admin Account:

1. Register a new account through the app
2. Go to your Supabase dashboard
3. Navigate to: Table Editor → users
4. Find your user and change `role` to `ADMIN`
5. Refresh the app

---

## 📸 Screenshots

### 1. Homepage
![Homepage](https://via.placeholder.com/1200x600/FF6B6B/FFFFFF?text=Homepage+-+Recipe+Listing)

*Beautiful landing page with featured recipes and search functionality*

---

### 2. Login Page
![Login](https://via.placeholder.com/1200x600/4ECDC4/FFFFFF?text=Login+Page)

*Secure authentication with gradient background*

---

### 3. Register Page
![Register](https://via.placeholder.com/1200x600/95E1D3/FFFFFF?text=Register+Page)

*User-friendly registration form with validation*

---

### 4. My Recipes
![My Recipes](https://via.placeholder.com/1200x600/F38181/FFFFFF?text=My+Recipes)

*Personal dashboard showing all user-created recipes*

---

### 5. Recipe Detail Page
![Recipe Detail](https://via.placeholder.com/1200x600/AA96DA/FFFFFF?text=Recipe+Detail+Page)

*Comprehensive recipe view with ingredients and instructions*

---

### 6. Create Recipe
![Create Recipe](https://via.placeholder.com/1200x600/FCBAD3/FFFFFF?text=Create+Recipe+Form)

*Intuitive form for adding new recipes*

---

### 7. AI Chatbot
![AI Chatbot](https://via.placeholder.com/1200x600/A8E6CF/FFFFFF?text=AI+Cooking+Assistant)

*Floating chatbot providing recipe suggestions and cooking tips*

---

### 8. Admin Dashboard
![Admin Dashboard](https://via.placeholder.com/1200x600/FFD3B6/FFFFFF?text=Admin+Dashboard)

*Comprehensive admin panel with statistics and user management*

---

### 9. User Management (Admin)
![User Management](https://via.placeholder.com/1200x600/FFAAA5/FFFFFF?text=User+Management)

*Admin interface for managing users and roles*

---

### 10. Recipe Moderation (Admin)
![Recipe Moderation](https://via.placeholder.com/1200x600/FF8B94/FFFFFF?text=Recipe+Moderation)

*Admin tools for moderating and featuring recipes*

---

### 11. Mobile Responsive
![Mobile View](https://via.placeholder.com/400x800/C7CEEA/FFFFFF?text=Mobile+Responsive)

*Fully responsive design optimized for mobile devices*

---

## 🎯 Features Walkthrough

### User Flow:
```
1. Landing Page
   ↓
2. Register/Login
   ↓
3. Browse Recipes
   ↓
4. View Recipe Details
   ↓
5. Create Own Recipe
   ↓
6. Manage My Recipes
   ↓
7. Use AI Chatbot for Suggestions
```

### Admin Flow:
```
1. Login as Admin
   ↓
2. Access Admin Panel
   ↓
3. View Platform Statistics
   ↓
4. Manage Users (Change Roles/Delete)
   ↓
5. Moderate Recipes (Feature/Delete)
   ↓
6. Monitor Platform Activity
```

---

## 🧪 Testing

### Manual Testing Checklist:

**Authentication:**
- ✅ User can register
- ✅ User can login
- ✅ User can logout
- ✅ Protected routes redirect to login
- ✅ Token persists on page refresh

**Recipes:**
- ✅ User can view all recipes
- ✅ User can search recipes
- ✅ User can filter by category
- ✅ User can view recipe details
- ✅ User can create recipe
- ✅ User can edit own recipe
- ✅ User can delete own recipe

**AI Chatbot:**
- ✅ Chatbot opens on button click
- ✅ User can send messages
- ✅ Bot responds to greetings
- ✅ Bot suggests recipes for ingredients
- ✅ Bot provides full recipe details

**Admin:**
- ✅ Admin can access admin panel
- ✅ Admin can view statistics
- ✅ Admin can manage users
- ✅ Admin can change user roles
- ✅ Admin can delete users
- ✅ Admin can feature recipes
- ✅ Admin can delete any recipe
- ✅ Regular users cannot access admin panel

---

## 🔧 Configuration

### Tailwind CSS Custom Classes:

Located in `src/index.css`:
```css
@layer components {
  .btn-primary {
    @apply bg-red-600 hover:bg-red-700 text-white font-semibold 
           py-2.5 px-6 rounded-lg transition-all duration-200 
           shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50;
  }
  
  .btn-secondary {
    @apply bg-gray-200 hover:bg-gray-300 text-gray-800 
           font-semibold py-2.5 px-6 rounded-lg transition-all 
           duration-200 active:scale-95;
  }
  
  .input-field {
    @apply w-full px-4 py-2.5 border border-gray-300 rounded-lg 
           focus:ring-2 focus:ring-red-500 focus:border-transparent 
           outline-none transition-all duration-200;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-md hover:shadow-xl 
           transition-shadow duration-300 overflow-hidden;
  }
  
  .container-custom {
    @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
  }
}
```

---

## 📦 Dependencies

### Production Dependencies:
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.0",
  "axios": "^1.6.0"
}
```

### Development Dependencies:
```json
{
  "@vitejs/plugin-react": "^4.2.1",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32",
  "tailwindcss": "^3.4.0",
  "vite": "^5.0.8"
}
```

---

## 🐛 Troubleshooting

### Common Issues:

**1. API Connection Error:**
```
Error: Network Error
```
**Solution:** Check if backend is running and `VITE_API_URL` is correct in `.env`

---

**2. Blank Page After Build:**
```
White screen, no errors
```
**Solution:** Check browser console. Usually a routing issue. Ensure `BrowserRouter` is properly configured.

---

**3. Styles Not Loading:**
```
Tailwind classes not working
```
**Solution:** 
- Verify `tailwind.config.js` content paths
- Restart dev server (`npm run dev`)

---

**4. 404 on Refresh (Production):**
```
Page not found on direct URL access
```
**Solution:** Configure your hosting platform for SPA routing:

**Vercel:** Add `vercel.json`:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

**Netlify:** Add `_redirects` in `public/`:
```
/*    /index.html   200
```

---

## 🚀 Performance Optimization

- ✅ Code splitting with React.lazy (optional)
- ✅ Image optimization with WebP format
- ✅ Lazy loading for images
- ✅ Minified production builds
- ✅ Gzip compression on hosting
- ✅ CDN for static assets

---

## 🔒 Security Features

- ✅ JWT token authentication
- ✅ Protected routes
- ✅ XSS protection via React
- ✅ HTTPS in production
- ✅ Secure password handling (bcrypt on backend)
- ✅ CORS configuration

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- **GitHub:** [@yourusername](https://github.com/yourusername)
- **LinkedIn:** [Your Profile](https://linkedin.com/in/yourprofile)
- **Email:** your.email@example.com
- **Portfolio:** [yourportfolio.com](https://yourportfolio.com)

---

## 🙏 Acknowledgments

- **React** - UI Library
- **Tailwind CSS** - Styling Framework
- **Vite** - Build Tool
- **Supabase** - Backend Services
- **Vercel** - Hosting Platform
- **Google Gemini AI** - AI Integration
- **Icons** - Heroicons & Emoji

---

## 📚 Related Links

- [Backend Repository](https://github.com/yourusername/recipe-backend)
- [API Documentation](https://documenter.getpostman.com/your-collection)
- [Live Demo](https://recipe-sharing-platform.vercel.app)
- [Project Presentation](https://slides.com/your-presentation)

---

## 📈 Future Enhancements

- [ ] Social features (like, comment, share)
- [ ] Recipe ratings and reviews
- [ ] Bookmark/favorite recipes
- [ ] Shopping list generator
- [ ] Meal planning calendar
- [ ] Nutrition information
- [ ] Recipe scaling calculator
- [ ] Print-friendly recipe cards
- [ ] Social media integration
- [ ] Multi-language support
- [ ] Dark mode
- [ ] Progressive Web App (PWA)

---

## 📊 Project Stats

- **Total Lines of Code:** ~3,500
- **Components:** 20+
- **Pages:** 8
- **API Endpoints Used:** 15+
- **Development Time:** 2 weeks
- **Build Size:** ~200KB (gzipped)

---

## 🎓 Learning Outcomes

This project demonstrates proficiency in:

- ✅ React component architecture
- ✅ State management with Context API
- ✅ RESTful API integration
- ✅ JWT authentication flow
- ✅ Role-based authorization
- ✅ Responsive design with Tailwind CSS
- ✅ Form handling and validation
- ✅ Client-side routing
- ✅ Modern build tools (Vite)
- ✅ Production deployment

---

**Built with ❤️ and lots of ☕ for food lovers everywhere! 🍳**

---

**⭐ If you found this project helpful, please give it a star!**
