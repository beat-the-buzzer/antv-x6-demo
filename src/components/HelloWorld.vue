<template>
  <div class="common-layout">
    <el-container>
      <el-container id="container">
        <el-main class="main-content">
          <div id="graph-container"></div>
        </el-main>
      </el-container>
    </el-container>
    <div class="lengend-container">
      <div class="lengend-item" v-for="(colorItem, colorClassName) in colorMap" :key="colorClassName">
        <div class="lengend-name">{{ colorClassName }}</div>
        <div class="lengend-box" :style="'background:' + colorItem.color + ';'"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineComponent, onMounted, ref, h } from 'vue'
import { Graph, Shape } from '@antv/x6'
import VueNode from './VueNode.vue'
import { register } from '@antv/x6-vue-shape'

const example6: any = {
  "position": {
    "x": 70,
    "y": 100
  },
  "size": {
    "width": 200,
    "height": 50
  },
  "view": "vue-shape-view",
  "attrs": {
    "body": {
      "fill": "#9CC3E5",
      "stroke": "#9CC3E5"
    },
    "text": {
      "text": ""
    },
    "custom": {
      "editMode": false,
      "showFuncMenu": false,
      // "color":"#9CC3E5",
      // "strokeColor":"#9CC3E5"
    }
  },
  "shape": "custom-vue-node",
  "ports": {
    "groups": {
      "top": {
        "position": "top",
        "attrs": {
          "circle": {
            "r": 4,
            "magnet": true,
            "stroke": "#5F95FF",
            "strokeWidth": 1,
            "fill": "#fff",
            "style": {
              "visibility": "hidden"
            }
          }
        }
      },
      "right": {
        "position": "right",
        "attrs": {
          "circle": {
            "r": 4,
            "magnet": true,
            "stroke": "#5F95FF",
            "strokeWidth": 1,
            "fill": "#fff",
            "style": {
              "visibility": "hidden"
            }
          }
        }
      },
      "bottom": {
        "position": "bottom",
        "attrs": {
          "circle": {
            "r": 4,
            "magnet": true,
            "stroke": "#5F95FF",
            "strokeWidth": 1,
            "fill": "#fff",
            "style": {
              "visibility": "hidden"
            }
          }
        }
      },
      "left": {
        "position": "left",
        "attrs": {
          "circle": {
            "r": 4,
            "magnet": true,
            "stroke": "#5F95FF",
            "strokeWidth": 1,
            "fill": "#fff",
            "style": {
              "visibility": "hidden"
            }
          }
        }
      }
    },
    "items": [
      { "group": "top", "id": "f284685b-1e58-4bb4-af84-5225186a85aa" },
      { "group": "right", "id": "72104d67-1e40-4558-ade9-a0da17ab1141" },
      { "group": "bottom", "id": "49514e19-4a5b-4d7e-907a-71a80f5511b9" },
      { "group": "left", "id": "2b09d349-4125-4eb4-8896-c7b39952215b" }
    ]
  },
  "id": "cb6ad287-2c7d-424b-830d-78f91001397f",
  "getLarge": true,
  "zIndex": 1
}

const example7: any = {
  "shape": "edge",
  "attrs": {
    "line": {
      "stroke": "#A2B1C3",
      "targetMarker": {
        "name": "block",
        "width": 8,
        "height": 6
      }
    }
  },
  "id": "2166f0dc-8f5a-40f6-8d94-98b2d9816752",
  "zIndex": 0,
  "source": {
    "cell": "7def7220-ac06-4762-805c-fd569bf7e39c",
    "port": "f9e4805c-84c3-4425-83be-6c94052dcf5c"
  },
  "target": {
    "cell": "2d132ec1-4cfe-42b1-84dc-45dd7852020b",
    "port": "d4671a70-020f-4039-8c85-b7746acb9ae3"
  }
}

let graph: any;
onMounted(() => {
  graph = new Graph({
    container: document.getElementById('graph-container'),
    width: window.innerWidth - 60,
    height: window.innerHeight - 70,
    panning: true,
    interacting: false,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: 'ctrl',
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      router: 'manhattan',
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },
      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      snap: {
        radius: 20,
        anchor: 'center'
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: '#A2B1C3',
              strokeWidth: 2,
              targetMarker: {
                name: 'block',
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        })
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#5F95FF',
            stroke: '#5F95FF',
          },
        },
      },
    },
  })

  // #region 初始化图形
  // const ports = {
  //   groups: {
  //     top: {
  //       position: 'top',
  //       attrs: {
  //         circle: {
  //           r: 4,
  //           magnet: true,
  //           stroke: '#5F95FF',
  //           strokeWidth: 1,
  //           fill: '#fff',
  //           style: {
  //             visibility: 'hidden',
  //           },
  //         },
  //       },
  //     },
  //     right: {
  //       position: 'right',
  //       attrs: {
  //         circle: {
  //           r: 4,
  //           magnet: true,
  //           stroke: '#5F95FF',
  //           strokeWidth: 1,
  //           fill: '#fff',
  //           style: {
  //             visibility: 'hidden',
  //           },
  //         },
  //       },
  //     },
  //     bottom: {
  //       position: 'bottom',
  //       attrs: {
  //         circle: {
  //           r: 4,
  //           magnet: true,
  //           stroke: '#5F95FF',
  //           strokeWidth: 1,
  //           fill: '#fff',
  //           style: {
  //             visibility: 'hidden',
  //           },
  //         },
  //       },
  //     },
  //     left: {
  //       position: 'left',
  //       attrs: {
  //         circle: {
  //           r: 4,
  //           magnet: true,
  //           stroke: '#5F95FF',
  //           strokeWidth: 1,
  //           fill: '#fff',
  //           style: {
  //             visibility: 'hidden',
  //           },
  //         },
  //       },
  //     },
  //   },
  //   items: [
  //     {
  //       group: 'top',
  //     },
  //     {
  //       group: 'right',
  //     },
  //     {
  //       group: 'bottom',
  //     },
  //     {
  //       group: 'left',
  //     },
  //   ],
  // }


  register({
    shape: 'custom-vue-node',
    width: 120,
    height: 75,
    component: VueNode,
    // ports: { ...ports },
  })


  // 这里渲染一下学年和学期的数据 四个学年一共20条数据
  // 学年节点 学期节点两个 连线两个
  let cells = []
  let cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第一学年';
  cellItem.position.x = 150;
  cellItem.position.y = 0;
  cellItem.ports.items[0].id = '0001-0000-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0001-0000-0000-0001-ports';
  cellItem.ports.items[2].id = '0001-0000-0000-0002-ports';
  cellItem.ports.items[3].id = '0001-0000-0000-0003-ports';
  cellItem.id = '0001-0000-0000-0000-node'
  cellItem.custom = {}
  cells.push(cellItem)

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第一学期';
  cellItem.position.x = 150 - 150;
  cellItem.position.y = 0 + 100;
  cellItem.ports.items[0].id = '0001-0001-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0001-0001-0000-0001-ports';
  cellItem.ports.items[2].id = '0001-0001-0000-0002-ports';
  cellItem.ports.items[3].id = '0001-0001-0000-0003-ports';
  cellItem.id = '0001-0001-0000-0000-node'
  cellItem.custom = {}
  cells.push(cellItem)

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第二学期';
  cellItem.position.x = 150 + 150;
  cellItem.position.y = 0 + 100;
  cellItem.ports.items[0].id = '0001-0002-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0001-0002-0000-0001-ports';
  cellItem.ports.items[2].id = '0001-0002-0000-0002-ports';
  cellItem.ports.items[3].id = '0001-0002-0000-0003-ports';
  cellItem.id = '0001-0002-0000-0000-node';
  cellItem.custom = {}
  cells.push(cellItem);

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第二学年';
  cellItem.position.x = 150 + 150 + 200 + 100 + 150;
  cellItem.position.y = 0;
  cellItem.ports.items[0].id = '0002-0000-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0002-0000-0000-0001-ports';
  cellItem.ports.items[2].id = '0002-0000-0000-0002-ports';
  cellItem.ports.items[3].id = '0002-0000-0000-0003-ports';
  cellItem.id = '0002-0000-0000-0000-node'
  cellItem.custom = {}
  cells.push(cellItem)

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第一学期';
  cellItem.position.x = 150 + 150 + 200 + 100 + 150 - 150;
  cellItem.position.y = 0 + 100;
  cellItem.ports.items[0].id = '0002-0001-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0002-0001-0000-0001-ports';
  cellItem.ports.items[2].id = '0002-0001-0000-0002-ports';
  cellItem.ports.items[3].id = '0002-0001-0000-0003-ports';
  cellItem.id = '0002-0001-0000-0000-node'
  cellItem.custom = {}
  cells.push(cellItem)

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第二学期';
  cellItem.position.x = 150 + 150 + 200 + 100 + 150 + 150;
  cellItem.position.y = 0 + 100;
  cellItem.ports.items[0].id = '0002-0002-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0002-0002-0000-0001-ports';
  cellItem.ports.items[2].id = '0002-0002-0000-0002-ports';
  cellItem.ports.items[3].id = '0002-0002-0000-0003-ports';
  cellItem.id = '0002-0002-0000-0000-node';
  cellItem.custom = {}
  cells.push(cellItem);

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第三学年';
  cellItem.position.x = 150 + 150 + (200 + 100 + 150) * 2 + 150;
  cellItem.position.y = 0;
  cellItem.ports.items[0].id = '0003-0000-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0003-0000-0000-0001-ports';
  cellItem.ports.items[2].id = '0003-0000-0000-0002-ports';
  cellItem.ports.items[3].id = '0003-0000-0000-0003-ports';
  cellItem.id = '0003-0000-0000-0000-node'
  cellItem.custom = {}
  cells.push(cellItem)

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第一学期';
  cellItem.position.x = 150 + 150 + (200 + 100 + 150) * 2 + 150 - 150;
  cellItem.position.y = 0 + 100;
  cellItem.ports.items[0].id = '0003-0001-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0003-0001-0000-0001-ports';
  cellItem.ports.items[2].id = '0003-0001-0000-0002-ports';
  cellItem.ports.items[3].id = '0003-0001-0000-0003-ports';
  cellItem.id = '0003-0001-0000-0000-node'
  cellItem.custom = {}
  cells.push(cellItem)

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第二学期';
  cellItem.position.x = 150 + 150 + (200 + 100 + 150) * 2 + 150 + 150;
  cellItem.position.y = 0 + 100;
  cellItem.ports.items[0].id = '0003-0002-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0003-0002-0000-0001-ports';
  cellItem.ports.items[2].id = '0003-0002-0000-0002-ports';
  cellItem.ports.items[3].id = '0003-0002-0000-0003-ports';
  cellItem.id = '0003-0002-0000-0000-node';
  cellItem.custom = {}
  cells.push(cellItem);

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第四学年';
  cellItem.position.x = 150 + 150 + (200 + 100 + 150) * 3 + 150 * 2;
  cellItem.position.y = 0;
  cellItem.ports.items[0].id = '0004-0000-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0004-0000-0000-0001-ports';
  cellItem.ports.items[2].id = '0004-0000-0000-0002-ports';
  cellItem.ports.items[3].id = '0004-0000-0000-0003-ports';
  cellItem.id = '0004-0000-0000-0000-node'
  cellItem.custom = {}
  cells.push(cellItem)

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第一学期';
  cellItem.position.x = 150 + 150 + (200 + 100 + 150) * 3 + 150 * 2 - 150;
  cellItem.position.y = 0 + 100;
  cellItem.ports.items[0].id = '0004-0001-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0004-0001-0000-0001-ports';
  cellItem.ports.items[2].id = '0004-0001-0000-0002-ports';
  cellItem.ports.items[3].id = '0004-0001-0000-0003-ports';
  cellItem.id = '0004-0001-0000-0000-node'
  cellItem.custom = {}
  cells.push(cellItem)

  cellItem = JSON.parse(JSON.stringify(example6))
  cellItem.attrs.text.text = '第二学期';
  cellItem.position.x = 150 + 150 + (200 + 100 + 150) * 3 + 150 * 2 + 150;
  cellItem.position.y = 0 + 100;
  cellItem.ports.items[0].id = '0004-0002-0000-0000-ports';  // 大类  左右分支  分支排序  节点位置
  cellItem.ports.items[1].id = '0004-0002-0000-0001-ports';
  cellItem.ports.items[2].id = '0004-0002-0000-0002-ports';
  cellItem.ports.items[3].id = '0004-0002-0000-0003-ports';
  cellItem.id = '0004-0002-0000-0000-node';
  cellItem.custom = {}
  cells.push(cellItem);

  // 连线
  cellItem = JSON.parse(JSON.stringify(example7));
  cellItem.source.cell = '0001-0000-0000-0000-node';
  cellItem.source.port = '0001-0000-0000-0002-ports';
  cellItem.target.cell = '0001-0001-0000-0000-node';
  cellItem.target.port = '0001-0001-0000-0000-ports';
  cellItem.id = '0000-0000-0000-' + (1000000 + 1);
  cells.push(cellItem);

  cellItem = JSON.parse(JSON.stringify(example7));
  cellItem.source.cell = '0001-0000-0000-0000-node';
  cellItem.source.port = '0001-0000-0000-0002-ports';
  cellItem.target.cell = '0001-0002-0000-0000-node';
  cellItem.target.port = '0001-0002-0000-0000-ports';
  cellItem.id = '0000-0000-0000-' + (1000000 + 2);
  cells.push(cellItem);


  cellItem = JSON.parse(JSON.stringify(example7));
  cellItem.source.cell = '0002-0000-0000-0000-node';
  cellItem.source.port = '0002-0000-0000-0002-ports';
  cellItem.target.cell = '0002-0001-0000-0000-node';
  cellItem.target.port = '0002-0001-0000-0000-ports';
  cellItem.id = '0000-0000-0000-' + (1000000 + 20);
  cells.push(cellItem);

  cellItem = JSON.parse(JSON.stringify(example7));
  cellItem.source.cell = '0002-0000-0000-0000-node';
  cellItem.source.port = '0002-0000-0000-0002-ports';
  cellItem.target.cell = '0002-0002-0000-0000-node';
  cellItem.target.port = '0002-0002-0000-0000-ports';
  cellItem.id = '0000-0000-0000-' + (1000000 + 21);
  cells.push(cellItem);


  cellItem = JSON.parse(JSON.stringify(example7));
  cellItem.source.cell = '0003-0000-0000-0000-node';
  cellItem.source.port = '0003-0000-0000-0002-ports';
  cellItem.target.cell = '0003-0001-0000-0000-node';
  cellItem.target.port = '0003-0001-0000-0000-ports';
  cellItem.id = '0000-0000-0000-' + (1000000 + 22);
  cells.push(cellItem);

  cellItem = JSON.parse(JSON.stringify(example7));
  cellItem.source.cell = '0003-0000-0000-0000-node';
  cellItem.source.port = '0003-0000-0000-0002-ports';
  cellItem.target.cell = '0003-0002-0000-0000-node';
  cellItem.target.port = '0003-0002-0000-0000-ports';
  cellItem.id = '0000-0000-0000-' + (1000000 + 23);
  cells.push(cellItem);

  cellItem = JSON.parse(JSON.stringify(example7));
  cellItem.source.cell = '0004-0000-0000-0000-node';
  cellItem.source.port = '0004-0000-0000-0002-ports';
  cellItem.target.cell = '0004-0001-0000-0000-node';
  cellItem.target.port = '0004-0001-0000-0000-ports';
  cellItem.id = '0000-0000-0000-' + (1000000 + 24);
  cells.push(cellItem);

  cellItem = JSON.parse(JSON.stringify(example7));
  cellItem.source.cell = '0004-0000-0000-0000-node';
  cellItem.source.port = '0004-0000-0000-0002-ports';
  cellItem.target.cell = '0004-0002-0000-0000-node';
  cellItem.target.port = '0004-0002-0000-0000-ports';
  cellItem.id = '0000-0000-0000-' + (1000000 + 25);
  cells.push(cellItem);

  console.table(cells)

  let classMap = [[], [], [], [], [], [], [], [], []]

  const mockData = [
    {
      "kch": "0000112",
      "xn": "第一学年",
      "xq": "第一学期",
      "kcmc": "体验认知实习",
      "kclb": "专周课程"
    },
    {
      "kch": "0000212",
      "xn": "第一学年",
      "xq": "第一学期",
      "kcmc": "创新课题",
      "kclb": "实践教学"
    },
    {

      "kch": "0000351",
      "xn": "第一学年",
      "xq": "第一学期",
      "kcmc": "创业基础实训",
      "kclb": "通识选修课"
    },
    {

      "kch": "01001",
      "xn": "第一学年",
      "xq": "第一学期",
      "kcmc": "计算机文化基础A"
    },
    {

      "kch": "01001",
      "xn": "第二学年",
      "xq": "第一学期",
      "kcmc": "计算机文化基础A"
    },
    {

      "kch": "01002",
      "xn": "第二学年",
      "xq": "第二学期",
      "kcmc": "计算机文化基础B"
    }
  ]


  let res = mockData


  for (let i = 0; i < res.length; i++) {
    let classIndex = genArrIndex(res[i])
    if (classIndex !== false) {
      classMap[classIndex].push({
        ...res[i]
      })
    }
  }

  console.log('第一步，', classMap, '按照学年学期把数据进行分组')


  let classCellsMap = {}

  for (let i = 0; i < classMap.length; i++) {
    for (let j = 0; j < classMap[i].length; j++) {
      cellItem = JSON.parse(JSON.stringify(example6))
      cellItem.attrs.text.text = classMap[i][j].kcmc;
      cellItem.position.x = genArrIndex(classMap[i][j]) * (150 + 150);
      cellItem.position.y = 200 + 100 * j;
      cellItem.attrs.custom = genColorAttr(classMap[i][j])
      cellItem.ports.items[0].id = `${genId(classMap[i][j])}-${'000' + (Number(j) + 1)}-0000-ports`;  // 大类  左右分支  分支排序  节点位置
      cellItem.ports.items[1].id = `${genId(classMap[i][j])}-${'000' + (Number(j) + 1)}-0001-ports`;
      cellItem.ports.items[2].id = `${genId(classMap[i][j])}-${'000' + (Number(j) + 1)}-0002-ports`;
      cellItem.ports.items[3].id = `${genId(classMap[i][j])}-${'000' + (Number(j) + 1)}-0003-ports`;
      cellItem.id = `${genId(classMap[i][j])}-${'000' + (Number(j) + 1)}-0000-node`
      cellItem.i = i
      cellItem.j = j
      cellItem.origin = classMap[i][j] // 原始数据存一下
      cells.push(cellItem)

      classCellsMap[classMap[i][j].kcmc] = JSON.parse(JSON.stringify(cellItem))

      // 如果不是第一个，就画个线
      if (j > 0) {
        cellItem = JSON.parse(JSON.stringify(example7));
        cellItem.source.cell = `000${genArrIndexRoot(classMap[i][j])}-000${genArrIndexLevel2(classMap[i][j])}-000${(Number(j))}-0000-node`;
        cellItem.source.port = `000${genArrIndexRoot(classMap[i][j])}-000${genArrIndexLevel2(classMap[i][j])}-000${(Number(j))}-0002-ports`;
        cellItem.target.cell = `000${genArrIndexRoot(classMap[i][j])}-000${genArrIndexLevel2(classMap[i][j])}-000${(Number(j) + 1)}-0000-node`;
        cellItem.target.port = `000${genArrIndexRoot(classMap[i][j])}-000${genArrIndexLevel2(classMap[i][j])}-000${(Number(j) + 1)}-0000-ports`;
        cellItem.id = `0000-0000-${'000' + (Number(i) + 1)}-${'000' + (Number(j) + 1)}`;
        cellItem.attrs = { line: { targetMarker: null } }
        cells.push(cellItem);

      }
    }
  }

  console.table(cells)

  graph.fromJSON({ "cells": cells })
  graph.centerContent()
  graph.zoomToFit()

})


function genArrIndex(item: any) {
  if (!item.hasOwnProperty('xn') || !item.hasOwnProperty('xq')) {
    return false
  }
  if (item.xn === '第一学年' && item.xq === '第一学期') {
    return 0;
  } else if (item.xn === '第一学年' && item.xq === '第二学期') {
    return 1;
  } else if (item.xn === '第二学年' && item.xq === '第一学期') {
    return 2;
  } else if (item.xn === '第二学年' && item.xq === '第二学期') {
    return 3;
  } else if (item.xn === '第三学年' && item.xq === '第一学期') {
    return 4;
  } else if (item.xn === '第三学年' && item.xq === '第二学期') {
    return 5;
  } else if (item.xn === '第四学年' && item.xq === '第一学期') {
    return 6;
  } else if (item.xn === '第四学年' && item.xq === '第二学期') {
    return 7;
  }
}

function genArrIndexRoot(item: any) {
  if (!item.hasOwnProperty('xn')) {
    return false
  }
  if (item.xn === '第一学年') {
    return 1;
  } else if (item.xn === '第二学年') {
    return 2;
  } else if (item.xn === '第三学年') {
    return 3;
  } else if (item.xn === '第四学年') {
    return 4;
  }
}

function genArrIndexLevel2(item: any) {
  if (!item.hasOwnProperty('xq')) {
    return false
  }
  if (item.xq === '第一学期') {
    return 1;
  } else if (item.xq === '第二学期') {
    return 2;
  }
}

function genId(item: any) {
  if (!item.hasOwnProperty('xn') || !item.hasOwnProperty('xq')) {
    return false
  }
  if (item.xn === '第一学年' && item.xq === '第一学期') {
    return '0001-0001';
  } else if (item.xn === '第一学年' && item.xq === '第二学期') {
    return '0001-0002';
  } else if (item.xn === '第二学年' && item.xq === '第一学期') {
    return '0002-0001';
  } else if (item.xn === '第二学年' && item.xq === '第二学期') {
    return '0002-0002';
  } else if (item.xn === '第三学年' && item.xq === '第一学期') {
    return '0003-0001';
  } else if (item.xn === '第三学年' && item.xq === '第二学期') {
    return '0003-0002';
  } else if (item.xn === '第四学年' && item.xq === '第一学期') {
    return '0004-0001';
  } else if (item.xn === '第四学年' && item.xq === '第二学期') {
    return '0004-0002';
  }
}

const colorAttrList = [
  { color: '#C9C9C9', strokeColor: '#C9C9C9' },
  { color: '#FFD965', strokeColor: '#FFD965' },
  { color: '#A8D08D', strokeColor: '#A8D08D' },
  { color: '#FFFF00', strokeColor: '#FFFF00' },
  { color: '#98A6FF', strokeColor: '#98A6FF' },
  { color: '#80DDD6', strokeColor: '#80DDD6' },
  { color: '#C06D08', strokeColor: '#C06D08' },
  { color: '#FA9A8C', strokeColor: '#FA9A8C' },
  { color: '#7C9CE8', strokeColor: '#7C9CE8' },
  { color: '#46B5C9', strokeColor: '#46B5C9' },
  { color: '#DFE0E2', strokeColor: '#DFE0E2' },
  { color: '#D0D83C', strokeColor: '#D0D83C' },
]

let colorIndex = 0;

const colorMap = ref<any>({
})

const genColorAttr = (item: any) => {
  if (item.hasOwnProperty('kclb')) {
    if (colorMap.value.hasOwnProperty(item.kclb)) {
      return colorMap.value[item.kclb];
    } else {
      colorMap.value[item.kclb] = colorAttrList[colorIndex];
      colorIndex = (colorIndex + 1) % 12;
      return colorMap.value[item.kclb];
    }
  } else {
    if (!colorMap.value.hasOwnProperty('未分类')) {
      colorMap.value['未分类'] = {
        color: '#9CC3E5',
        strokeColor: '#9CC3E5',
      }
    }
    return {
      color: '#9CC3E5',
      strokeColor: '#9CC3E5',
    };
  }
}




</script>
<style lang="css" scoped>
body {
  min-height: 0 !important;
}

:deep(.x6-node) {
  z-index: 99;
}

:deep(.el-main) {
  padding: 10px !important;
}

:deep(.vue-node-label) {
  line-height: 22px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 22px !important;
}

.lengend-container {
  position: fixed;
  right: 20px;
  bottom: 20px;


}

.lengend-container .lengend-item {
  display: flex;
  justify-content: space-between;
  margin-top: 7px;
}

.lengend-container .lengend-item .lengend-name {
  font-size: 14px;
  font-weight: bold;
}

.lengend-container .lengend-item .lengend-box {
  margin-left: 20px;
  width: 60px;
  height: 20px;
}
</style>