class YearTracker {
    constructor() {
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.init();
        this.setupAutoRefresh();
    }

    init() {
        this.renderYear();
        this.updateFooter();
    }

    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    getDaysInYear(year) {
        return this.isLeapYear(year) ? 366 : 365;
    }

    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        const oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }

    renderYear() {
        const yearGrid = document.getElementById('yearGrid');
        const daysInYear = this.getDaysInYear(this.currentYear);
        const currentDayOfYear = this.getDayOfYear(this.currentDate);
        
        // Clear existing boxes
        yearGrid.innerHTML = '';
        
        // Create day boxes
        for (let day = 1; day <= daysInYear; day++) {
            const dayBox = document.createElement('div');
            dayBox.className = 'day-box';
            
            // Mark completed days
            if (day <= currentDayOfYear) {
                dayBox.classList.add('completed');
            }
            
            yearGrid.appendChild(dayBox);
        }
    }

    updateFooter() {
        const yearElement = document.getElementById('currentYear');
        const daysLeftElement = document.getElementById('daysLeft');
        
        const daysInYear = this.getDaysInYear(this.currentYear);
        const currentDayOfYear = this.getDayOfYear(this.currentDate);
        const daysLeft = daysInYear - currentDayOfYear;
        
        yearElement.textContent = this.currentYear;
        daysLeftElement.textContent = `${daysLeft} days left`;
    }

    setupAutoRefresh() {
        // Check for date change every minute
        setInterval(() => {
            const now = new Date();
            const newYear = now.getFullYear();
            const newDay = this.getDayOfYear(now);
            const currentDay = this.getDayOfYear(this.currentDate);
            
            // If year changed or day changed, refresh
            if (newYear !== this.currentYear || newDay !== currentDay) {
                this.currentDate = now;
                this.currentYear = newYear;
                this.init();
            }
        }, 60000); // Check every minute
        
        // Also check at midnight specifically
        this.scheduleNextMidnightUpdate();
    }

    scheduleNextMidnightUpdate() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        
        setTimeout(() => {
            this.currentDate = new Date();
            this.currentYear = this.currentDate.getFullYear();
            this.init();
            
            // Schedule the next midnight update
            this.scheduleNextMidnightUpdate();
        }, msUntilMidnight);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new YearTracker();
});

// Register service worker for PWA functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}