<template>
 <div class="validate-input-container pb-3">
        <input
          v-if="tag !== 'textarea'"
          type="text"
          class="form-control"
          :class="{'is-invalid': inputRef.error}"
          :value="inputRef.val"
          @blur="validateInput"
          @input="updateValue"
          v-bind="attrs"
        />
        <textarea
          v-else
          type="text"
          class="form-control"
          :class="{'is-invalid': inputRef.error}"
          :value="inputRef.val"
          @blur="validateInput"
          @input="updateValue"
          v-bind="attrs"
        >
        </textarea>
        <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
      </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType, onMounted } from 'vue'
import { emitter } from './ValidateForm.vue'
const emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
interface RuleProp {
  type: 'required' | 'email' | 'custom';
  message: string;
  validator?: () => boolean;
}
export type RulesProp = RuleProp[]
export type TagType = 'input' | 'textarea'
export default defineComponent({
  props: {
    rules: Array as PropType<RulesProp>,
    modelValue:String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  inheritAttrs:false,
  setup (props, context) {
    const attrs = context.attrs
    const inputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const validateInput = () => {
      if(props.rules) {
        const allPassed = props.rules.every(rule => {
          let passed = true
          inputRef.message = rule.message
          switch(rule.type) {
            case 'required' :
              passed = (inputRef.val.trim() !== '')
              break
            case 'email': 
              passed = emailReg.test(inputRef.val)
              break
            case 'custom': 
              passed = rule.validator ? rule.validator() : true
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }

    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      context.emit('update:modelValue', targetValue)
    }
    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue,
      attrs
    }
  }
})
</script>

<style scoped>

</style>