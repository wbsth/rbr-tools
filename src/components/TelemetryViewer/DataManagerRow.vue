<script setup>
    import { ref, onMounted } from 'vue';

    import { VSwatches } from 'vue3-swatches'
    import 'vue3-swatches/dist/style.css'
    import colors from '../../data/colors';

    const props = defineProps({
        telemetryFile: {
            type: Object,
            required: true,
            default: ()=>({
                active: false,
                name: "",
                color: ""
            })
        }
    }
    );

    const emit = defineEmits(["deleteRow", "toggleActiveState", "changeColor"]);

    const color = ref();

    function deleteRow(){
        emit("deleteRow", props.telemetryFile);
    }

    function toggleActiveState(){
        emit("toggleActiveState", props.telemetryFile);
    }

    function colorChanged(value){
        emit("changeColor", props.telemetryFile, value);
    }

    onMounted(() => {
        color.value = props.telemetryFile.color;
    })
</script>

<template>
    <div class="flex flex-row justify-between items-center bg-neutral-900 py-1 px-3 rounded-md text-sm">
        <div class="flex flex-row items-center gap-x-2">

            <font-awesome-icon
                icon="fa-solid fa-eye"
                class="cursor-pointer" 
                :class="{'text-neutral-400 hover:text-neutral-600': props.telemetryFile.active,
                            'text-neutral-600 hover:text-neutral-400': !props.telemetryFile.active }"
                @click="toggleActiveState"/>

            <VSwatches 
                v-model="color"
                background-color="#57534e"
                shapes="squares"
                :swatches="colors.colors"
                :swatch-size="30"
                :trigger-style="{ width: '16px', height: '16px', borderRadius: '4px', marginTop:'5px'}"
                @update:model-value="colorChanged"/>

            <p>{{ props.telemetryFile.name }}</p>
            
        </div>
        <font-awesome-icon icon="fa-solid fa-xmark" class="my-auto hover:text-neutral-600 cursor-pointer" @click="deleteRow"/>
    </div>
</template>