# TubeIntelligence - AI-Powered YouTube Analytics Platform

> **TubeIntelligence** is an ***AI-powered analytics platform*** that helps YouTube creators make smarter content decisions. We analyze your videos and provide actionable insights on titles, thumbnails, CTR predictions, copyright protection, and multi-platform strategies to grow your channel.

![Platform](https://img.shields.io/badge/Platform-YouTube-red)
![AI](https://img.shields.io/badge/AI-Gemini%202.5-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## Live Demo

**[Try TubeIntelligence Live](#)** *(Coming Soon)*

<!-- Replace the # above with your deployed URL when ready -->

## Screenshots

<table>
  <tr>
    <td colspan="2">
      <h3>Landing Page</h3>
      <img width="1068" height="650" alt="image" src="https://github.com/user-attachments/assets/8156b88c-e8b6-4366-848f-6b90e5f65d09" />
      <p align="center"><em>Clean, modern interface showcasing the platform's core value proposition</em></p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <h3>Analysis Configuration</h3>
      <img width="1064" height="680" alt="image" src="https://github.com/user-attachments/assets/0a9454e5-7436-43c3-8de3-49ad03e7023d" />
      <p align="center"><em>Select AI-powered intelligence modules for your channel audit</em></p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <h3>AI-Powered Report Analysis</h3>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <img width="1024" height="613" alt="image" src="https://github.com/user-attachments/assets/531cd894-ac06-410c-9f0c-9f482f5208a5" />
      <p align="center"><em>Semantic Title Engine - AI-generated title alternatives with CTR predictions</em></p>
    </td>
    <td width="50%">
      <img width="1024" height="588" alt="image" src="https://github.com/user-attachments/assets/768afa93-dee2-41a7-adf3-ef12aeb5abc3" />
      <p align="center"><em>Trend Intelligence - 48-hour early trend detection and content ideas</em></p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
      <img width="1024" height="614" alt="image" src="https://github.com/user-attachments/assets/2a13e1c6-dbc5-4b20-89e1-7f875c0c01d3" />
      <p align="center"><em>Predictive CTR Analysis - Current CTR score and industry comparison</em></p>
    </td>
  </tr>
  <tr>
    <td colspan="2">
     <img width="1024" height="543" alt="image" src="https://github.com/user-attachments/assets/c5455d8f-b976-456e-9329-eba60bb6de92" />
      <p align="center"><em>Predictive CTR Analysis - Optimization recommendations and psychological triggers</em></p>
    </td>
  </tr>
</table>



##  Overview

**TubeIntelligence** uses **Google's Gemini 2.5 AI** to analyze YouTube channels and provide actionable growth strategies. Simply enter a channel name, select the AI services you need, and receive a comprehensive report with:

- **AI-generated title alternatives** that predict higher click-through rates
- **Copyright risk detection** before you upload
- **Trending topic predictions** 24-72 hours ahead of the curve
- **Multi-platform content strategies** optimized for YouTube, X/Twitter, and LinkedIn
- **Detailed email reports** delivered straight to your inbox

The platform combines YouTube Data API for channel metrics, Gemini AI for intelligent analysis, and a modern React frontend to deliver insights that would take hours of manual research—in just minutes.

## Features

### Core Services

1. **Semantic Title Engine**
   - AI-generated title alternatives with CTR potential ratings
   - Psychological analysis of title effectiveness
   - Channel-specific title strategy recommendations

2. **Predictive CTR Analysis**
   - Estimate click-through rates before publishing
   - Thumbnail and title psychology insights
   - Industry benchmark comparisons

3. **Multi-Platform Mastery**
   - Cross-platform content optimization (YouTube, X/Twitter, LinkedIn)
   - Platform-specific algorithm insights
   - Content adaptation strategies

4. **Copyright Protection**
   - Pre-upload Content ID scanning simulation
   - Risk assessment for copyrighted material
   - Safe alternative recommendations

5. **Fair Use Analysis**
   - Transformative content evaluation
   - Legal safety guidance
   - Fair use factor breakdown

6. **Trend Intelligence**
   - 48-hour early trend detection
   - Niche-specific trending topics
   - Actionable content ideas

### Authentication & User Management

- Email/password authentication with JWT
- Google OAuth integration
- User profiles with avatar support (Cloudinary)
- Secure session management

### Dashboard Features

- Real-time job status tracking
- Historical report access
- Detailed analytics visualization
- PDF report export
- **Email delivery** - Get your complete analysis report sent directly to your inbox

## Tech Stack

### Backend
- **Framework:** FastAPI (Python)
- **Database:** MongoDB (Motor async driver)
- **AI:** Google Gemini 2.5 Flash
- **Authentication:** JWT, OAuth 2.0 (Authlib)
- **APIs:** YouTube Data API v3
- **Email:** Resend (for report delivery)
- **Storage:** Cloudinary (avatar uploads)
- **Security:** bcrypt password hashing

### Frontend
- **Framework:** React 19
- **Build Tool:** Vite
- **Routing:** React Router v7
- **Styling:** TailwindCSS
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **HTTP Client:** Axios
- **State Management:** Context API

## 📁 Project Structure

```
yt-recommender/
├── backend/
│   ├── app/
│   │   ├── core/          # Configuration & worker
│   │   ├── db/            # Database connection
│   │   ├── models/        # Data models
│   │   ├── routes/        # API endpoints
│   │   ├── schemas/       # Request/response schemas
│   │   ├── services/      # Business logic (AI, YouTube, Email, Cloudinary)
│   │   ├── utils/         # Auth & session helpers
│   │   └── main.py        # Application entry point
│   ├── requirements.txt
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/    # UI components (audit, layout, ui)
    │   ├── context/       # State management
    │   ├── pages/         # Application pages
    │   ├── services/      # API client
    │   └── main.jsx       # React entry point
    ├── package.json
    └── .env
```

## Getting Started

### Prerequisites

- **Python** 3.10+
- **Node.js** 18+
- **MongoDB** (local or Atlas)
- **API Keys:**
  - Google Gemini API
  - YouTube Data API v3
  - Resend API (for email delivery)
  - Cloudinary account
  - Google OAuth credentials

### Backend Setup

1. **Clone and navigate to backend**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate  # Windows
   source .venv/bin/activate  # macOS/Linux
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create `.env` file in `backend/` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017  # for local
   DATABASE_NAME=yt_recommender
   JWT_SECRET_KEY=your-secret-key-here
   JWT_ALGORITHM=HS256
   ACCESS_TOKEN_EXPIRE_MINUTES=10080
   
   YOUTUBE_API_KEY=your-youtube-api-key
   GEMINI_API_KEY=your-gemini-api-key
   RESEND_API_KEY=your-resend-api-key
   
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   
   ENVIRONMENT=development
   ```

5. **Run the server**
   ```bash
   uvicorn app.main:app --reload
   ```

   Server will start at `http://localhost:****`
   - API Docs: `http://localhost:****/docs`

### Frontend Setup

1. **Navigate to frontend**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env` file in `frontend/` directory:
   ```env
   VITE_BACKEND_URL= your-backend-url
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Frontend will start at `your-frontend-url`

## Usage

1. **Register/Login**
   - Create an account or use Google OAuth
   - Access your personalized dashboard

2. **Submit Analysis Request**
   - Enter YouTube channel name (e.g., `@ApnaCollegeOfficial`)
   - Select desired AI services
   - Submit for analysis

3. **View Results**
   - Track job status in real-time
   - Access detailed reports with AI insights
   - Export reports as PDF

4. **Manage Profile**
   - Update profile information
   - Upload custom avatar
   - View analysis history

## API Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user
- `GET /auth/google` - Google OAuth
- `PUT /auth/profile` - Update profile

### Jobs
- `POST /submit` - Submit analysis job
- `GET /job/{job_id}` - Get job status

### Database
- `GET /api/db-test` - Test database connection

## Security Features

- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- CORS protection
- Environment-based security settings
- OAuth 2.0 integration
- Input validation with Pydantic

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- **Google Gemini AI** for powerful language models
- **YouTube Data API** for channel and video data
- **Cloudinary** for media management
- **FastAPI** for the excellent web framework
- **React** and **Vite** for modern frontend development

## Contact

For questions or support, please open an issue on GitHub.

---

**Built for the next generation of YouTube Creators**
