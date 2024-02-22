import { createTheme } from "@mui/material/styles";
import { brand, colors } from "./style.palette";
import { baseFontFamily, fontSize, fontWeight } from "./style.typography";


const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0, // Extra small devices (up to 767px)
      sm: 768, // Small devices (768px and up)
      md: 1024, // Medium devices (1024px and up)
      lg: 1600, // Large devices (1600px and up)
      xl: 1921, // Extra large devices (1920px and up)
    },
  },
  typography: {
    fontFamily: baseFontFamily,
    h1: {
      fontSize: fontSize.h1,
      fontWeight: fontWeight.semiBold
    },
    h2: {
      fontSize: fontSize.h2,
      fontWeight: fontWeight.light
    },
    h3: {
      fontSize: fontSize.h3,
      fontWeight: fontWeight.medium
    },
    h4: {
      fontSize: fontSize.h1,
      fontWeight: fontWeight.medium
    },
    body1: {
      fontSize: fontSize.b1,
      fontWeight: fontWeight.regular
    },
    body2: {
      fontSize: fontSize.b2,
      fontWeight: fontWeight.regular
    },
    subtitle1: {
      fontSize: fontSize.b2,
      fontWeight: fontWeight.medium
    },
    subtitle2: {
      fontSize: fontSize.b2,
      fontWeight: fontWeight.semiBold
    },
  },
  palette: {
    primary: {
      main: brand.primaryMain,
    },
    secondary: {
      main: brand.secondaryMain,
    },
    info: {
      main: colors.red,
    }
  },
  shape: {
    borderRadius: 5,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          margin: '0px',
          padding: '8px 16px',
          fontFamily: baseFontFamily,
          fontSize: fontSize.b2,
          fontWeight: fontWeight.medium,
          boxShadow: 'none',
          '&.Mui-disabled': {
            color: colors.grey,
            backgroundColor: colors.greyLight
          },
        },
        outlinedPrimary: {
          borderRadius: 8,
          borderColor: colors.greyMedium,
          color: brand.textColourDark,
          '&:hover': {
            borderColor: colors.greyMedium,
            color: brand.textColourDark,
            backgroundColor: 'inherit',
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          borderRadius: 8,
        },
        textPrimary: {

        },
        outlinedSecondary: {
          borderRadius: 8,
        },
        containedSecondary: {
          borderRadius: 8,
          color: brand.textColourDark,
          backgroundColor: colors.greyLight,
          boxShadow: 'none',
          '&:hover': {
            borderColor: colors.greyLight,
            color: brand.textColourDark,
            backgroundColor: colors.greyLight,
            boxShadow: 'none',
          },
        },
        textSecondary: {
          color: brand.textColourDark,
          boxShadow: 'none',
          '&:hover': {
            borderColor: colors.greyLight,
            color: brand.textColourDark,
            backgroundColor: colors.greyLight,
            boxShadow: 'none',
          },
        }
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          alignItems: 'baseline',
          justifyContent: 'center',
          flexDirection: 'column'
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          boxShadow: '0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.10)',
          padding: '24px 40px'
        }
      }
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          display: 'flex',
          flexDirection: 'column',
          '&:last-child': {
            paddingBottom: '16px'
          },
        }
      }
    },
    MuiLink: {
      styleOverrides: {
        root: {
          fontFamily: baseFontFamily,
          fontSize: fontSize.b2,
          textDecoration: 'none',
          '&:hover': {
            textDecoration: 'underline'
          },
        }
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%',
        }
      }
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: fontSize.b1,
          borderRadius: '6px',
          backgroundColor: brand.inputBg,
          border: 'none',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: `${brand.inputBorder} !important`
          },
          '&.Mui-error': {
            backgroundColor: brand.errorBg,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: `${brand.errorBorder} !important`
            }
          },
          '&.Mui-focused': {
            backgroundColor: colors.white,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderWidth: '1px !important',
            borderColor: `${brand.inputBorder} !important`
          },
          '&.Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: `${brand.errorBorder} !important`
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: `${brand.inputBg} !important`
          }
        },
        input: {
          padding: '13px 20px'
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '10px 10px 10px 19px',
          width: '319px',
          height: '30px'
        },
        notchedOutline: {
          borderColor: brand.inputBg,
          borderRadius: '6px'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          top: -3,
          color: brand.placeHolder,
          '&.Mui-focused': {
            color: brand.inputBorder
          },
          '&.Mui-error': {
            color: brand.errorBorder,
          }
        },
        shrink: {
          top: 0,

        }
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: 0,
          paddingRight: '8px'
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
         flexDirection: 'row',
        },
        item:{
            flexDirection:'column', 
        }
      }
    }
  },
});

export default theme;
