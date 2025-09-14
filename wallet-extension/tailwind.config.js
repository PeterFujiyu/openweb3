/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: ['class', "class"],
  theme: {
  	extend: {
  		fontFamily: {
  			montserrat: [
  				'Montserrat',
  				'Noto Sans SC',
  				'sans-serif'
  			]
  		},
  		colors: {
  			'uniswap-bg': '#111111',
  			'uniswap-card': '#222222',
  			'uniswap-surface': '#1A1A1A',
  			'uniswap-pink': '#FF007A',
  			'uniswap-purple': '#9933FF',
  			'uniswap-text-primary': '#FFFFFF',
  			'uniswap-text-secondary': '#A0A0A0',
  			'uniswap-text-tertiary': '#666666',
  			'uniswap-green': '#27AE60',
  			'uniswap-red': '#EB5757',
  			'uniswap-active-tab': '#FFFFFF',
  			'uniswap-inactive-tab': '#A0A0A0',
  			'light-bg': '#FFFFFF',
  			'light-card': '#F8F9FA',
  			'light-surface': '#F1F3F4',
  			'light-text-primary': '#1A1A1A',
  			'light-text-secondary': '#6B7280',
  			'light-text-tertiary': '#9CA3AF',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'slide-up': 'slideUp 0.6s ease-out',
  			'slide-up-delay-1': 'slideUp 0.6s ease-out 0.1s both',
  			'slide-up-delay-2': 'slideUp 0.6s ease-out 0.2s both',
  			'slide-up-delay-3': 'slideUp 0.6s ease-out 0.3s both',
  			float: 'float 6s ease-in-out infinite',
  			'slow-spin': 'spin 20s linear infinite',
  			'slow-spin-reverse': 'spin-reverse 25s linear infinite',
  			heartbeat: 'heartbeat 1.5s ease-in-out infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			slideUp: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(30px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
  				}
  			},
  			'spin-reverse': {
  				'0%': {
  					transform: 'rotate(360deg)'
  				},
  				'100%': {
  					transform: 'rotate(0deg)'
  				}
  			},
  			heartbeat: {
  				'0%, 100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				},
  				'25%': {
  					transform: 'scale(1.05)',
  					opacity: '0.9'
  				},
  				'50%': {
  					transform: 'scale(1.1)',
  					opacity: '0.8'
  				},
  				'75%': {
  					transform: 'scale(1.05)',
  					opacity: '0.9'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}