<script setup>

</script>

<template>
    <div class="bg-neutral-800 rounded-md p-4">
        <h1 class="font-bold text-3xl">Telemetry analyzer</h1>

        <splitpanes class="default-theme" horizontal style="height: 400px">
            <pane min-size="20" max-size="70" class="bg-red-300">
                <span>1</span>
            </pane>
            <pane>
                <span>2</span>
            </pane>
            <pane max-size="70">
                <span>3</span>
            </pane>
        </splitpanes>
    </div>
</template>