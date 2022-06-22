<script setup>
    import { reactive } from 'vue'

    const file = reactive({name: 'no file choosen'}) 

    function inputFileWasChanged(event){
        file.name = event.srcElement.files[0].name
        //Object.assign(file, event.srcElement.files[0])
    }
</script>

<template>
    <div class="bg-neutral-800 rounded-md p-4">
        <p>
            This tool allow you to extract setup file from Richard Burns Rally replay file (.rpl).
        </p>

        <div class="flex flex-row content-center pt-2">
            <div class="bg-neutral-700 px-4 py-2 rounded-md">        
                <input type="file" id="fileupload" style="display:none;" v-on:change="inputFileWasChanged"/>
                <label for="fileupload">Choose replay file</label>
            </div>

            <div class="flex justify-center items-center">{{ file.name }}</div>
            
        </div>

    </div>
</template>

<style>

</style>