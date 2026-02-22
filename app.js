// ========================================
// GLOBAL VARIABLES - Used throughout the app
// ========================================
let currentUser = null;           // Stores the logged-in username
let habitToDelete = null;          // Temporarily stores task ID to be deleted
let currentView = 'habits';        // Tracks which view is active (habits/calendar/analytics)

// ========================================
// INITIALIZATION - Runs when page loads
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    checkSession();           // Check if user is already logged in
    loadRememberedUser();     // Load saved username from cookie
});

// ========================================
// PASSWORD VISIBILITY TOGGLE
// Purpose: Show/hide password in input fields
// ========================================
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.nextElementSibling;

    // Toggle between password and text type
    if (input.type === 'password') {
        input.type = 'text';      // Show password
        button.textContent = '🙈'; // Change icon to closed eyes
    } else {
        input.type = 'password';  // Hide password
        button.textContent = '👁️'; // Change icon to open eyes
    }
}

// ========================================
// COOKIE MANAGEMENT
// Purpose: Store and retrieve data in browser cookies
// ========================================

// Save a cookie with name, value, and expiration days
function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Retrieve a cookie value by name
function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

// Delete a cookie
function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Load username from cookie and pre-fill login form
function loadRememberedUser() {
    const rememberedUser = getCookie('rememberedUser');
    if (rememberedUser) {
        document.getElementById('login-username').value = rememberedUser;
    }
}

// ========================================
// AUTHENTICATION FUNCTIONS
// ========================================

// Show the registration form, hide login form
function showRegister() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('register-form').style.display = 'block';
}

// Show the login form, hide registration form
function showLogin() {
    document.getElementById('register-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

// Validate password strength
// Returns: { valid: true/false, message: error message }
function validatePassword(password) {
    // Check minimum length
    if (password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters long' };
    }
    // Check for uppercase letter
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    // Check for number
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
}

// Register a new user account
function register() {
    // Get form values
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;

    // Validate all fields are filled
    if (!username || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Validate username length
    if (username.length < 3) {
        showNotification('Username must be at least 3 characters long', 'error');
        return;
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
        showNotification(passwordValidation.message, 'error');
        return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    // Check if username already exists
    if (users[username]) {
        showNotification('Username already exists', 'error');
        return;
    }

    // Create new user object
    users[username] = {
        password: password,
        habits: [],  // Empty array for tasks
        createdAt: new Date().toISOString()
    };

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Show success message
    showNotification('Account created successfully! Please sign in.', 'success');

    // Switch to login form
    showLogin();

    // Clear form fields
    document.getElementById('register-username').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm-password').value = '';
}

// Login existing user
function login() {
    // Get form values
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    // Validate fields are filled
    if (!username || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '{}');

    // Check if user exists
    if (!users[username]) {
        showNotification('User not found', 'error');
        return;
    }

    // Check if password is correct
    if (users[username].password !== password) {
        showNotification('Incorrect password', 'error');
        return;
    }

    // Save username in cookie for 30 days (remember me functionality)
    setCookie('rememberedUser', username, 30);

    // Set current user globally
    currentUser = username;

    // Save to session storage (temporary, cleared when browser closes
    sessionStorage.setItem('currentUser', username);

    // Clear form fields
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';

    // Show welcome message
    showNotification('Welcome back, ' + username + '! 🎉', 'success');

    // Show the dashboard
    showDashboard();
}

// Logout current user
function logout() {
    currentUser = null;
    sessionStorage.removeItem('currentUser');
    // Note: We don't delete the cookie so username is remembered for next login

    // Hide dashboard, show auth section
    document.getElementById('dashboard-section').style.display = 'none';
    document.getElementById('auth-section').style.display = 'block';

    showNotification('Logged out successfully', 'info');
}

// Check if user is already logged in (from session storage)
function checkSession() {
    const savedUser = sessionStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = savedUser;
        showDashboard();
    }
}

// Display the dashboard and load user data
function showDashboard() {
    // Hide auth section, show dashboard
    document.getElementById('auth-section').style.display = 'none';
    document.getElementById('dashboard-section').style.display = 'block';

    // Set user avatar (first letter of username)
    const initial = currentUser.charAt(0).toUpperCase();
    document.getElementById('user-avatar').textContent = initial;

    // Set username
    document.getElementById('user-name').textContent = currentUser;

    // Load all user data
    loadHabits();
    updateStats();
    generateCalendar();
}

// ========================================
// NOTIFICATION SYSTEM
// Purpose: Show temporary popup messages to user
// ========================================
function showNotification(message, type = 'info') {
    // Remove any existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';

    // Set colors based on type (success/error/info)
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 20px 32px;
        background: ${type === 'success' ? '#00D9A3' : type === 'error' ? '#FF5757' : '#FFD700'};
        color: ${type === 'success' || type === 'error' ? 'white' : '#0A0E27'};
        border-radius: 12px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
        text-align: center;
        min-width: 300px;
    `;
    notification.textContent = message;

    // Add to page
    document.body.appendChild(notification);

    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========================================
// DATA MANAGEMENT FUNCTIONS
// Purpose: Get and save user data from localStorage
// ========================================

// Get current user's data from localStorage

function getUserData() {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    return users[currentUser] || { habits: [] };
}

// Save current user's data to localStorage
function saveUserData(userData) {
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    users[currentUser] = userData;
    localStorage.setItem('users', JSON.stringify(users));
}

// Generate unique ID for new task
function generateHabitId() {
    return 'habit_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Format date string to human-readable format
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ========================================
// TASK MANAGEMENT FUNCTIONS
// ========================================

// Add a new task
function addHabit() {
    const habitName = document.getElementById('new-habit-name').value.trim();

    // Validate task name is not empty
    if (!habitName) {
        showNotification('Please enter a task name', 'error');
        return;
    }

    const userData = getUserData();

    // Check for duplicate task name (case-insensitive)
    const existingHabit = userData.habits.find(h => h.name.toLowerCase() === habitName.toLowerCase());
    if (existingHabit) {
        showNotification('A task with this name already exists', 'error');
        return;
    }

    // Create new task object
    const newHabit = {
        id: generateHabitId(),
        name: habitName,
        createdAt: getTodayDate(),
        streak: 0,        // Current streak
        bestStreak: 0,    // Highest streak ever
        history: []       // Array of completion dates
    };

    // Add to user's tasks
    userData.habits.push(newHabit);
    saveUserData(userData);

    // Clear input field
    document.getElementById('new-habit-name').value = '';

    // Show success message
    showNotification('Task created successfully!', 'success');

    // Refresh displays
    loadHabits();
    updateStats();
    generateCalendar();
}

// Load and display all tasks
function loadHabits() {
    const userData = getUserData();
    const habitsContainer = document.getElementById('habits-container');
    const emptyState = document.getElementById('empty-state');

    // Show empty state if no tasks
    if (userData.habits.length === 0) {
        habitsContainer.innerHTML = '';
        emptyState.style.display = 'block';
    } else {
        // Hide empty state
        emptyState.style.display = 'none';

        // Generate HTML for each task card
        habitsContainer.innerHTML = userData.habits.map(habit => createHabitCard(habit)).join('');
    }
}

// Create HTML for a single task card
function createHabitCard(habit) {
    const today = getTodayDate();
    const completedToday = habit.history.includes(today);
    const buttonText = completedToday ? '✓ Completed' : 'Mark Complete';
    const buttonDisabled = completedToday ? 'disabled' : '';

    // Calculate completion rate for last 7 days
    const last7Days = getLast7Days();
    const completedLast7 = last7Days.filter(date => habit.history.includes(date)).length;
    const completionRate = (completedLast7 / 7) * 100;

    // Return HTML template
    return `
        <div class="habit-card" style="animation-delay: ${Math.random() * 0.2}s;">
            <div class="habit-header">
                <div>
                    <div class="habit-name">${escapeHtml(habit.name)}</div>
                    <div class="habit-created">Started ${formatDate(habit.createdAt)}</div>
                </div>
                <div class="habit-delete" onclick="showDeleteConfirmation('${habit.id}')">
                    🗑️
                </div>
            </div>
            
            <div class="habit-streak">
                <div class="streak-icon">🔥</div>
                <div class="streak-info">
                    <div class="streak-number">${habit.streak}</div>
                    <div class="streak-label">Day Streak</div>
                </div>
            </div>
            
            <div class="habit-progress">
                <div class="habit-progress-bar" style="width: ${completionRate}%"></div>
            </div>
            <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 16px;">
                ${completedLast7} of 7 days completed this week
            </div>
            
            <div class="habit-actions">
                <button class="btn-complete" onclick="completeHabit('${habit.id}')" ${buttonDisabled}>
                    ${buttonText}
                </button>
                <button class="btn-history" onclick="showHistory('${habit.id}')">
                    📊
                </button>
            </div>
        </div>
    `;
}

// Escape HTML to prevent injection attacks
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Get array of last 7 dates
function getLast7Days() {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        dates.push(`${year}-${month}-${day}`);
    }
    return dates;
}

// Mark a task as completed for today
function completeHabit(habitId) {
    const userData = getUserData();
    const habit = userData.habits.find(h => h.id === habitId);

    if (!habit) return;

    const today = getTodayDate();

    // Check if already completed today
    if (habit.history.includes(today)) {
        return;
    }

    // Add today to history
    habit.history.push(today);

    // Update streak count
    updateStreak(habit);

    // Save changes
    saveUserData(userData);

    // Show success message
    showNotification('Great job! Task completed! 🎉', 'success');

    // Refresh displays
    loadHabits();
    updateStats();
    generateCalendar();
}

// Update task's streak count
function updateStreak(habit) {
    const today = getTodayDate();
    const yesterday = getYesterdayDate();

    // Sort history newest to oldest
    const sortedHistory = habit.history.sort((a, b) => new Date(b) - new Date(a));

    // If first completion, streak is 1
    if (sortedHistory.length === 1) {
        habit.streak = 1;
    }
    // If completed yesterday, increment streak
    else if (sortedHistory.includes(yesterday)) {
        habit.streak++;
    }
    // If missed yesterday, reset to 1
    else {
        habit.streak = 1;
    }

    // Update best streak if current is higher
    if (habit.streak > habit.bestStreak) {
        habit.bestStreak = habit.streak;
    }
}

// Get yesterday's date in YYYY-MM-DD format
function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const year = yesterday.getFullYear();
    const month = String(yesterday.getMonth() + 1).padStart(2, '0');
    const day = String(yesterday.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Show delete confirmation modal
function showDeleteConfirmation(habitId) {
    habitToDelete = habitId;
    document.getElementById('confirm-modal').classList.add('active');
}

// Cancel delete action
function cancelDelete() {
    habitToDelete = null;
    document.getElementById('confirm-modal').classList.remove('active');
}

// Confirm and delete task
function confirmDelete() {
    if (!habitToDelete) return;

    const userData = getUserData();

    // Remove task from array
    userData.habits = userData.habits.filter(h => h.id !== habitToDelete);
    saveUserData(userData);

    // Clear temporary variable
    habitToDelete = null;

    // Close modal
    document.getElementById('confirm-modal').classList.remove('active');

    // Show notification
    showNotification('Task deleted', 'info');

    // Refresh displays
    loadHabits();
    updateStats();
    generateCalendar();
}

// Show task history modal
function showHistory(habitId) {
    const userData = getUserData();
    const habit = userData.habits.find(h => h.id === habitId);

    if (!habit) return;

    // Set modal title
    document.getElementById('modal-habit-name').textContent = habit.name;

    const historyList = document.getElementById('history-list');

    // Show empty state if no history
    if (habit.history.length === 0) {
        historyList.innerHTML = '<div class="empty-state"><div class="empty-icon">📊</div><p>No history yet</p></div>';
    } else {
        // Sort history newest to oldest
        const sortedHistory = habit.history.sort((a, b) => new Date(b) - new Date(a));

        // Generate history HTML with stats
        historyList.innerHTML = `
            <div style="margin-bottom: 24px;">
                <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 12px;">STATS</div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
                    <div style="padding: 16px; background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.2); border-radius: 10px;">
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">CURRENT STREAK</div>
                        <div style="font-size: 28px; font-weight: 700; color: var(--accent);">${habit.streak}</div>
                    </div>
                    <div style="padding: 16px; background: rgba(0,217,163,0.1); border: 1px solid rgba(0,217,163,0.2); border-radius: 10px;">
                        <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 4px;">BEST STREAK</div>
                        <div style="font-size: 28px; font-weight: 700; color: var(--success);">${habit.bestStreak}</div>
                    </div>
                </div>
                <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 12px;">COMPLETION HISTORY</div>
            </div>
            ${sortedHistory.map(date => `
                <div class="history-item">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span>✓ ${formatDate(date)}</span>
                        <span style="font-size: 12px; opacity: 0.6;">${getDaysAgo(date)}</span>
                    </div>
                </div>
            `).join('')}
        `;
    }

    // Show modal
    document.getElementById('history-modal').classList.add('active');
}

// Get "X days ago" text for a date
function getDaysAgo(dateString) {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    return `${diffDays} days ago`;
}

// Close history modal
function closeHistoryModal() {
    document.getElementById('history-modal').classList.remove('active');
}

// Update statistics cards
function updateStats() {
    const userData = getUserData();
    const today = getTodayDate();

    // Total tasks count
    document.getElementById('total-habits').textContent = userData.habits.length;

    // Completed today count
    const completedToday = userData.habits.filter(h => h.history.includes(today)).length;
    document.getElementById('completed-today').textContent = completedToday;

    // Today's completion percentage
    const totalHabits = userData.habits.length;
    const todayPercentage = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;
    document.getElementById('today-change').textContent = totalHabits > 0 ? `↑ ${todayPercentage}%` : '';

    // Active streaks (tasks with streak > 0)
    const activeStreaks = userData.habits.filter(h => h.streak > 0).length;
    document.getElementById('active-streaks').textContent = activeStreaks;

    // Best streak across all tasks
    const bestStreak = Math.max(0, ...userData.habits.map(h => h.bestStreak || 0));
    document.getElementById('best-streak').textContent = bestStreak;
}

// ========================================
// CALENDAR VISUALIZATION
// Purpose: Show activity heatmap for last 28 days
// ========================================
function generateCalendar() {
    const calendarGrid = document.getElementById('calendar-grid');
    const userData = getUserData();

    // Get last 28 days (4 weeks)
    const days = [];
    for (let i = 27; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date);
    }

    // Generate HTML for each day
    calendarGrid.innerHTML = days.map(date => {
        const dateStr = formatDateForCalendar(date);
        const dayNumber = date.getDate();

        // Count completed tasks on this day
        const completedCount = userData.habits.filter(habit =>
            habit.history.includes(dateStr)
        ).length;

        const hasActivity = completedCount > 0;

        return `
            <div class="calendar-day ${hasActivity ? 'has-activity' : ''}" title="${dateStr}">
                <div class="calendar-day-number">${dayNumber}</div>
                ${hasActivity ? `<div class="calendar-day-count">${completedCount}</div>` : ''}
            </div>
        `;
    }).join('');
}

// Format date for calendar (YYYY-MM-DD)
function formatDateForCalendar(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// ========================================
// VIEW SWITCHING
// Purpose: Switch between Tasks/Calendar/Analytics views
// ========================================
function switchTab(view) {
    currentView = view;

    // Update tab active states
    document.querySelectorAll('.viz-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');

    // Show/hide appropriate view
    document.getElementById('habits-view').style.display = view === 'habits' ? 'block' : 'none';
    document.getElementById('calendar-view').style.display = view === 'calendar' ? 'block' : 'none';
    document.getElementById('analytics-view').style.display = view === 'analytics' ? 'block' : 'none';

    // Generate calendar when switching to calendar view
    if (view === 'calendar') {
        generateCalendar();
    }

    // Generate analytics when switching to analytics view
    if (view === 'analytics') {
        generateAnalytics();
    }
}

// Generate analytics view content
function generateAnalytics() {
    const userData = getUserData();
    const analyticsContent = document.getElementById('analytics-content');

    // Show empty state if no tasks
    if (userData.habits.length === 0) {
        analyticsContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📈</div>
                <h3>No Analytics Yet</h3>
                <p>Start by creating tasks and completing them daily to see your progress analytics!</p>
            </div>
        `;
    } else {
        // Calculate analytics metrics
        const totalCompletions = userData.habits.reduce((sum, habit) => sum + habit.history.length, 0);
        const avgStreak = userData.habits.length > 0
            ? Math.round(userData.habits.reduce((sum, habit) => sum + habit.streak, 0) / userData.habits.length)
            : 0;

        // Display analytics
        analyticsContent.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 32px;">
                <div style="padding: 24px; background: rgba(0,217,163,0.1); border: 1px solid rgba(0,217,163,0.2); border-radius: 12px;">
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">TOTAL COMPLETIONS</div>
                    <div style="font-size: 36px; font-weight: 700; color: var(--success);">${totalCompletions}</div>
                </div>
                <div style="padding: 24px; background: rgba(255,215,0,0.1); border: 1px solid rgba(255,215,0,0.2); border-radius: 12px;">
                    <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 8px;">AVERAGE STREAK</div>
                    <div style="font-size: 36px; font-weight: 700; color: var(--accent);">${avgStreak}</div>
                </div>
            </div>
            <div class="empty-state">
                <div class="empty-icon">🚀</div>
                <h3>More Analytics Coming Soon!</h3>
                <p>We're working on adding charts, trends, and detailed insights.</p>
            </div>
        `;
    }
}

// ========================================
// EVENT LISTENERS
// ========================================

// Close modals when clicking outside
window.onclick = function (event) {
    const historyModal = document.getElementById('history-modal');
    const confirmModal = document.getElementById('confirm-modal');

    if (event.target === historyModal) {
        closeHistoryModal();
    }
    if (event.target === confirmModal) {
        cancelDelete();
    }
}

// Handle Enter key press in forms
document.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        const activeElement = document.activeElement;

        // Login form
        if (activeElement.id === 'login-username' || activeElement.id === 'login-password') {
            login();
        }

        // Register form
        if (activeElement.id === 'register-username' ||
            activeElement.id === 'register-password' ||
            activeElement.id === 'register-confirm-password') {
            register();
        }

        // Add task input
        if (activeElement.id === 'new-habit-name') {
            addHabit();
        }
    }
});
