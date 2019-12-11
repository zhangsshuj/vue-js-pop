<template>
  <div class="about">
    <div class="ui">
      <h1>BUTTON</h1>
      <btn text="showLoading" :showLoading="true"></btn>
      <btn text="disabled" :disabled="true"></btn>
      <btn text="mini" :mini="true"></btn>
      <btn text="recta" :recta="true"></btn>
      <btn text="plain" :plain="true"></btn>
      <btn text="submit" actionType="submit"></btn>
      <btn text="reset" actionType="reset"></btn>
      <btn text="button" actionType="button"></btn>
      <btn text="gradients" :gradients="['#fff','#FF5853']"></btn>
    </div>
    <div class="ui">
      <h1>Confirm</h1>
      <btn :gradients="['#fff','#a2ff41']" text="$iosAlert" @buttonClick="ConfirmFn('$iosAlert')"></btn>
      <btn :gradients="['#fff','#a2ff41']" text="$iosConfirm" @buttonClick="ConfirmFn('$iosConfirm')"></btn>
      <btn :gradients="['#fff','#a2ff41']" text="$iosPrompt" @buttonClick="ConfirmFn('$iosPrompt')"></btn>
      <btn :gradients="['#fff','#a2ff41']" text="$iosRemind" @buttonClick="ConfirmFn('$iosRemind')"></btn>
    </div>
  </div>
</template>
<script>
  import btn from '../components/button'
  export default {
      components: {btn},
      data() {
          return {

          }
      },
      methods: {
          // confirm 弹框
          ConfirmFn(type) {
              console.log(type)
             switch (type) {
                 case '$iosAlert':
                     this.$iosAlert({title: '$iosAlert',text: '123'})
                     break;
                 case '$iosConfirm':
                     this.$iosConfirm({title: '$iosConfirm',text: '123'})
                     break;
                 case '$iosPrompt':
                     this.$iosPrompt({title: '$iosPrompt',text: '123', placeholder: '请输入'})
                     break;
                 case '$iosRemind':
                     this.$iosRemind({title: '$iosRemind',text: '123'})
                     break;
             }
          },
      }
  }
</script>
<style lang="scss">
  .ui{
    margin-bottom: 50px;
  }
</style>
