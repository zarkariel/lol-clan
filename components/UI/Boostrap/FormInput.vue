<template>
  <div role="form-group">

    <label for="inputLive"><slot/></label>
    <b-form-input 
      v-if="controlType === 'text'"
      :id="`${id}`"
      v-bind="$attrs"
      v-model.trim="name"
      :state="nameState"
      :value="value"
      :aria-describedby="`inputLiveHelp-${id} inputLiveFeedback-${id}`"
      type="text"
      @input="handleInput"
    />
    <b-form-input 
      v-if="controlType === 'password'"
      :id="`inputLive-${id}`"
      v-bind="$attrs"
      v-model.trim="name"
      :state="nameState"
      :aria-describedby="`inputLiveHelp-${id} inputLiveFeedback-${id}`"
      :value="value"
      type="password"
      @input="handleInput"
    />
    <b-form-invalid-feedback :id="`inputLiveFeedback-${id}`">
      <!-- This will only be shown if the preceeding input has an invalid state -->
      Bạn vui lòng nhập nhiều hơn 6 kí tự
    </b-form-invalid-feedback>
    <b-form-text :id="`inputLiveHelp-${id}`">
      <!-- this is a form text block (formerly known as help block) -->
      {{ liveHelp }}.
    </b-form-text>

  </div>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    controlType: {
      type: String,
      default: 'input',
      required: false
    },
    value: {
      type: String,
      default: ''
    },
    liveHelp: {
      type: String,
      default: '',
      required: false
    },
    id: {
      type: String,
      default: '',
      required: false
    }
  },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    nameState() {
      return this.name.length > 6 ? true : false
    }
  },
  methods: {
    handleInput(e) {
      this.$emit('input', this.name)
    }
  }
}
</script>

<style>
</style>
