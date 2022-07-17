<template>
<div ref='parent' class="gamemap">
    <canvas ref="canvas" tabindex="0"></canvas> 
    <!-- tabindex="0"可以输进行输入操作 -->
</div>
</template>

<script>
import { GameMap } from "@/assets/scripts/GameaMap";
import { ref, onMounted } from "vue";

export default {
    setup () {
        let parent = ref(null);
        let canvas = ref(null);

    onMounted(() => {           // 挂载完之后需要执行的函数
        new GameMap(canvas.value.getContext('2d'), parent.value)
    })

        return {
            parent,
            canvas
        }
    }
}
</script>

<style scoped>
div.gamemap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>