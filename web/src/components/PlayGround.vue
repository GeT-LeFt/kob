<template>
<div class="playground">
    <GameMap></GameMap>
</div>
</template>

<script>
import GameMap from "./GameMap";

export default {
    components: {
        GameMap,
    }
}
</script>

<style scoped>
div.playground {
    width: 60vw;
    height: 70vh;
    /* background-color: rgb(149, 157, 154); */
    margin: 40px auto;
}
</style>