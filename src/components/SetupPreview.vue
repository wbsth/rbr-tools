<script setup>
    import { reactive, onMounted, watch, computed } from 'vue'
    import { extractSetup } from '../tools/extractor.mjs'

    const props = defineProps({
        file: File
    });

    const extractResult = reactive({});

    const canShowDownloadButton = computed(()=>{
        return extractResult.message != null ? !extractResult.failed: false;
    })

    function saveToDisk(){
        const fileName = props.file.name.substring(0, props.file.name.lastIndexOf('.')) || props.file.name;
        var blob = new Blob([extractResult.data], {type: "example/binary"});
        saveAs(blob, `${fileName}.lsp`);
    }

    async function handleExtractForNewFile(file){
        let tempRes = await extractSetup(file);
        Object.assign(extractResult, tempRes);
    }

    watch(()=>props.file, 
        async(file)=>{
            await handleExtractForNewFile(file);
        }, 
        {
        immediate: true
    });

</script>

<template>
    <hr class="border-neutral-600"/>
    <div>
        <h1 class="font-bold text-lg">Setup file</h1>
        <p class="mb-2">{{extractResult.message == null? '': extractResult.message}}</p>
        <div v-if="canShowDownloadButton">
            <button class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600" @click="saveToDisk">Save to disk</button>
            <p class="bg-neutral-900 p-3 rounded-md whitespace-pre-wrap mt-3">{{ String.fromCharCode.apply(null, extractResult.data) }}</p>
        </div>
       
    </div>
</template>

<style>

</style>