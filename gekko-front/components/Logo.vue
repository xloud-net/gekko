<template>
  <img class="GekkoLogo" alt="Gekko Logo" src="/logo.png" />
</template>

<style>
.GekkoLogo {
  border-radius: 50%;
  transform: rotateY(560deg);
  animation: turn 3.5s ease-out forwards 1s;
}
@keyframes turn {
  100% {
    transform: rotateY(0deg);
  }
}
</style>
