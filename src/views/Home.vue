<template>
  <div class="home">
    <Wheel/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Wheel from "@/components/Wheel.vue"; // @ is an alias to /src

@Component({
  components: {
    Wheel
  }
})
export default class Home extends Vue {}
</script>
