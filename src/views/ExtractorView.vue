<script setup>
    import { reactive } from 'vue'
    import SetupPreview from '../components/SetupPreview.vue'

    const fileData = reactive({file: null}) 

    function inputFileWasChanged(event){
        fileData.file = event.srcElement.files[0]
    }
</script>

<template>
    <div class="bg-neutral-800 rounded-md p-4">
        <p class="text-sm italic"> This simple tool allows you to extract setup file from Richard Burns Rally replay file (.rpl).</p>
        <p class="text-sm italic"> All files are processed on the client side - no files are being sent to the server. </p>

        <div class="flex flex-row content-center pt-3 gap-3">
            <div >        
                <input type="file" id="fileupload" style="display:none;" v-on:change="inputFileWasChanged"/>
                <label for="fileupload" class="bg-neutral-700 px-4 py-2 rounded-md cursor-pointer hover:bg-neutral-600">Choose replay file</label>
            </div>

            <div class="flex justify-center items-center italic">{{ fileData.file == null ? 'no file chosen...' : fileData.file.name }}</div>
            
        </div>

        <SetupPreview class="mt-3" v-if="fileData.file != null" :file="fileData.file"/>

    </div>
</template>

<style>

</style>