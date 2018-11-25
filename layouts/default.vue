<template>
  <div>
    <Navigation />
    <nuxt/>
    <Footer/> 
  </div>
</template>

<script>
import Navigation from '@/components/Navigation.vue'
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Navigation,
    Footer
  },
  head() {
    return {
      title: 'Lol Clan App - Ứng dụng quản lý clan cho liên minh huyền thoại',
      link: [
        {
          rel: 'stylesheet',
          href: '/vendor/bootstrap/css/bootstrap.min.css'
        },
        {
          //font awesome
          rel: 'stylesheet',
          href: '/vendor/fontawesome-free/css/all.min.css'
        },
        {
          rel: 'stylesheet',
          href: '/vendor/simple-line-icons/css/simple-line-icons.css'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Lato'
        },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Catamaran:100,200,300,400,500,600,700,800,900'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css?family=Muli'
        },
        //Plugin CSS
        {
          rel: 'stylesheet',
          href: '/device-mockups/device-mockups.min.css'
        },
        //Custom styles for this template
        {
          rel: 'stylesheet',
          href: '/css/new-age.css'
        }
      ],
      bodyAttrs: {
        id: 'page-top'
      },
      script: [
        {
          src: '/vendor/jquery/jquery.min.js'
        },
        {
          src: '/vendor/bootstrap/js/bootstrap.bundle.min.js'
        },
        {
          src: '/vendor/jquery-easing/jquery.easing.min.js'
        },
        {
          src: '/js/new-age.js'
        }
      ]
    }
  }
}
</script>
