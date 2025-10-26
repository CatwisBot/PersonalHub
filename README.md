# 📱 Personal Hub - Your Personal Productivity & Finance Companion

> **Kelola Keuangan & Produktivitas dalam Satu Platform yang Powerful**  
> Aplikasi all-in-one untuk mencatat pengeluaran, pemasukan, tugas, dan hutang dengan dashboard analytics yang real-time.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Status](https://img.shields.io/badge/Status-Active-brightgreen.svg)
![Version](https://img.shields.io/badge/Version-1.0.0-blue.svg)

---

## ✨ Features

### 💰 **Manajemen Keuangan**
- 📊 Dashboard keuangan real-time dengan chart analytics
- 💵 Catat pengeluaran & pemasukan dengan kategori otomatis
- 📈 Laporan bulanan dengan breakdown by kategori
- 💾 History transaksi lengkap dengan filter & search

### ✅ **Task Management**
- 📋 Daftar tugas dengan priority levels (Normal, Penting, Mendesak)
- 📅 Deadline tracking & auto-notification
- ✨ Mark complete/incomplete tracking
- 🎯 Progress visualization

### 💳 **Hutang Tracking**
- 📝 Catat semua hutang dengan due dates
- 🔔 Reminder jatuh tempo
- ✅ Mark as paid tracking
- 📊 Total hutang overview

### 👥 **Multi-User Authentication**
- 🔐 Secure auth dengan Supabase (Email/Password)
- 👤 Personal profile management
- 🔄 Session management
- 🚪 Auto logout & device switching

### 📱 **Cross-Platform**
- 🌐 Web app (Next.js)
- 📱 Android app (.apk via Capacitor)
- 💻 Responsive design (Mobile, Tablet, Desktop)
- ⚡ Offline-ready dengan PWA support

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework dengan App Router & Turbopack
- **React 19** - UI library terbaru
- **TypeScript 5** - Type-safe development
- **Tailwind CSS 4** - Utility-first CSS styling
- **Lucide React** - Beautiful icons

### Backend
- **Supabase** - PostgreSQL database + Authentication
- **Row Level Security (RLS)** - Data privacy per-user
- **Realtime subscriptions** - Live data updates

### Deployment & Mobile
- **Vercel** - Web hosting & CDN
- **Capacitor** - Cross-platform mobile (iOS/Android)
- **PWA** - Progressive Web App capability

### Development
- **Turbopack** - Next-gen bundler (5x faster)
- **ESLint** - Code quality
- **Git** - Version control

---

## 🚀 Quick Start

### Prerequisites
```bash
- Node.js 18+ atau baru
- npm/yarn/pnpm
- Supabase account (free tier available)
```

### 1. Clone & Install
```bash
git clone https://github.com/CatwisBot/PersonalHub.git
cd personalhub
npm install
```

### 2. Setup Environment Variables
```bash
# Copy dari template
cp .env.example .env.local

# Edit .env.local dengan Supabase credentials:
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) 🎉

### 4. First Time Setup
- Daftar akun baru
- Setup database (automatic via Supabase trigger)
- Mulai catat transaksi & tugas!

---

## 📂 Project Structure

```
personalhub/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                  # Home page with splash screen
│   ├── auth/                     # Authentication pages
│   ├── Tambah/                   # Add transaction form
│   ├── Laporan/                  # Reports & analytics
│   └── layout.tsx                # Root layout with providers
├── components/
│   ├── shared/                   # Reusable components
│   │   ├── _Navbar/              # Navigation bar
│   │   ├── _Footer/              # Footer
│   │   ├── Home/                 # Home page components
│   │   └── Laporan/              # Report components
│   └── ui/                       # UI primitives
├── contexts/                     # React Context (global state)
│   └── AppContext.tsx            # Auth, navbar, splash state
├── lib/
│   ├── api.ts                    # Database queries
│   ├── auth.ts                   # Authentication functions
│   └── supabase.ts               # Supabase client config
├── public/                       # Static assets
├── capacitor.config.ts           # Mobile app config
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind config
└── tsconfig.json                 # TypeScript config
```

---

## 📖 Documentation

Baca dokumentasi lengkap untuk setiap deployment method:

| Topik | File | Deskripsi |
|-------|------|-----------|
| 🌐 **Web Deploy** | [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy ke Vercel step-by-step |
| 🔧 **Setup Auth** | [SETUP_AUTH.md](./SETUP_AUTH.md) | Konfigurasi Supabase & auth |
| 📱 **Mobile Build** | [ANDROID_BUILD.md](./ANDROID_BUILD.md) | Build APK untuk Android |
| 🚀 **Quick Mobile** | [APK_QUICK_START.md](./APK_QUICK_START.md) | Quick start build APK |
| 🐛 **Troubleshooting** | [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) | Solve common issues |

---

## 🎯 How to Use

### 1. **Home Dashboard**
- Lihat ringkasan pengeluaran, tugas, & hutang
- Quick access ke setiap fitur
- Personalized greeting dengan nama user

### 2. **Catat Transaksi**
- Menu "Catat Sekarang" untuk tambah pengeluaran/pemasukan
- Auto-categorized transactions
- Real-time update di dashboard

### 3. **Laporan & Analytics**
- Tab "Laporan" untuk detail reports
- Switch antara Keuangan, Tugas, Hutang
- Interactive charts & statistics

### 4. **Kelola Tugas**
- Buat tugas dengan priority level
- Set deadline & reminder
- Mark complete untuk tracking

### 5. **Track Hutang**
- Catat semua hutang dengan nominal & due date
- Mark as paid ketika sudah lunas
- Monitor total hutang terutang

---

## 🔐 Security & Privacy

✅ **Row Level Security (RLS)** - Data Anda hanya bisa diakses oleh Anda  
✅ **Password Hashing** - Password ter-encrypt secara aman  
✅ **JWT Tokens** - Secure session management  
✅ **No Third-Party Tracking** - Privacy-first approach  
✅ **HTTPS Only** - Semua komunikasi ter-encrypt  

---

## 📱 Deployment Options

### 🌐 Web App
```bash
# Deploy ke Vercel (recommended)
npm run build
vercel deploy --prod

# Atau ikuti: DEPLOYMENT.md
```

### 📦 Android APK
```bash
# Build APK
npm run android:build

# Buka Android Studio & build signed APK
# Ikuti: ANDROID_BUILD.md untuk detail

# Atau quick start: APK_QUICK_START.md
```

### 🍎 iOS App
```bash
# Coming soon! Cukup replace @capacitor/android dengan @capacitor/ios
# Proses sama dengan Android setup
```

### 🌐 Progressive Web App (PWA)
```bash
# Sudah built-in! User bisa "Add to Home Screen"
# dari Chrome/Edge untuk install seperti app native
```

---

## 🔄 Development Workflow

### Running Locally
```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Run production build
npm run lint         # Check code quality
npm run export       # Static export untuk APK/PWA
```

### Building for Production
```bash
# Web (Vercel)
npm run build

# Mobile (Android)
npm run android:build

# Static export (PWA)
npm run export
```

---

## 📊 Database Schema

### Key Tables
- **users** - Auth users (from Supabase Auth)
- **profiles** - User profile data (nama, email)
- **pengeluaran** - Expense records
- **pemasukan** - Income records
- **tugas** - Tasks with priority & deadline
- **hutang** - Debt tracking
- **budget_bulanan** - Monthly budget limits

Semua table punya `user_id` FK + RLS policies untuk data isolation.

---

## 🐛 Troubleshooting

### Common Issues

| Error | Solution |
|-------|----------|
| Failed to fetch | Cek NEXT_PUBLIC_SUPABASE_URL di .env.local |
| Email not confirmed | Check email inbox untuk confirmation link |
| Build failed | Run `npm install` & `npm run build` ulang |
| APK won't install | Download Android 7+ atau resolve keystore issues |

Baca [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) untuk detail lebih lengkap.

---

## 🤝 Contributing

Kami welcome kontribusi! Cara contribute:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 📝 Roadmap

- [ ] 🍎 iOS app support
- [ ] 🔔 Push notifications
- [ ] 📊 Advanced analytics & ML insights
- [ ] 💾 Data export (CSV/PDF)
- [ ] 🌙 Dark mode toggle
- [ ] 📱 Mobile app improvements
- [ ] 🔄 Real-time sync
- [ ] 📈 Budget forecasting

---

## 📞 Support & Contact

- 📧 Email: [Hubungi Developer]
- 💬 Issues: [GitHub Issues](https://github.com/CatwisBot/PersonalHub/issues)
- 📖 Docs: Lihat folder root untuk documentation lengkap

---

## 📄 License

Proyek ini dilisensikan di bawah MIT License - lihat [LICENSE](./LICENSE) file untuk detail.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - Amazing React framework
- [Supabase](https://supabase.com) - Open source Firebase alternative
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [Capacitor](https://capacitorjs.com) - Cross-platform mobile SDK
- [Lucide](https://lucide.dev) - Beautiful icon library

---

## 🚀 Let's Get Started!

**Ready to boost your productivity?**

```bash
git clone https://github.com/CatwisBot/PersonalHub.git
cd personalhub
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) dan mulai track keuangan & produktivitas Anda! 🎉

---

**Built with ❤️ by Catwis Dev**
