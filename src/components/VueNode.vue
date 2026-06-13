<template>
  <div ref="vue-node" class="node" :class="cssProps.actionType" @click="handleClick"
    :style="'width:' + cssProps.width + 'px; height:' + cssProps.height + 'px; background:' + cssProps.background + ';' +
      ' border-color:' + cssProps.borderColor + '; border:' + cssProps.borderWidth + 'px ' + cssProps.borderType + ' ' + cssProps.borderColor + ';border-radius:' + cssProps.borderRadius + ';'">
    <div class="vue-node-label" :style="'width:' + (cssProps.width - cssProps.borderWidth - 2) + 'px;' +
      ((cssProps.vertical === 'center') ?
        ('height:' + (cssProps.height) + 'px; line-height:' + (cssProps.height - cssProps.borderWidth - 2) + 'px;') :
        ((cssProps.vertical === 'top') ? ('position: absolute; top: ' + 'px; left: ' + cssProps.borderWidth + 'px;') : ('position: absolute; bottom: 0; left: ' + cssProps.borderWidth + 'px;'))) +
      ' text-align:' + cssProps.textAligh + ';' +
      'font-size: ' + cssProps.fontSize + 'px; color:' + cssProps.fontColor + ';' +
      'font-family: ' + cssProps.fontFamily + ';'">
      {{ cssProps.label }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, inject, onMounted } from 'vue'

const getNode = inject('getNode')
const cssProps = reactive({
  width: 0,
  height: 0,
  label: '',
  fontSize: 14,
  fontColor: '#333',
  background: '#FFF',
  borderColor: '#333',
  borderWidth: 1, // 2
  borderType: 'solid',
  textAligh: 'center',
  vertical: 'center',
  borderRadius: '0',
  fontFamily: '微软雅黑',
  actionType: 'normal',
})

onMounted(() => {
  const node = getNode && getNode()
  cssProps.width = node.store.data.size.width
  cssProps.height = node.store.data.size.height
  if (node.store.data.attrs.hasOwnProperty('text')) {
    cssProps.label = node.store.data.attrs.text.text
  }
  if (!node.hasOwnProperty('custom') && node.attrs.hasOwnProperty('custom')) {
    node.custom = node.attrs.custom
  }
  if (node.hasOwnProperty('custom')) {
    if (node.custom.hasOwnProperty('fontColor')) {
      cssProps.fontColor = node.custom.fontColor
    }
    if (node.custom.hasOwnProperty('color')) {
      cssProps.background = node.custom.color
    }
    if (node.custom.hasOwnProperty('strokeColor')) {
      cssProps.borderColor = node.custom.strokeColor
    }
    if (node.custom.hasOwnProperty('strokeWidth')) {
      cssProps.borderWidth = node.custom.strokeWidth
    }
    if (node.custom.hasOwnProperty('strokeDasharray')) {
      if (node.custom.strokeDasharray === '5,0') {
        cssProps.borderType = 'solid'
      } else if (node.custom.strokeDasharray === '5,5') {
        cssProps.borderType = 'dashed'
      }
    }
    if (node.custom.hasOwnProperty('horizontal')) {
      if (node.custom.horizontal === 'left') {
        cssProps.textAligh = 'left'
      } else if (node.custom.horizontal === 'middle') {
        cssProps.textAligh = 'center'
      } else if (node.custom.horizontal === 'right') {
        cssProps.textAligh = 'right'
      }
    }
    if (node.custom.hasOwnProperty('vertical')) {
      cssProps.vertical = node.custom.vertical
    }
    if (node.custom.hasOwnProperty('borderRadius')) {
      cssProps.borderRadius = node.custom.borderRadius + 'px'
    }
    if (node.custom.hasOwnProperty('fontFamily')) {
      cssProps.fontFamily = node.custom.fontFamily
    }
  }
})

function handleClick() {
  const node = getNode && getNode()
  console.log(node, '拿到origin，做一些业务处理')
  // console.log(this)
}

</script>
<style scoped lang="scss"></style>