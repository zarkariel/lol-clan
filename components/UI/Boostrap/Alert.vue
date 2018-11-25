<template>
  <div>
    <no-ssr>
      <notifications 
        group="alerts"
        position="bottom right">
        <template 
          slot="body" 
          slot-scope="props">
          <b-alert 
            :show="props.item.duration || 3000"
            :variant="props.item.type || 'info'"
            dismissible
            @dismissed="props.item.timer=0">
            <p>{{ props.item.text }}</p>     
          </b-alert>
        </template>
      </notifications>
    </no-ssr> 
  </div>

</template>

<script>
export default {
  name: 'BoostrapAlert'
}
</script>

<style>
</style>
