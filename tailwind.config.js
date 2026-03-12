module.exports = {
  theme: {
    extend: {
      animation: {
        spin: 'spin 5s linear infinite',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    }
  }
}