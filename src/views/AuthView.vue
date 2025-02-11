<template>
  <div
    class="relative h-full items-center justify-center overflow-hidden bg-[url('/images/bg-darkest--wide.webp')] bg-cover bg-no-repeat"
  >
    <router-view :key="$route.path"></router-view>
    <span v-for="i in 200" :key="i" class="particle"></span>
  </div>
</template>

<style scoped lang="scss">
@use 'sass:math';
@use 'sass:list';

.particle {
  position: absolute;
  border-radius: 50%;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(80px, 180px); // Moves diagonally
  }
}

@keyframes floatReverse {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translateY(-180px);
  }
}

@keyframes float2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(120px, 280px); // Moves further diagonally
  }
}

@keyframes floatReverse2 {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translateY(-280px);
  }
}

@mixin animation($delay, $duration, $animation) {
  animation-delay: #{$delay}s;
  animation-duration: #{$duration}s;
  animation-name: #{$animation};
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
}

$anims: float, floatReverse, float2, floatReverse2;

@for $i from 1 through 200 {
  .particle:nth-child(#{$i}) {
    $width: math.random(15) + 10;
    $speed: math.random(20) + 20;
    $delay: math.random(10) * 0.1;
    $opacity: math.random(10) * 0.1;
    $anim: list.nth($anims, math.random(list.length($anims)));

    height: #{$width}px;
    width: #{$width}px;
    left: math.percentage(calc(math.random(100) / 100));
    top: math.percentage(calc(math.random(100) / 100));
    background: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%);
    opacity: #{$opacity};

    @include animation($delay, $speed, $anim);
  }
}
</style>
