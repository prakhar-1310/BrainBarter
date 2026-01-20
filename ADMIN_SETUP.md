# 🔐 Admin Setup Instructions

## Setting Your Admin Email

To make yourself an admin, update these files with your email:

### 1. Backend - `.env` file
```env
# Admin Email (auto-assign admin role)
ADMIN_EMAIL=your_actual_email@example.com
```

### 2. Frontend - `src/context/AuthContext.jsx`
Line 63, change:
```javascript
const adminEmail = 'your_actual_email@example.com';
```

### 3. Frontend - `src/pages/RoleSelection.jsx`
Line 10, change:
```javascript
const adminEmail = 'your_actual_email@example.com';
```

## How It Works

1. **Auto Admin Login**: When you login with the admin email:
   - Backend automatically assigns `admin` role
   - Frontend recognizes you as admin
   - Role selection screen skips (auto-selects admin)
   - Redirects to `/admin-dashboard`

2. **Manual Role Selection**: Other users see 3 options:
   - 🎓 Student
   - 🎥 Creator
   - 🛡️ Admin (they can select it too if needed)

## After Setup

1. Stop backend server (Ctrl+C)
2. Update `ADMIN_EMAIL` in `backend/.env`
3. Restart backend: `node src/server.js`
4. Update email in both frontend files
5. Refresh browser
6. Login with your email → You're admin! ✨

## Testing

1. **As Admin**: Login with your configured email → Auto-redirected to admin dashboard
2. **As Creator**: Login with different email → Choose "Creator" role
3. **As Student**: Login with different email → Choose "Student" role
