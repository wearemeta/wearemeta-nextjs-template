import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{html,js,ts,jsx,tsx}',
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    // Include design system components
    '../wearemeta-design-system/packages/design-system/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'size-h1': ['24px', '120%'],
        'size-h2': ['20px', '120%'],
        'size-title': ['18px', '120%'],
        'size-subtitle': ['16px', '120%'],
        'size-subtitle2': ['14px', '120%'],
        'size-body-lg': ['13px', '120%'],
        'size-body-sm': ['12px', 'auto'],
        'size-button': ['14px', '120%'],
        'size-button-sm': ['12px', '120%'],
        'size-label': ['12px', '120%'],
        'size-caption': ['12px', '120%'],
        paragraph2: ['14px', '120%'],
      },
      colors: {
        white: 'var(--white)',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        body: 'hsl(var(--grey-600))',
        title: 'hsl(var(--grey-700))',
        disable: 'hsl(var(--grey-300))',
        negative: 'hsl(var(--grey-300))',
        subtle: 'hsl(var(--grey-50))',
        subtitle: 'hsl(var(--grey-500))',
        caption: 'hsl(var(--grey-500))',
        primary: {
          DEFAULT: 'hsl(var(--company-primary))',
          surface: 'hsl(var(--company-primary))',
          subtle: 'hsl(var(--company-subtle))',
          darker: 'hsl(var(--company-darker))',
          border: 'hsl(var(--company-primary))',
        },
        border: {
          DEFAULT: 'hsl(var(--border-medium))',
          subtle: 'hsl(var(--grey-100))',
          medium: 'hsl(var(--grey-200))',
          disable: 'hsl(var(--grey-300))',
          darker: 'hsl(var(--grey-700))',
        },
        surface: {
          DEFAULT: 'hsl(var(--grey-100))',
          subtle: 'hsl(var(--grey-50))',
          disable: 'hsl(var(--grey-300))',
          light: 'hsl(var(--grey-25))',
        },
        info: {
          DEFAULT: 'hsl(var(--info-500))',
          darker: 'hsl(var(--info-700))',
          subtle: 'hsl(var(--info-100))',
          super_subtle: 'hsl(var(--info-50))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning-500))',
          darker: 'hsl(var(--warning-700))',
          subtle: 'hsl(var(--warning-100))',
          super_subtle: 'hsl(var(--warning-50))',
        },
        alert: {
          DEFAULT: 'hsl(var(--danger-500))',
          darker: 'hsl(var(--danger-700))',
          subtle: 'hsl(var(--danger-100))',
          super_subtle: 'hsl(var(--danger-50))',
        },
        success: {
          DEFAULT: 'hsl(var(--success-500))',
          darker: 'hsl(var(--success-700))',
          subtle: 'hsl(var(--success-100))',
          super_subtle: 'hsl(var(--success-50))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      boxShadow: {
        elevation: 'var(--elevation)',
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '32px',
        checkbox: '3px',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1350px',
      '2xl': '1536px',
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
