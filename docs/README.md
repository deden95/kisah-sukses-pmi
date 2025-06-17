# 📚 Dokumentasi PMI Lampung - Kisah Sukses

> **Platform Digital untuk berbagi cerita inspiratif PMI Lampung**

## 📋 Daftar Dokumentasi

### 🚀 **Setup & Installation**
- [📖 Setup PMI Lampung](./SETUP_PMI_LAMPUNG.md) - Panduan setup lengkap
- [⚡ Quick Setup](./QUICK_SETUP.md) - Setup cepat untuk development

### 🔐 **Authentication (OAuth)**
- [🔑 OAuth Setup Guide](./oauth/OAUTH_SETUP.md) - Setup Google & GitHub OAuth
- [🚨 OAuth Troubleshooting](./oauth/OAUTH_TROUBLESHOOTING.md) - Solusi masalah OAuth

### 💾 **Storage & Upload**
- [📁 Storage Upload Fix](./storage/STORAGE_UPLOAD_FIX.md) - Fix masalah upload gambar
- [⚡ Urgent Storage Fix](./storage/URGENT_STORAGE_FIX.md) - Solusi cepat storage
- [📝 Storage Setup Step-by-Step](./storage/STORAGE_SETUP_STEP_BY_STEP.md) - Panduan detail

### 🗄️ **Database**
- [📊 Database Setup](./database/setup_database.sql) - Script setup database

### 🔧 **SQL Scripts**

#### Storage Scripts:
- [`debug_storage_complete.sql`](./storage/debug_storage_complete.sql) - Debug & fix storage issues
- [`storage_fix_alternative.sql`](./storage/storage_fix_alternative.sql) - Alternative storage fix
- [`fix_storage_rls.sql`](./storage/fix_storage_rls.sql) - Fix RLS policies
- [`check_storage_status.sql`](./storage/check_storage_status.sql) - Check storage status

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

**📝 Last Updated**: June 2025  
**🔄 Version**: 2.0  
**👥 Maintainer**: PMI Lampung Tech Team

