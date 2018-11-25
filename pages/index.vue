<template>
  <div>
    <IndexHeader/>
    <IndexDownload/>
    <IndexFeatures/>
    <IndexCta/>
    <IndexContact/>
  </div>
</template>

<script>
import IndexHeader from '@/components/Index/Header.vue'
import IndexDownload from '@/components/Index/Download.vue'
import IndexFeatures from '@/components/Index/Features.vue'
import IndexCta from '@/components/Index/Cta.vue'
import IndexContact from '@/components/Index/Contact.vue'

export default {
  layout: 'default',
  components: {
    IndexHeader,
    IndexDownload,
    IndexFeatures,
    IndexCta,
    IndexContact
  }
}
</script>
