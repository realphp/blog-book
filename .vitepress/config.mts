import {defineConfig} from 'vitepress';
import {withSidebar} from 'vitepress-sidebar';

const vitePressOptions = {
    title: "Jun Blog",
    description: "xiao jun blog book",
    base: '/blog-book/',
    srcDir: 'docs',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
       // nav: [
       //     {text: 'Home2', link: '/'},
       //     {text: 'Examples', link: '/markdown-examples'}
       // ]
    }
};

const vitePressSidebarOptions = {
    // VitePress Sidebar's options here...
    documentRootPath: '/docs',
    collapsed: false,
    capitalizeFirst: true
};


// https://vitepress.dev/reference/site-config
export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
