<template>
  <div class="mx-auto flex flex-col items-center justify-center px-6 xl:px-0">
    <div class="block md:max-w-sm">
      <img src="/illustrations/500.svg" alt="astronaut" />
    </div>
    <div class="text-center xl:max-w-4xl">
      <h1 class="mb-3 text-2xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        Internal Server Error
      </h1>
      <p class="mb-5 text-base font-normal text-gray-500 md:text-lg dark:text-gray-400">
        Oops! Something went wrong on our end. Please try again later. If the problem persists,
        contact support.
      </p>
      <router-link
        :to="{ path: '/' }"
        class="mr-3 inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="-ml-1 mr-2 h-5 w-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clip-rule="evenodd"
          ></path>
        </svg>
        Go back home
      </router-link>
    </div>
  </div>
</template>
