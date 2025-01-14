import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#6C63FF',
        'primary-blue': '#4D9FFF',
        'dark-navy': '#1C1F26',
        'midnight-teal': '#243C54',
        'electric-pink': '#FF4D88',
        'vibrant-orange': '#FF9052',
        'gunmetal': '#2A2E35',
        'smoke-gray': '#3E444D',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #6C63FF, #4D9FFF)',
        'gradient-accent': 'linear-gradient(to right, #FF4D88, #FF9052)',
        'gradient-card': 'linear-gradient(to bottom right, #2A2E35, #3E444D)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(108, 99, 255, 0.2)',
      },
    },
  },
  plugins: [],
}
export default config
