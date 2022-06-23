<script setup>
    import { reactive, onMounted, watch, computed } from 'vue'
    import { extractSetup } from '../tools/extractor.mjs'

    const props = defineProps({
        file: File
    });

    const extractResult = reactive({});
    const canShowDownloadButton = computed(()=>{
        console.log(extractResult)
        return extractResult.message != null ? !extractResult.failed: false;
    })

    function saveToDisk(){
        const fileName = props.file.name.split('.')[0]
        var blob = new Blob([extractResult.data], {type: "example/binary"});
        saveAs(blob, `${fileName}.lsp`);
    }

    async function handleExtractForNewFile(){
        let tempRes = await extractSetup(props.file);
        Object.assign(extractResult, tempRes);
    }

    onMounted(async () => {
        await handleExtractForNewFile();
    });

    watch(()=>props.file, async()=>{
        await handleExtractForNewFile();
    });

</script>

<template>
    <div>
        <h1 class="font-bold text-lg">Setup file</h1>
        <p class="mb-2">{{extractResult.message == null? '': extractResult.message}}</p>
        <button v-if="canShowDownloadButton" class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600" @click="saveToDisk">Save to disk</button>
    </div>
</template>

<style>

</style>