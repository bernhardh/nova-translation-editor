const twColors = require('tailwindcss/colors')
const { toRgba } = require('tailwindcss/lib/util/withAlphaVariable')
const defaultTheme = require('tailwindcss/defaultTheme')

const colors = {
    black: twColors.black,
    white: twColors.white,
    blue: twColors.blue,
    primary: twColors.sky,
    yellow: twColors.yellow,
    red: twColors.red,
    green: twColors.green,
    gray: twColors.blueGray,
}

function generateColorVariables(colors) {
    return Object.fromEntries(
        Object.entries(colors)
            .map(([key, value]) => {
                if (typeof value === 'string') {
                    return [[key, toRgba(value)]]
                }

                return Object.entries(value).map(([shade, hex]) => {
                    return [`${key}-${shade}`, toRgba(hex)]
                })
            })
            .flat(1)
            .map(([name, channels]) => {
                return [`--colors-${name}`, channels.slice(0, -1).join(', ')]
            })
    )
}

function colorVar(name) {
    return ({ opacityValue }) => {
        return opacityValue === undefined
            ? `rgb(var(--colors-${name}))`
            : `rgba(var(--colors-${name}), ${opacityValue})`
    }
}

function toColorVariables(colors) {
    return Object.fromEntries(
        Object.entries(colors).map(([key, value]) => {
            if (typeof value === 'string') {
                return [key, colorVar(key)]
            }

            return [
                key,
                Object.fromEntries(
                    Object.entries(value).map(([shade]) => {
                        return [shade, colorVar(`${key}-${shade}`)]
                    })
                ),
            ]
        })
    )
}

module.exports = {
    mode: 'jit',
    purge: [
        './src/**/*.php',
        './src/**/*.vue',
        './resources/**/*{js,vue,blade.php}',
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        colors: {
            ...toColorVariables(
                (({ transparent, current, ...others }) => others)(colors)
            ),

            primary: {
                50: 'rgba(var(--colors-primary-50))',
                100: 'rgba(var(--colors-primary-100))',
                200: 'rgba(var(--colors-primary-200))',
                300: 'rgba(var(--colors-primary-300))',
                400: 'rgba(var(--colors-primary-400))',
                500: 'rgba(var(--colors-primary-500))',
                600: 'rgba(var(--colors-primary-600))',
                700: 'rgba(var(--colors-primary-700))',
                800: 'rgba(var(--colors-primary-800))',
                900: 'rgba(var(--colors-primary-900))',
            },
        },

        extend: {
            colors: {
                current: 'currentColor',
                transparent: 'transparent',
            },

            fill: {
                gray: twColors.blueGray,
                blue: twColors.sky,
            },

            fontFamily: {
                sans: ['Nunito Sans', ...defaultTheme.fontFamily.sans],
            },

            fontSize: {
                xxs: '11px',
            },

            height: {
                '[1.875rem]': '1.875rem',
                '[3.75rem]': '3.75rem',
            },

            maxWidth: {
                xxs: '15rem',
            },

            minHeight: theme => ({
                ...theme('spacing'),
            }),

            minWidth: theme => ({
                ...theme('spacing'),
                '[56px]': '56px',
            }),

            spacing: {
                5: '1.25rem',
                9: '2.25rem',
                11: '2.75rem',
            },

            top: theme => ({
                ...theme('inset'),
                '[56px]': '56px',
            }),

            width: theme => ({
                ...theme('spacing'),
                '[6rem]': '6rem',
                '[25rem]': '25rem',
            }),
        },
    },
    variants: {
        extend: {
            fill: ['dark'],
            backgroundColor: ['active'],
            textColor: ['active'],
        },
    },
    plugins: [
    ],
}
