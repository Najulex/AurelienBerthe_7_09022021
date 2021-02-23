<template>
    <h1 class="text-center m-2 reg-title">
        {{ text }}
    </h1>
</template>

<script>
export default {
    props : {
        text : {
            type :String,
            required : true
        }
    }
}
</script>

<style>
    .reg-title {
        font-family: Geneva, Tahoma, sans-serif;
        font-weight: bold;
    }
</style>