
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Nachthimmel & Sterne Theme
				midnight: {
					50: '#f0f2f8',
					100: '#d8dde8',
					200: '#b8c2d6',
					300: '#8a9ac2',
					400: '#5c72ab',
					500: '#3a4d7a',
					600: '#2d3b5f',
					700: '#212947',
					800: '#161b30',
					900: '#0a0e1a'
				},
				stellar: {
					50: '#f7fbff',
					100: '#e6f3ff',
					200: '#cce6ff',
					300: '#b3d9ff',
					400: '#99ccff',
					500: '#80bfff',
					600: '#4da6ff',
					700: '#1a8cff',
					800: '#0073e6',
					900: '#005bb3'
				},
				nebula: {
					50: '#f5f8ff',
					100: '#e8efff',
					200: '#d1dfff',
					300: '#a8d0ff',
					400: '#7bb3f0',
					500: '#4a90e2',
					600: '#3a7bd5',
					700: '#2c5aa0',
					800: '#1e3f73',
					900: '#0f1f36'
				},
				cosmic: {
					50: '#f4f6f8',
					100: '#e8ecf0',
					200: '#d1d9e0',
					300: '#a8b8c8',
					400: '#718096',
					500: '#4a5568',
					600: '#3a424e',
					700: '#2d3748',
					800: '#1a202c',
					900: '#0d1117'
				}
			},
			fontFamily: {
				'space-grotesk': ['Space Grotesk', 'sans-serif'],
				'poppins': ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'sparkle': {
					'0%, 100%': { 
						opacity: '0',
						transform: 'scale(0.5) rotate(0deg)'
					},
					'50%': { 
						opacity: '1',
						transform: 'scale(1) rotate(180deg)'
					}
				},
				'drive': {
					'0%': { transform: 'translateX(-100px) rotate(-10deg)' },
					'100%': { transform: 'translateX(100px) rotate(10deg)' }
				},
				'glitter': {
					'0%, 100%': { opacity: '0.3', transform: 'scale(0.8)' },
					'50%': { opacity: '1', transform: 'scale(1.2)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'drive': 'drive 1s ease-in-out infinite alternate',
				'glitter': 'glitter 1.5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
