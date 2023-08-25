import { extendTheme, StyleFunctionProps } from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";

const styles = {
    global: (props: StyleFunctionProps) => ({
        body: {
            // sets a custom bg color for dark mode only
            bg: mode(
                // light mode value retrieved from theme
                props.theme.semanticTokens.colors['chakra-body-bg']._light,
                // your custom value for dark mode
                'black',
            )(props),
        },
    }),
};

const components = {
    Drawer: {
        // setup light/dark mode component defaults
        baseStyle: (props: any) => ({
            dialog: {
                bg: mode('white', '#141214')(props),
            },
        }),
    },
};

const theme = extendTheme({
    components,
    styles,
    initialColorMode: 'dark',
});

export default theme;