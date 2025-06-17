# 📚 Dokumentasi PMI Lampung - Kisah Sukses

<div align="center">

**🩸 Platform Digital untuk berbagi cerita inspiratif PMI Lampung**

[![Setup Guide](https://img.shields.io/badge/📖_Setup-Guide-blue?style=for-the-badge)](./SETUP_PMI_LAMPUNG.md)
[![Quick Start](https://img.shields.io/badge/⚡_Quick-Start-green?style=for-the-badge)](./QUICK_SETUP.md)
[![OAuth Fix](https://img.shields.io/badge/🔐_OAuth-Fix-orange?style=for-the-badge)](./oauth/OAUTH_TROUBLESHOOTING.md)
[![Storage Fix](https://img.shields.io/badge/💾_Storage-Fix-red?style=for-the-badge)](./storage/URGENT_STORAGE_FIX.md)

</div>

---

## 🎯 Dokumentasi Berdasarkan Kebutuhan

### 🚀 **Baru Pertama Kali Setup?**

| 📖 Panduan | ⏱️ Waktu | 📝 Deskripsi |
|------------|-----------|---------------|
| [⚡ Quick Setup](./QUICK_SETUP.md) | **10 menit** | Setup cepat untuk development |
| [📊 Setup PMI Lampung](./SETUP_PMI_LAMPUNG.md) | **30 menit** | Panduan lengkap dengan penjelasan detail |

### 🚨 **Ada Error? Fix Sekarang!**

| ❌ Error Yang Dialami | ⚡ Solusi Cepat | 📋 Panduan |
|----------------------|-----------------|-------------|
| `Unsupported provider: provider is not enabled` | OAuth belum di-enable | [🔐 OAuth Troubleshooting](./oauth/OAUTH_TROUBLESHOOTING.md) |
| `403 - RLS policy violation` (upload gambar) | Storage belum dikonfigurasi | [🚨 URGENT Storage Fix](./storage/URGENT_STORAGE_FIX.md) |
| `Your project's URL and Key are required` | Environment variables salah | [⚙️ Environment Setup](./SETUP_PMI_LAMPUNG.md#environment-variables) |
| Database connection error | Supabase credentials salah | [🗄️ Database Setup](./SETUP_PMI_LAMPUNG.md#setup-supabase-database) |

---

## 📚 Dokumentasi Lengkap

### 🔧 **Setup & Installation**

#### 📖 **Panduan Utama**
- [📊 Setup PMI Lampung](./SETUP_PMI_LAMPUNG.md) - **Panduan lengkap 30 menit**
  - ✅ Requirements dan persiapan
  - ✅ Setup Supabase Database step-by-step
  - ✅ Konfigurasi OAuth Google & GitHub
  - ✅ Environment variables
  - ✅ Testing dan troubleshooting
  - ✅ Post-setup checklist

- [⚡ Quick Setup](./QUICK_SETUP.md) - **Setup cepat 10 menit**
  - ✅ Langkah-langkah singkat
  - ✅ Checklist setup
  - ✅ Quick troubleshooting

#### 🛠️ **Advanced Setup**
- [🔄 Development Workflow](./SETUP_PMI_LAMPUNG.md#development-workflow) - Best practices development
- [🚀 Production Deployment](./oauth/OAUTH_SETUP.md#production-deployment) - Deploy ke production

### 🔐 **Authentication & OAuth**

#### 🔑 **Setup OAuth**
- [🔐 OAuth Setup Guide](./oauth/OAUTH_SETUP.md) - **Setup Google & GitHub OAuth lengkap**
  - ✅ Google Cloud Console setup
  - ✅ GitHub OAuth App setup
  - ✅ Supabase configuration
  - ✅ Testing dan debugging
  - ✅ Production deployment
  - ✅ Security configuration

#### 🚨 **Troubleshooting OAuth**
- [🚨 OAuth Troubleshooting](./oauth/OAUTH_TROUBLESHOOTING.md) - **Solusi masalah OAuth**
  - ❌ "Unsupported provider" error → ✅ Solusi
  - ❌ "redirect_uri_mismatch" → ✅ Solusi
  - ❌ "invalid_client" → ✅ Solusi
  - ❌ Login tidak persist → ✅ Solusi

### 💾 **Storage & Upload**

#### 🚨 **Fix Upload Error (Priority)**
- [⚡ URGENT: Storage Fix](./storage/URGENT_STORAGE_FIX.md) - **Fix error 403 dalam 5 menit**
  - 🔥 STEP 1: Cek status storage
  - 🔥 STEP 2: Buat storage buckets
  - 🔥 STEP 3: Setup RLS policies
  - 🔥 STEP 4: Test upload
  - ✅ Success checklist

#### 📝 **Setup Storage Detail**
- [📋 Storage Setup Step-by-Step](./storage/STORAGE_SETUP_STEP_BY_STEP.md) - Panduan detail storage
- [📁 Storage Upload Fix](./storage/STORAGE_UPLOAD_FIX.md) - Troubleshooting upload issues

### 🗄️ **Database & SQL**

#### 📊 **Database Setup**
- [🗄️ Database Setup Script](./database/setup_database.sql) - Script SQL setup database lengkap

#### 🔧 **SQL Scripts Utility**
- [🛠️ Debug Storage Complete](./storage/debug_storage_complete.sql) - Fix semua masalah storage
- [🔄 Storage Fix Alternative](./storage/storage_fix_alternative.sql) - Alternative storage fix
- [🔒 Fix Storage RLS](./storage/fix_storage_rls.sql) - Fix RLS policies
- [✅ Check Storage Status](./storage/check_storage_status.sql) - Cek status storage

---

## 🎯 **Quick Links untuk Common Issues**

### ❌ Error: "Unsupported provider: provider is not enabled"
**→ Solusi**: [OAuth Troubleshooting](./oauth/OAUTH_TROUBLESHOOTING.md)

### ❌ Error: Upload gambar 403 - RLS policy violation
**→ Solusi**: [Urgent Storage Fix](./storage/URGENT_STORAGE_FIX.md)

### ❌ Error: "Your project's URL and Key are required"
**→ Solusi**: Check file `.env` dan restart server

### ❌ Error: Next.js image hostname not configured
**→ Solusi**: Update `next.config.js` dengan hostname Supabase

---

## 📱 **Development Workflow**

### 1. **First Time Setup**
```bash
# Clone & install
git clone [repository]
cd kisah-sukses
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan konfigurasi Supabase

# Setup database
# Jalankan docs/database/setup_database.sql di Supabase SQL Editor

# Setup storage
# Ikuti docs/storage/URGENT_STORAGE_FIX.md

# Setup OAuth
# Ikuti docs/oauth/OAUTH_SETUP.md

# Start development
npm run dev
```

### 2. **Common Development Tasks**
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check linting
npm run lint

# Format code
npm run format
```

### 3. **Troubleshooting**
```bash
# Clear cache dan restart
rm -rf .next node_modules
npm install
npm run dev

# Check environment variables
cat .env | grep SUPABASE

# Test authentication
# Browser console: supabase.auth.getSession().then(console.log)
```

---

## 🏗️ **Project Structure**

```
kisah-sukses/
├── 📁 docs/                    # 📚 Documentation
│   ├── oauth/                  # 🔐 OAuth documentation
│   ├── storage/                # 💾 Storage documentation
│   ├── database/               # 🗄️ Database scripts
│   └── README.md               # 📋 This file
├── 📁 app/                     # 🚀 Next.js App Router
├── 📁 components/              # 🧩 React Components
├── 📁 config/                  # ⚙️ Configuration files
├── 📁 public/                  # 🖼️ Static assets
├── 📁 utils/                   # 🔧 Utility functions
├── .env.example                # 🔐 Environment template
├── next.config.js              # ⚙️ Next.js configuration
└── README.md                   # 📖 Main documentation
```

---

## 🤝 **Contributing**

Untuk berkontribusi pada proyek PMI Lampung:

1. **Fork repository**
2. **Create feature branch**: `git checkout -b feature/nama-fitur`
3. **Commit changes**: `git commit -m 'Add: fitur baru'`
4. **Push to branch**: `git push origin feature/nama-fitur`
5. **Create Pull Request**

---

## 📞 **Support**

### 🚨 **Emergency Support**
- 📧 **Email**: tech@pmilampung.org
- 📱 **WhatsApp**: +62-xxx-xxxx-xxxx
- 🌐 **Website**: [www.pmilampung.org](https://www.pmilampung.org)

### 💬 **Community**
- 🐙 **GitHub Issues**: Report bugs dan feature requests
- 💼 **LinkedIn**: PMI Lampung Official
- 📘 **Facebook**: PMI Lampung

---

---

## 📋 **Documentation Navigation**

### 🎯 **Start Here (First Time)**
1. [⚡ Quick Setup](./QUICK_SETUP.md) ← **Mulai di sini jika buru-buru**
2. [📊 Setup PMI Lampung](./SETUP_PMI_LAMPUNG.md) ← **Panduan lengkap**

### 🚨 **Fix Common Errors**
| Issue | Fix |
|-------|-----|
| OAuth login error | [🔐 OAuth Troubleshooting](./oauth/OAUTH_TROUBLESHOOTING.md) |
| Upload gambar error 403 | [🚨 Storage Fix](./storage/URGENT_STORAGE_FIX.md) |
| Database connection error | Check `.env` file |

### 📚 **Complete Guides**
- **Authentication**: [OAuth Setup Guide](./oauth/OAUTH_SETUP.md)
- **Storage**: [Storage Setup Guide](./storage/STORAGE_SETUP_STEP_BY_STEP.md)
- **Database**: [Database Setup](./database/setup_database.sql)

---

**📝 Last Updated**: June 2025 | **🔄 Version**: 2.0 | **👥 Maintainer**: PMI Lampung Tech Team

<div align="center">

**🩸 Made with ❤️ for PMI Lampung**

[🏠 Back to Main README](../README.md) | [📧 Contact Support](mailto:tech@pmilampung.org) | [🌐 PMI Lampung](https://www.pmilampung.org)

</div>

