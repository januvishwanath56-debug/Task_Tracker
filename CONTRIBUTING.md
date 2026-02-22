# Contributing to Taskly

First off, thank you for considering contributing to Taskly! 🎉

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates.

When creating a bug report, include:
- **Description**: Clear description of the bug
- **Steps to Reproduce**: Detailed steps to reproduce the issue
- **Expected Behavior**: What you expected to happen
- **Actual Behavior**: What actually happened
- **Screenshots**: If applicable
- **Browser & Version**: Which browser and version you're using
- **Additional Context**: Any other relevant information

### 💡 Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:
- **Clear Title**: Descriptive title for the enhancement
- **Description**: Detailed description of the suggested enhancement
- **Use Case**: Why would this enhancement be useful?
- **Possible Implementation**: If you have ideas on how to implement it

### 🔧 Pull Requests

1. **Fork the Repository**
   ```bash
   git clone https://github.com/januvishwanath56-debug/taskly.git
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Make Your Changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Test thoroughly across browsers

4. **Commit Your Changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
   
   Use clear, descriptive commit messages:
   - `feat: Add dark mode toggle`
   - `fix: Resolve streak calculation bug`
   - `docs: Update README with new features`
   - `style: Improve button animations`
   - `refactor: Simplify date formatting logic`

5. **Push to Your Fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **Open a Pull Request**
   - Provide a clear title and description
   - Reference any related issues
   - Include screenshots if UI changes
   - Explain your implementation approach

## Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Keep proper indentation (2 or 4 spaces)
- Add comments for major sections
- Use lowercase for tags and attributes

### CSS
- Follow existing naming conventions
- Use CSS variables for colors and common values
- Group related styles together
- Add comments for each major section
- Keep selectors specific but not overly nested

### JavaScript
- Use ES6+ features (const, let, arrow functions, etc.)
- Follow camelCase naming convention
- Add JSDoc comments for functions
- Keep functions small and focused
- Handle errors appropriately
- Use meaningful variable names

### Example Function with Comments:
```javascript
/**
 * Calculate the completion rate for the last 7 days
 * @param {Object} habit - The habit object
 * @returns {number} Percentage (0-100)
 */
function calculateCompletionRate(habit) {
    const last7Days = getLast7Days();
    const completedDays = last7Days.filter(date => 
        habit.history.includes(date)
    ).length;
    return Math.round((completedDays / 7) * 100);
}
```

## Testing Checklist

Before submitting a PR, ensure:
- [ ] Code works in Chrome, Firefox, Safari, and Edge
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] No console errors or warnings
- [ ] LocalStorage operations work correctly
- [ ] All existing features still work
- [ ] Code is properly commented
- [ ] README updated if needed

## Priority Areas for Contribution

We especially welcome contributions in these areas:
- 🐛 Bug fixes
- ♿ Accessibility improvements
- 🌍 Internationalization (i18n)
- 📱 Mobile experience enhancements
- 📊 New chart/visualization types
- 🎨 UI/UX improvements
- 📝 Documentation improvements
- ✅ Test coverage

## Questions?

Feel free to:
- Open an issue with the `question` label
- Reach out via email: januvishwanath56@gmail.com
- Start a discussion in GitHub Discussions

## Code of Conduct

### Our Pledge
We are committed to making participation in this project a harassment-free experience for everyone.

### Our Standards
- Be respectful and inclusive
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discriminatory comments
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information

Thank you for contributing! 🚀
