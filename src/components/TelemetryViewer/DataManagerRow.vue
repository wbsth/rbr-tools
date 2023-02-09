<script setup>
    import { ref, onMounted} from 'vue';
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

    const emit = defineEmits(["deleteRow", "toggleActiveState"]);

    function deleteRow(){
        emit("deleteRow", props.telemetryFile);
    }

    function toggleActiveState(){
        emit("toggleActiveState", props.telemetryFile);
    }

</script>

<template>
    <div class="flex flex-row justify-between bg-neutral-900 py-2 px-3 rounded-md text-sm">
        <div class="flex flex-row items-center gap-x-2">

            <font-awesome-icon
                icon="fa-solid fa-eye"
                class="cursor-pointer" 
                :class="{'text-neutral-400 hover:text-neutral-600': props.telemetryFile.active,
                            'text-neutral-600 hover:text-neutral-400': !props.telemetryFile.active }"
                @click="toggleActiveState"/>

            <div
                class="border-dotted border-2 border-black w-5 h-5 cursor-pointer"
                :style="{ 'background-color': props.telemetryFile.color}"/>

            <p>{{ props.telemetryFile.name }}</p>
        </div>
        <font-awesome-icon icon="fa-solid fa-xmark" class="my-auto hover:text-neutral-600 cursor-pointer" @click="deleteRow"/>
    </div>
</template>