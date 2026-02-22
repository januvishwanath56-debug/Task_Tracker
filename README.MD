# 🎯 Taskly - Premium Task Tracker

A beautiful, feature-rich task tracking application with streak tracking, analytics, and calendar visualization. Built with vanilla JavaScript, HTML, and CSS.

![Taskly Banner](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🔐 **Secure Authentication**
- User registration and login system
- Strong password validation (min 6 chars, uppercase, number required)
- Cookie-based "Remember Me" functionality
- Password visibility toggle

### 📊 **Task Management**
- Create and track daily tasks
- Mark tasks as complete once per day
- Delete tasks with confirmation
- View completion history with detailed stats

### 🔥 **Streak Tracking**
- Current streak counter for each task
- Best streak ever recorded
- Visual streak indicators
- Automatic streak calculation

### 📅 **Calendar Heatmap**
- 28-day activity visualization
- Color-coded days:
  - 🟢 **Green** = Tasks completed
  - 🔴 **Red** = No activity
- Hover to see completion count

### 📈 **Analytics Dashboard**
- Total tasks overview
- Daily completion percentage
- Active streaks count
- Best streak across all tasks
- Weekly completion rate (7-day view)

### 🎨 **Premium UI/UX**
- Dark theme with gold accents
- Glass morphism effects
- Smooth animations and transitions
- Grain texture overlay
- Responsive design (mobile, tablet, desktop)
- Beautiful typography (Playfair Display + Inter)

### 💾 **Data Persistence**
- LocalStorage for user data
- SessionStorage for login sessions
- Cookie storage for username
- No backend required

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or dependencies required!

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/taskly.git
   cd taskly
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # On Mac:
   open index.html
   
   # On Windows:
   start index.html
   
   # On Linux:
   xdg-open index.html
   ```

3. **Or use a local server (optional)**
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx http-server
   ```

## 📁 Project Structure

```
taskly/
├── index.html         # Main HTML structure
├── styles.css         # All styling and animations
├── app.js             # Application logic and functionality
├── README.md          # Project documentation
├── LICENSE            # MIT License
└── .gitignore         # Git ignore rules
```

## 🎮 How to Use

### 1. **Create an Account**
- Click "Create Account" on the login page
- Choose a username (min 3 characters)
- Create a strong password (min 6 chars, 1 uppercase, 1 number)
- Confirm your password

### 2. **Add Tasks**
- Enter a task name in the "Create New Task" section
- Click "+ Add Task"
- Each task is unique (no duplicates allowed)

### 3. **Complete Tasks**
- Click "Mark Complete" on any task
- Can only complete once per day
- Streak automatically updates

### 4. **Track Progress**
- View stats on the dashboard
- Switch to "Calendar View" to see 28-day heatmap
- Check "Analytics" for detailed insights
- Click 📊 on any task to view its history

### 5. **Manage Tasks**
- Click 🗑️ to delete a task (with confirmation)
- View completion history and streaks
- Monitor weekly completion rates

## 🛠️ Technologies Used

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with:
  - CSS Grid & Flexbox
  - CSS Variables for theming
  - Animations & Transitions
  - Media Queries for responsiveness
- **JavaScript (ES6+)** - Vanilla JS with:
  - LocalStorage API
  - SessionStorage API
  - Cookie Management
  - DOM Manipulation
  - Event Handling

## 🎨 Customization

### Change Theme Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #0A0E27;      /* Main background */
    --accent: #FFD700;       /* Gold accent color */
    --success: #00D9A3;      /* Success/complete color */
    --danger: #FF5757;       /* Delete/danger color */
}
```

### Modify Fonts

Update font imports in `index.html`:

```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

### Adjust Streak Logic

Edit streak calculation in `app.js`:

```javascript
function updateStreak(habit) {
    // Modify streak calculation logic here
}
```

## 🔒 Privacy & Security

- **No Backend**: All data stored locally in your browser
- **No Tracking**: No analytics or tracking scripts
- **No Data Collection**: Your data never leaves your device
- **Secure**: Passwords stored in localStorage (for demo purposes only)

> ⚠️ **Note**: This is a client-side demo app. For production use, implement proper backend authentication and encryption.

## 📱 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 90+     | ✅ Full |
| Firefox | 88+     | ✅ Full |
| Safari  | 14+     | ✅ Full |
| Edge    | 90+     | ✅ Full |

## 🐛 Known Issues

- LocalStorage has a 5-10MB limit per domain
- Data is cleared if browser cache is cleared
- No sync between devices (local storage only)

## 🚀 Future Enhancements

- [ ] Export/Import data functionality
- [ ] Multiple task categories/tags
- [ ] Dark/Light theme toggle
- [ ] Task priority levels
- [ ] Notifications and reminders
- [ ] Weekly/Monthly reports
- [ ] Progress charts and graphs
- [ ] Backend integration option
- [ ] Mobile app version

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Write clear commit messages
- Comment your code thoroughly
- Follow existing code style
- Test on multiple browsers
- Update README if needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@Janu_V](https://github.com/januvishwanath56-debug)
- LinkedIn: [@Janu_V](https://linkedin.com/in/januvishwanath)
- Email: januvishwanath56@gmail.com


## 🙏 Acknowledgments

- Fonts: [Google Fonts](https://fonts.google.com/)
- Icons: Emoji (native)
- Inspiration: Habit tracking apps like Habitica, Streaks, Loop



⭐ **If you found this project helpful, please give it a star!** ⭐

