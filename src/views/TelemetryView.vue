<script setup>
    const layout = [
            { x: 0, y: 0, w: 2, h: 5, i: 0, },
            { x: 0, y: 0, w: 2, h: 5, i: 1 },
          ];
</script>

<template>
    <div class="bg-neutral-800 rounded-md p-4">
        <h1 class="font-bold text-3xl">Telemetry analyzer</h1>

        <grid-layout v-model:layout="layout"
                    :col-num="2"
                    :row-height="30">

            <template #default="{ gridItemProps }">
        <!-- | gridItemProps props from GridLayout | -->
        <!--breakpointCols: props.cols-->
        <!--colNum: props.colNum-->
        <!--containerWidth: width.value-->
        <!--isDraggable: props.isDraggable-->
        <!--isResizable: props.isResizable-->
        <!--lastBreakpoint: lastBreakpoint.value-->
        <!--margin: props.margin-->
        <!--maxRows: props.maxRows-->
        <!--responsive: props.responsive-->
        <!--rowHeight: props.rowHeight-->
        <!--useCssTransforms: props.useCssTransforms-->
        <!--width: width.value-->
            <grid-item 
                v-for="item in layout"
                :key="item.i"
                class="bg-neutral-700"
                v-bind="gridItemProps"
                :x="item.x"
                :y="item.y"
                :w="item.w"
                :h="item.h"
                :i="item.i"
                drag-allow-from=".drag"
                drag-ignore-from=".no-drag">
            <div class="grid grid-cols-2 bg-neutral-900 px-2 py-1 no-drag">
                <div>
                    <p>NAME PLACEHOLDER</p>
                </div>

                <div class="justify-self-end">
                    <font-awesome-icon icon="fa-solid fa-xmark" />
                </div>
            </div>
        </grid-item>
      </template>

        </grid-layout>
        <!-- <grid-layout
            v-model:layout="layout"
            :col-num="1"
            :row-height="30"
            @resize="resize"
            @move="move"
            @moved="moved">
            
            <template #item="{ item }">
                <p>TEATSAT</p>
            </template>
        </grid-layout> -->
    </div>
</template>